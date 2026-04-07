import { Logging, LogLevel } from './Logging';
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Injectable } from '@angular/core';
import { APIClient } from './APIClient';
import { POIManager } from './POIManager';
import { Journey, JourneyStage, WayPoint, BookmarkedPOI, GeoLatLng, SyncItem, POISearchParams } from '../model/AppModels';

@Injectable({
    providedIn: 'root',
})
/**
 * Manage access to Journey information.
 * Journeys are a collection of journey Stages, each with multiple WayPoints. Each WayPoint has one or more optional Bookmarked POIs.
 */
export class JourneyManager {

    public journeys: Array<Journey>;
    public favourites: Array<BookmarkedPOI>;
    private routePolyline: string | null = null;
    private readonly lastUsedJourneyStorageKey = 'lastUsedJourneyId';

    constructor(public api: APIClient, public poiManager: POIManager, public logging: Logging) {
        this.journeys = [];
        this.favourites = [];
    }

    public loadJourneys() {
        // load journeys from local cache, then check for newer server copy
        this.journeys = [];
        this.favourites = [];

        let journeyJson = localStorage.getItem("journeys");
        if (journeyJson != null) {
            this.journeys = JSON.parse(journeyJson);
        }

        const favouritesJson = localStorage.getItem("favourites");
        if (favouritesJson != null) {
            this.favourites = JSON.parse(favouritesJson);
        }

        if (this.getLastUsedJourneyId() == null) {
            localStorage.removeItem(this.lastUsedJourneyStorageKey);
        }

        // TODO: check server, reconcile sync

        // load POI Details

        if (this.journeys != null) {
            for (let j of this.journeys) {
                // attempt to populate POI details of each journey waypoint
                this.fetchAllJourneyPOIDetails(j);
            }
        }

        this.fetchFavouritePOIDetails();

    }


    /**
     * For a given journey, fetch the full POI details for all WayPoints
     */
    public fetchAllJourneyPOIDetails(journey: Journey) {

        this.logging.log("Journeys - fetching poi details for Journey " + journey.Title);
        let searchParams = new POISearchParams();
        searchParams.poiIdList = [];

        // gather list of POIs to fetch details for
        for (let s of journey.Stages) {
            for (let w of s.WayPoints) {
                for (let p of w.PoiIDs) {
                    searchParams.poiIdList.push(p);
                }
            }
        }

        this.api.fetchPOIListByParam(searchParams).then((results) => {
            // populate journeys with POI details
            for (let poi of results) {
                this.updateStoredPOI(poi);
            }
        });
    }

    public async fetchFavouritePOIDetails(): Promise<void> {
        if (this.favourites == null || this.favourites.length === 0) {
            return;
        }

        const missingPoiIds: Array<number> = [];

        for (const favourite of this.favourites) {
            const hasCachedPoi = favourite.Poi != null && favourite.Poi.AddressInfo != null;
            if (favourite.PoiID != null && !hasCachedPoi && missingPoiIds.indexOf(favourite.PoiID) === -1) {
                missingPoiIds.push(favourite.PoiID);
            }
        }

        if (missingPoiIds.length === 0) {
            return;
        }

        for (const poiId of missingPoiIds) {
            try {
                const poi = await this.poiManager.getPOIById(poiId, true, true);
                if (poi) {
                    this.updateStoredPOI(poi);
                }
            } catch (error) {
                this.logging.log('Journeys - failed to hydrate favourite POI ' + poiId + ': ' + error, LogLevel.ERROR);
            }
        }
    }

    /** Update details of a POI if it occurs in a journey or favourites */
    public updateStoredPOI(poi: any) {

        // updated all journeys which use this poi, TODO: this is messy
        this.journeys.forEach(j => {
            j.Stages.forEach(s => {
                s.WayPoints.forEach(w => {
                    w.PoiIDs.forEach(p => {
                        if (p == poi.ID) {
                            if (w.PoiList == null) {
                                // start new bookmarks list
                                w.PoiList = [];
                                let bookmark = new BookmarkedPOI("charging", 1);
                                bookmark.Poi = poi;
                                bookmark.PoiID = poi.ID;
                                w.PoiList.push(bookmark);
                            } else {
                                // update existing bookmark
                                for (let b of w.PoiList) {
                                    if (b.PoiID == poi.ID) {
                                        b.Poi = poi;
                                    }
                                }
                            }
                        }
                    });
                });
            });
        });



        // update all favourites with latest info
        let favouritesChanged = false;
        if (this.favourites != null) {
            for (let f of this.favourites) {
                if (f.PoiID == poi.ID) {
                    f.Poi = poi;
                    f.Title = poi.AddressInfo?.Title || f.Title;
                    f.Notes = poi.AddressInfo?.AddressLine1 || f.Notes;
                    favouritesChanged = true;
                }
            }
        }

        if (favouritesChanged) {
            this.saveFavouritesCache();
        }
    }

