/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs'
import {Base, LogLevel} from '../Base';

@Injectable()

export class GoogleMapsDirections {
    constructor(private http: Http) {

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
}