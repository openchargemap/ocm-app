/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

declare var google: any;

import { Injectable } from '@angular/core';
import { JourneyManager } from './JourneyManager';
import { JourneyRoute, JourneyRouteLeg } from '../model/Journey';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Injectable({
    providedIn: 'root',
})

export class GoogleMapsDirections {

    constructor(public http: HttpClient, public journeyManager: JourneyManager) {

    }
    public getDirections(origin: string, destination: string): Promise<any> {

        return new Promise((resolve, reject) => {
            const directionsService = new google.maps.DirectionsService;

            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => {

                if (status === google.maps.DirectionsStatus.OK) {
                    resolve(response);
                    //  directionsDisplay.setDirections(response);
                } else {
                    reject(status);
                }
            });
        });
    }

    public analyseRoutes(routeResults: any, kWhPerKM: number): Array<JourneyRoute> {
        const journeyRoutes = new Array<JourneyRoute>();

        // analyse power consumption of the routes and summarise the route

        routeResults.routes.forEach(route => {
            const journeyRoute = new JourneyRoute();

            journeyRoute.Title = '' + journeyRoutes.length + 1;
            journeyRoute.JourneyRouteLegs = new Array<JourneyRouteLeg>();
            journeyRoute.TotalDistanceKM = 0;
            journeyRoute.TotalDurationMinutes = 0;
            journeyRoute.TotalEnergykWh = 0;

            route.legs.forEach(leg => {
                const durationsSeconds = leg.duration.value;
                const distanceKM = leg.distance.value / 1000;
                const powerConsumption = this.journeyManager.calculateEnergyConsumptionkWh(distanceKM, 0, null, kWhPerKM);

                const journeyLeg = new JourneyRouteLeg();
                journeyLeg.DistanceKM = distanceKM;
                journeyLeg.DurationMinutes = durationsSeconds / 60;
                journeyLeg.EnergyConsumptionkWh = powerConsumption;

                journeyRoute.JourneyRouteLegs.push(journeyLeg);

                journeyRoute.TotalDistanceKM += journeyLeg.DistanceKM;
                journeyRoute.TotalDurationMinutes += journeyLeg.DurationMinutes;
                journeyRoute.TotalEnergykWh = journeyLeg.EnergyConsumptionkWh;
            });
            journeyRoutes.push(journeyRoute);
        });

        return journeyRoutes;
    }

}