    public saveJourneys() {
        // save to local cache, then save to server copy
        let cloneOfJourneys = <Array<Journey>>JSON.parse(JSON.stringify(this.journeys));
        // remove waypoint POI references
        for (let j of cloneOfJourneys) {
            for (const s of j.Stages) {
                for (let w of s.WayPoints) {
                    for (let p of (w.PoiList || [])) {
                        p.Poi = null;
                        p.Photos = null;
                    }
                }
            }
        }
        const journeyString = JSON.stringify(cloneOfJourneys);
        localStorage.setItem("journeys", journeyString);

        this.saveFavouritesCache();

        // TODO: send to server, merge synce and get results
    }

    public isFavourite(poiId: number): boolean {
        return this.favourites != null && this.favourites.some((f) => f.PoiID === poiId);
    }

    public addFavourite(poi: any): boolean {
        if (!poi || poi.ID == null || this.isFavourite(poi.ID)) {
            return false;
        }

        const favourite = new BookmarkedPOI('charging', 1);
        favourite.Title = poi.AddressInfo?.Title || 'Favourite';
        favourite.Notes = poi.AddressInfo?.AddressLine1 || '';
        favourite.PoiID = poi.ID;
        favourite.Poi = poi;

        this.favourites.push(favourite);
        this.saveJourneys();
        return true;
    }

    public removeFavourite(poiId: number): boolean {
        const favouriteCount = this.favourites.length;
        this.favourites = this.favourites.filter((favourite) => !(favourite.PoiID === poiId));

        if (this.favourites.length !== favouriteCount) {
            this.saveJourneys();
            return true;
        }

        return false;
    }

    private saveFavouritesCache() {
        const cloneOfFavourites = <Array<BookmarkedPOI>>JSON.parse(JSON.stringify(this.favourites || []));
        for (const favourite of cloneOfFavourites) {
            favourite.Photos = null;
        }
        localStorage.setItem("favourites", JSON.stringify(cloneOfFavourites));
    }


    /**
     * Add new journey wtih a default single stagem, optionally adding the given Waypoint
     */
    public addJourney(journey: Journey, waypoint?: WayPoint) {
        if (journey.Stages == null) {
            journey.Stages = [];
        }

        let newStage: JourneyStage = new JourneyStage();
        newStage.Title = "Stage 1";
        if (waypoint != null) {
            newStage.WayPoints.push(waypoint);
        }
        journey.Stages.push(newStage);
        this.journeys.push(journey);
        this.setLastUsedJourneyId(journey.ID);
        this.saveJourneys();
    }

    public deleteJourney(journeyId: string) {
        this.journeys = this.journeys.filter(f => f.ID != journeyId);
        if (this.getLastUsedJourneyId() === journeyId) {
            this.setLastUsedJourneyId(null);
        }
        this.saveJourneys();
    }

    /**
     * Get a journey by the given ID
     */
    public getJourney(journeyId: string) {
        let j = this.journeys.filter(i => i.ID == journeyId);
        if (j.length > 0) {
            let journey = j[0];
            return journey;
        } else {
            return null;
        }
    }

    public getJourneyStages(journeyId: string) {
        let j = this.getJourney(journeyId);
        return j?.Stages || [];
    }

    public getJourneyWaypoint(journeyId: string, stageIndex: number, waypointIndex: number): WayPoint | null {
        const stage = this.getJourneyStages(journeyId)?.[stageIndex];
        return stage?.WayPoints?.[waypointIndex] || null;
    }

    private normaliseStageIndex(stageIndex: number | string | null | undefined): number | null {
        if (stageIndex == null || stageIndex === '') {
            return null;
        }

        const normalisedStageIndex = typeof stageIndex === 'number' ? stageIndex : parseInt(stageIndex, 10);
        return Number.isNaN(normalisedStageIndex) ? null : normalisedStageIndex;
    }

    /**
     * Add a WayPoint to the journey at the given stage index (stage must already exist)
     */
    public addJourneyWaypoint(journeyId: string, stageIndex: number | string | null, waypoint: WayPoint) {
        let journey = this.getJourney(journeyId);
        if (!journey) {
            return;
        }

        const normalisedStageIndex = this.normaliseStageIndex(stageIndex);

        if (normalisedStageIndex == null) {
            // create new journey stage, then add waypoint
            let newStage: JourneyStage = new JourneyStage();
            newStage.Title = "Stage " + (journey.Stages.length + 1);
            newStage.WayPoints.push(waypoint);
            journey.Stages.push(newStage);
        } else {
            // add to existing journey stage
            let stage = journey.Stages[normalisedStageIndex];
            if (stage == null) {
                stage = new JourneyStage();
                stage.Title = "Stage " + (normalisedStageIndex + 1);
                journey.Stages[normalisedStageIndex] = stage;
            }
            if (stage.WayPoints == null) { stage.WayPoints = []; }
            stage.WayPoints.push(waypoint);
        }

        this.setLastUsedJourneyId(journeyId);
        this.saveJourneys();
    }

