import {Page, NavParams, NavController} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Journey, WayPoint, GeoLatLng} from '../../core/ocm/model/AppModels';

@Page({
  templateUrl: 'build/pages/journeys/favourite-editor.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class FavouriteEditorPage {

  selectedJourneyID;
  newJourneyName: string;
  waypoint: WayPoint;
  poi;

  constructor(public appManager: AppManager, private navParams: NavParams, private nav: NavController) {

    this.poi = this.navParams.get('poi');
    this.waypoint = new WayPoint();
    this.waypoint.Title = this.poi.AddressInfo.Title;
    this.waypoint.PoiIDs =[this.poi.ID];
    this.waypoint.PoiList = [this.poi];
  

    this.newJourneyName = "Trip to " + this.poi.AddressInfo.Title;
  }

  cancel() {
    this.nav.pop();
  }
  add() {

//TODO: validation

    //store new waypoint in journey
    if (this.selectedJourneyID != null) {
      
      //TODO: should be injected instance of JourneyManager instead of via appManager
      let j = this.appManager.journeyManager.journeys.filter(j => j.ID == this.selectedJourneyID);
      if (j.length > 0) {
        let journey = j[0];
        //add waypoint to existing journey
        journey.WayPoints.push(this.waypoint);
      }
    } else {
      //start a new journey
      let journey = new Journey();
      journey.ID=Date.now.toString();
      if (this.newJourneyName=="") this.newJourneyName="New Journey";
      journey.Title = this.newJourneyName;
      journey.WayPoints = [];
      journey.WayPoints.push(this.waypoint);
      
      //add new journey
  
      this.appManager.journeyManager.journeys.push(journey);
      
    }

    this.nav.pop();
  }

}
