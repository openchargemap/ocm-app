import {Page} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {GeoLatLng} from '../../core/ocm/mapping/Mapping';
import {Journey, WayPoint} from '../../core/ocm/model/AppModels';

@Page({
  templateUrl: 'build/pages/journeys/journeys.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {
  public journeys: Array<Journey>;
  constructor(public appManager: AppManager) {
    this.setupTestJourneys();
    
  }
  setupTestJourneys() {
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
