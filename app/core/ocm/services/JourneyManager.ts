/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Base, LogLevel} from '../Base';
import {AppManager} from './AppManager';
import {Http, Response} from '@angular/http';
import {APIClient} from './APIClient';
import {POIManager} from './POIManager';
import {Journey, JourneyStage, WayPoint, BookmarkedPOI, GeoLatLng, SyncItem, POISearchParams} from '../model/AppModels';

@Injectable()
/**
 * Manage access to Journey information. Journeys are a collection of journey Stages, each with multiple WayPoints. Each WayPoint has one or more optional Bookmarked POIs.
 */
export class JourneyManager extends Base {

    public journeys: Array<Journey>;
    public favourites: Array<BookmarkedPOI>;
    constructor(private api: APIClient, private poiManager: POIManager) {
        super();
        this.journeys = [];
        this.favourites = [];
    }

    public loadJourneys() {
        //load journeys from local cache, then check for newer server copy
        let journeyJson = localStorage.getItem("journeys");
        if (journeyJson != null) {
            this.journeys = JSON.parse(journeyJson);

        }

        //TODO: check server, reconcile sync

        //load POI Details

        if (this.journeys != null) {
            for (var j of this.journeys) {
                //attempt to populate POI details of each journey waypoint
                this.fetchAllJourneyPOIDetails(j);
            }
        }

    }


    /**
     * For a given journey, fetch the full POI details for all WayPoints
     */
    public fetchAllJourneyPOIDetails(journey: Journey) {

        this.log("Journeys - fetching poi details for Journey " + journey.Title);
        let searchParams = new POISearchParams();
        searchParams.poiIdList = [];

        //gather list of POIs to fetch details for
        for (let s of journey.Stages) {
            for (let w of s.WayPoints) {
                for (let p of w.PoiIDs) {
                    searchParams.poiIdList.push(p);
                }
            }
        }

        this.api.fetchPOIListByParam(searchParams, this.poiManager).subscribe((results) => {
            //populate journeys with POI details
            for (let poi of results) {
                this.updateStoredPOI(poi);
            }
        });
    }

    /** Update details of a POI if ti occurs in a jounrey or favourites */
    public updateStoredPOI(poi) {

        //updated all journeys which use this poi, TODO: this is messy
        if (this.journeys != null) {
            for (let j of this.journeys) {
                if (j.Stages != null) {
                    for (let s of j.Stages) {
                        if (s.WayPoints != null) {
                            for (let w of s.WayPoints) {
                                if (w.PoiIDs != null) {
                                    for (let p of w.PoiIDs) {
                                        if (p == poi.ID) {
                                            if (w.PoiList == null) w.PoiList = [];
                                            w.PoiList.push(poi);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        //update all favourites with latest info
        if (this.favourites != null) {
            for (let f of this.favourites) {
                if (f.Type == "charging" && f.PoiID == poi.ID) {
                    f.Poi = poi;
                }
            }
        }
    }
    public saveJourneys() {
        //save to local cache, then save to server copy
        let cloneOfJourneys = <Array<Journey>>JSON.parse(JSON.stringify(this.journeys));
        //remove waypoint POI references
        for (let j of cloneOfJourneys) {
            for (let s of j.Stages) {
                for (let w of s.WayPoints) {
                    w.PoiList = null;
                }
            }
        }
        var journeyString = JSON.stringify(cloneOfJourneys);
        localStorage.setItem("journeys", journeyString);

        //TODO: send to server, merge synce and get results
    }


    /**
     * Add new journey wtih a default single stagem, optionally adding the given Waypoint 
     */
    public addJourney(journey: Journey, waypoint?: WayPoint) {


        var newStage: JourneyStage = new JourneyStage();
        newStage.Title = "Stage 1";
        if (waypoint != null) {
            newStage.WayPoints.push(waypoint);
        }
        journey.Stages.push(newStage);
        this.journeys.push(journey);

        alert(JSON.stringify(journey, null, 4));
    }
    
    public deleteJourney(journeyId:string){
        this.journeys = this.journeys.filter(f=>f.ID!=journeyId);
        this.saveJourneys();
    }

    /**
     * Get a journey by the given ID
     */
    public getJourney(journeyId: string) {
        let j = this.journeys.filter(j => j.ID == journeyId);
        if (j.length > 0) {
            let journey = j[0];
            return journey;
        } else {
            return null;
        }
    }

    /**
     * Add a WayPoint to the journey at the given stage index (stage must already exist)
     */
    public addJourneyWaypoint(journeyId: string, stageIndex: number, waypoint: WayPoint) {
        let journey = this.getJourney(journeyId);
        let stage = journey.Stages[stageIndex];
        stage.WayPoints.push(waypoint);
    }

    /**
     * Add a journey stage and return the new index of the Stage
     */
    public addJourneyStage(journeyId: string, stage: JourneyStage): number {
        let journey = this.getJourney(journeyId);
        var numStages = journey.Stages.push(stage);
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

}