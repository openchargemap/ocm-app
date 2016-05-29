/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Base, LogLevel} from '../Base';
import {AppManager} from './AppManager';
import {Http, Response} from '@angular/http';
import {Journey, WayPoint, GeoLatLng} from '../model/AppModels';

@Injectable()

/**
 * Manage access to Journey information
 */
export class JourneyManager extends Base {

    public journeys: Array<Journey>;

    constructor() {
        super();
        this.journeys = [];
    }
    public loadJourneys() {
        //load journeys from local cache, then check for newer server copy
    }

    public saveJourneys() {
        //save to local cache, then save to server copy
    }

    public setupTestJourneys() {
        this.journeys = [];

        let journey1 = new Journey();

        journey1.Title = "New York to Brooklyn";
        journey1.Notes = "A little jaunt to Brooklyn";
        journey1.WayPoints = [];

        let waypoint1 = new WayPoint();
        waypoint1.Notes = "Starting point";
        waypoint1.Position = new GeoLatLng(40, 1.2);
        waypoint1.Title = "Start";
        journey1.WayPoints.push(waypoint1);

        let waypoint2 = new WayPoint();
        waypoint2.Notes = "Middle point";
        waypoint2.Position = new GeoLatLng(40, 1.33);
        waypoint2.Title = "Middle";
        journey1.WayPoints.push(waypoint2);

        let waypoint3 = new WayPoint();
        waypoint3.Notes = "End point";
        waypoint3.Position = new GeoLatLng(40, 1.33);
        waypoint3.Title = "End";
        journey1.WayPoints.push(waypoint3);
        this.journeys.push(journey1);

        ////////

        let journey2 = new Journey();
        journey2.Title = "Aberdeen to London";
        journey2.Notes = "Roadtrip";
        journey2.WayPoints = [];
        this.journeys.push(journey2);

    }

}