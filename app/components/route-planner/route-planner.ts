import { Component, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {PlaceSearchResult, GeoLatLng, GeoBounds, POISearchParams, JourneyRoute, JourneyRouteLeg} from '../../core/ocm/model/AppModels';
import {Logging} from '../../core/ocm/services/Logging';
import {GoogleMapsDirections} from '../../core/ocm/services/GoogleMapsDirections';
import {Mapping} from '../../core/ocm/mapping/Mapping';
import {JourneyManager} from '../../core/ocm/services/JourneyManager';
import {PlaceSearch} from '../../components/place-search/place-search';
/*
  Route Planning Component providing Start/Destination selection UI and summary of required energy for journey
*/
@Component({
    selector: 'route-planner',
    templateUrl: 'build/components/route-planner/route-planner.html',
    directives: [PlaceSearch]
})
export class RoutePlanner {


    private routeStartPlace: any;
    private routeDestinationPlace: any;
    private routeSearchDistance: number = 5;
    private journeyRoutes: Array<JourneyRoute>;
    private selectedJourneyRoute: JourneyRoute;
    private routePolyline: string;
    private routeCalcInProgress: boolean = false;
    private advancedSettingsMode: boolean = false;
    private kWhPerKM: number;

    constructor(private mapping: Mapping, private directions: GoogleMapsDirections, private logging: Logging, private journeyManager: JourneyManager, private changeDetector: ChangeDetectorRef, private numberPipe: DecimalPipe) {
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
