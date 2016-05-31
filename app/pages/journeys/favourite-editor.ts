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
  selectedStageIndex:number;
  newJourneyName: string;
  
  waypoint: WayPoint;
  poi;

  constructor(public appManager: AppManager, private navParams: NavParams, private nav: NavController) {

    this.poi = this.navParams.get('poi');
    this.waypoint = new WayPoint();
    this.waypoint.Title = this.poi.AddressInfo.Title;
    this.waypoint.PoiIDs = [this.poi.ID];
    this.waypoint.PoiList = [this.poi];


    this.newJourneyName = "Trip to " + this.poi.AddressInfo.Title;
  }

  cancel() {
    this.nav.pop();
  }
  add() {

    //TODO: validation

    //store new waypoint in journey
    if (this.selectedJourneyID != null && this.selectedJourneyID != "") {

      //TODO: should be injected instance of JourneyManager instead of via appManager
      this.appManager.journeyManager.addJourneyWaypoint(this.selectedJourneyID,this.selectedStageIndex, this.waypoint);

    } else {
      //start a new journey
      let journey = new Journey();
      journey.ID = Date.now().toString();
      if (this.newJourneyName == "") this.newJourneyName = "New Journey";
      journey.Title = this.newJourneyName;
    

      //add new journey

      this.appManager.journeyManager.addJourney(journey, this.waypoint);

    }

    //todo: async promise for server save
    this.appManager.journeyManager.saveJourneys()

    this.nav.pop();
  }

}
