import { GeoLatLng, GeoBounds } from './../../model/GeoPosition';
import { JourneyManager } from './../../services/JourneyManager';
import { Logging } from './../../services/Logging';
import { GoogleMapsDirections } from './../../services/GoogleMapsDirections';
import { Mapping } from './../../services/mapping/Mapping';
import { JourneyRoute } from './../../model/Journey';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PlaceSearchResult } from '../../model/AppModels';

declare var google;
//
/*
  Route Planning Component providing Start/Destination selection UI and summary of required energy for journey
*/
@Component({
    selector: 'route-planner',
    templateUrl: 'route-planner.html'
})
export class RoutePlanner {

    private routeSearchDistance: number = 5;
    private journeyRoutes: Array<JourneyRoute>;
    selectedJourneyRoute: JourneyRoute;
    private routePolyline: string;
    private kWhPerKM: number;

    routeStartPlace: PlaceSearchResult;
    routeDestinationPlace: PlaceSearchResult;

    routeCalcInProgress: boolean = false;
    advancedSettingsMode: boolean = false;

    routeStart: string = '';
    routeDestination: string = '';

    constructor(
        public mapping: Mapping,
        public logging: Logging,
        public directions: GoogleMapsDirections,
        public journeyManager: JourneyManager,
        public changeDetector: ChangeDetectorRef,
        public numberPipe: DecimalPipe
    ) {
        this.kWhPerKM = 0.212; // Model S = ~0.24, Leaf = ~0.212
    }

    get isRouteSet(): boolean {
        if (this.routeStartPlace != null && this.routeDestinationPlace != null) {
            return true;
        } else {
            return false;
        }
    }

    showSettings() {
        this.advancedSettingsMode = true;
    }
    hideSettings() {
        this.advancedSettingsMode = false;
    }
    routeStartSelected($e) {
        // alert(JSON.stringify($e));
        this.routeStartPlace = $e;
        this.calculateRoute();
        this.changeDetector.detectChanges();
    }

    routeDestinationSelected($e) {
        // alert(JSON.stringify($e));
        this.routeDestinationPlace = $e;
        this.calculateRoute();
        this.changeDetector.detectChanges();
    }
    clearRouteStart() {
        this.routeStartPlace = null;
        this.changeDetector.detectChanges();
    }
    clearRouteDestination() {
        this.routeDestinationPlace = null;
        this.changeDetector.detectChanges();
    }

    clearRoute() {
        this.routeStartPlace = null;
        this.routeDestinationPlace = null;
        this.journeyManager.setRoutePolyline(null);
        this.mapping.clearPolyline();
    }

    formatDuration(durationMins: number) {
        if (durationMins <= 60) {
            return this.numberPipe.transform(durationMins, '1.0-2') + ' mins';
        } else {
            const hours = Math.round(durationMins / 60);
            const mins = Math.floor(durationMins - (hours * 60));
            return hours + ' hours ' + (mins > 0 ? mins + ' mins' : '');
        }
    }

    calculateRoute() {
        if (this.routeStartPlace != null && this.routeDestinationPlace != null) {
            // start a new route discovery
            this.logging.log('Fetching route directions..');
            this.routeCalcInProgress = true;

            this.directions.getDirections(
                this.routeStartPlace.Location.latitude + ',' + this.routeStartPlace.Location.longitude,
                this.routeDestinationPlace.Location.latitude + ',' +
                this.routeDestinationPlace.Location.longitude)
                .then((result: any) => {
                    if (result.routes != null && result.routes.length > 0) {
                        this.logging.log('Got route directions, analysing..');
                        this.routePolyline = (<any>result.routes[0]).overview_polyline;

                        const resultSw = result.routes[0].bounds.getSouthWest();
                        const resultNe = result.routes[0].bounds.getNorthEast();
                        const neLL = new GeoLatLng(resultNe.lat(), resultNe.lng());
                        const swLL = new GeoLatLng(resultSw.lat(), resultSw.lng());
                        const bounds = new GeoBounds(
                            neLL, swLL
                        );

                        this.journeyRoutes = this.directions.analyseRoutes(result, this.kWhPerKM);
                        if (this.journeyRoutes.length > 0) { this.selectedJourneyRoute = this.journeyRoutes[0]; }

                        // Require event emmiter for route changes to notify map
                        this.journeyManager.setRoutePolyline(this.routePolyline);
                        this.mapping.renderPolyline(this.routePolyline);
                        this.mapping.moveToMapBounds(bounds);

                        // this.changeDetector.detectChanges();
                        // create journey model(s) from routes
                        // FIXME:: this.refreshResultsAfterMapChange();
                    } else {
                        this.logging.log('No route returned..');
                    }
                    this.routeCalcInProgress = false;
                });
        }
    }

}
