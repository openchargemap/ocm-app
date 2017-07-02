import { GeoLatLng, GeoBounds } from './../../model/GeoPosition';
import { JourneyManager } from './../../providers/JourneyManager';
import { Logging } from './../../providers/Logging';
import { GoogleMapsDirections } from './../../providers/GoogleMapsDirections';
import { Mapping } from './../../providers/mapping/Mapping';
import { JourneyRoute } from './../../model/Journey';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';

declare var google:any;
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

    routeStartPlace: any;
    routeDestinationPlace: any;

    routeCalcInProgress: boolean = false;
    advancedSettingsMode: boolean = false;
      
    routeStart:string="";
    routeDestination:string="";

    constructor(
        public mapping: Mapping,
        public directions: GoogleMapsDirections,
        public logging: Logging,
        public journeyManager: JourneyManager,
        public changeDetector: ChangeDetectorRef,
        public numberPipe: DecimalPipe
    ) {
        this.kWhPerKM = 0.212; //Model S = ~0.24, Leaf = ~0.212
    }

    get isRouteSet(): boolean {
        if (this.routeStartPlace != null && this.routeDestinationPlace != null) {
            return true;
        }
        else {
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
        //alert(JSON.stringify($e));
        this.routeStartPlace = $e;
        this.calculateRoute();
        this.changeDetector.detectChanges();
    }

    routeDestinationSelected($e) {
        //alert(JSON.stringify($e));
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
            return this.numberPipe.transform(durationMins, "1.0-2") + " mins";
        } else {
            let hours = Math.round(durationMins / 60);
            let mins = Math.floor(durationMins - (hours * 60));
            return hours + " hours " + (mins > 0 ? mins + " mins" : "");
        }
    }

    calculateRoute() {
        if (this.routeStartPlace != null && this.routeDestinationPlace != null) {
            //start a new route discovery
            this.logging.log("Fetching route directions..");
            this.routeCalcInProgress = true;

            this.directions.getDirections(
                this.routeStartPlace.geometry.location.lat() + "," + this.routeStartPlace.geometry.location.lng(),
                this.routeDestinationPlace.geometry.location.lat() + "," + this.routeDestinationPlace.geometry.location.lng()).then((result: google.maps.DirectionsResult) => {
                    if (result.routes != null && result.routes.length > 0) {
                        this.logging.log("Got route directions, analysing..");
                        this.routePolyline = (<any>result.routes[0]).overview_polyline;

                        var resultSw = result.routes[0].bounds.getSouthWest();
                        var resultNe = result.routes[0].bounds.getNorthEast();
                        var neLL = new GeoLatLng(resultNe.lat(), resultNe.lng());
                        var swLL = new GeoLatLng(resultSw.lat(), resultSw.lng())
                        let bounds = new GeoBounds(
                            neLL, swLL
                        );

                        this.journeyRoutes = this.directions.analyseRoutes(result, this.kWhPerKM);
                        if (this.journeyRoutes.length > 0) this.selectedJourneyRoute = this.journeyRoutes[0];

                        //Require event emmiter for route changes to notify map 
                        this.journeyManager.setRoutePolyline(this.routePolyline);
                        this.mapping.renderPolyline(this.routePolyline);
                        this.mapping.moveToMapBounds(bounds);

                        //this.changeDetector.detectChanges();
                        //create journey model(s) from routes
                        //FIXME:: this.refreshResultsAfterMapChange();
                    } else {
                        this.logging.log("No route returned..");
                    }
                    this.routeCalcInProgress = false;
                });
        }
    }

}
