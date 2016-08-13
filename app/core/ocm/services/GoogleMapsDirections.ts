/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs'
import {Base, LogLevel} from '../Base';
import {JourneyManager} from './JourneyManager';
import {JourneyRoute, JourneyRouteLeg} from '../model/Journey';

@Injectable()

export class GoogleMapsDirections {
    constructor(private http: Http, private journeyManager: JourneyManager) {

    }
    public getDirections(origin: string, destination: string): Promise<any> {
        /*let serviceURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyByLzjY5hN50wv5YuaoxQ8I2Dl7N41Hnls";



        return this.http.get(serviceURL)
            .map((res) => {
                return res.json();
            }).toPromise();
            */
        return new Promise((resolve, reject) => {
            var directionsService = new google.maps.DirectionsService;
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
            })
        });
    }

    public analyseRoutes(routeResults: google.maps.DirectionsResult,kWhPerKM:number ): Array<JourneyRoute> {
        let journeyRoutes = new Array<JourneyRoute>();
        //analyse power consumption of the routes and summarise the route
        routeResults.routes.forEach(route => {
            let journeyRoute = new JourneyRoute();
            journeyRoute.Title = "" + journeyRoutes.length + 1;
            journeyRoute.JourneyRouteLegs = new Array<JourneyRouteLeg>();
            journeyRoute.TotalDistanceKM = 0;
            journeyRoute.TotalDurationMinutes = 0;
            journeyRoute.TotalEnergykWh = 0;

            route.legs.forEach(leg => {
                let durationsSeconds = leg.duration.value;
                let distanceKM = leg.distance.value / 1000;
                let powerConsumption = this.journeyManager.calculateEnergyConsumptionkWh(distanceKM, 0, null, kWhPerKM);
            
                let journeyLeg = new JourneyRouteLeg();
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