    public updateJourneyWaypoint(
        sourceJourneyId: string,
        sourceStageIndex: number,
        sourceWaypointIndex: number,
        targetJourneyId: string | null,
        targetStageIndex: number | string | null,
        waypoint: WayPoint,
        newJourneyName?: string
    ): void {
        const sourceStage = this.getJourneyStages(sourceJourneyId)?.[sourceStageIndex];
        if (sourceStage?.WayPoints == null || sourceStage.WayPoints[sourceWaypointIndex] == null) {
            return;
        }

        const normalisedTargetStageIndex = this.normaliseStageIndex(targetStageIndex);

        if (targetJourneyId != null && targetJourneyId !== ''
            && targetJourneyId === sourceJourneyId
            && normalisedTargetStageIndex === sourceStageIndex) {
            sourceStage.WayPoints[sourceWaypointIndex] = waypoint;
            this.setLastUsedJourneyId(targetJourneyId);
            this.saveJourneys();
            return;
        }

        sourceStage.WayPoints.splice(sourceWaypointIndex, 1);

        if (targetJourneyId != null && targetJourneyId !== '') {
            this.addJourneyWaypoint(targetJourneyId, normalisedTargetStageIndex, waypoint);
            return;
        }

        const journey = new Journey();
        journey.ID = Date.now().toString();
        journey.Title = (newJourneyName || '').trim() || 'New Journey';
        this.addJourney(journey, waypoint);
    }

    public getLastUsedJourneyId(): string | null {
        const journeyId = localStorage.getItem(this.lastUsedJourneyStorageKey);
        if (journeyId == null || journeyId === '') {
            return null;
        }

        return this.getJourney(journeyId) != null ? journeyId : null;
    }

    public setLastUsedJourneyId(journeyId: string | null): void {
        if (journeyId == null || journeyId === '') {
            localStorage.removeItem(this.lastUsedJourneyStorageKey);
            return;
        }

        localStorage.setItem(this.lastUsedJourneyStorageKey, journeyId);
    }

    /**
     * Add a journey stage and return the new index of the Stage
     */
    public addJourneyStage(journeyId: string, stage: JourneyStage): number {
        let journey = this.getJourney(journeyId);
        if (!journey) {
            return -1;
        }
        let numStages = journey.Stages.push(stage);
        this.saveJourneys();
        return numStages - 1;
    }

    public setupTestJourneys() {
        this.journeys = [];

        let journey1 = new Journey();

        journey1.Title = "New York to Brooklyn";
        journey1.Notes = "A little jaunt to Brooklyn";
        journey1.Stages = [];

        let stage1 = new JourneyStage();

        let waypoint1 = new WayPoint();
        waypoint1.Notes = "Starting point";
        waypoint1.Position = new GeoLatLng(40, 1.2);
        waypoint1.Title = "Start";

        stage1.WayPoints.push(waypoint1);

        let waypoint2 = new WayPoint();
        waypoint2.Notes = "Middle point";
        waypoint2.Position = new GeoLatLng(40, 1.33);
        waypoint2.Title = "Middle";
        stage1.WayPoints.push(waypoint2);

        let waypoint3 = new WayPoint();
        waypoint3.Notes = "End point";
        waypoint3.Position = new GeoLatLng(40, 1.33);
        waypoint3.Title = "End";
        stage1.WayPoints.push(waypoint3);

        journey1.Stages.push(stage1);
        this.journeys.push(journey1);

        ////////

        let journey2 = new Journey();
        journey2.Title = "Aberdeen to London";
        journey2.Notes = "Roadtrip";
        journey2.Stages = [];

        this.journeys.push(journey2);

    }

    public calculateEnergyConsumptionkWh(distanceKM: number, speedKPH: number, elevationDelta: number = 0, kWhPerKM: number): number {
        // given an input speed in km/h for a given distance, calculate an estimate of required energy consumption in kwh, optionally account for elevation change.
        // let totalkWhCapacity = 21;

        // average vehicle energy efficiency in Kilowatt Hours consumed per Kilometer travelled
        // let kWhPerKM = 0.212; //Model S = ~0.24, Leaf = ~0.212

        let totalPowerRequiredkWh = distanceKM * kWhPerKM;


        // calculate how many hours we are travelling for given avg speed
        // let durationInHours = distanceKM/speedKPH;

        return totalPowerRequiredkWh;

    }

    public setRoutePolyline(polyline: string | null) {
        this.routePolyline = polyline;
    }

    public getRoutePolyline(): string | null {
        return this.routePolyline;
    }
}
