import {Page, NavParams, NavController} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Journey, WayPoint, GeoLatLng, BookmarkedPOI} from '../../core/ocm/model/AppModels';
import {JourneyManager} from '../../core/ocm/services/JourneyManager';

@Page({
  templateUrl: 'build/pages/journeys/favourite-editor.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class FavouriteEditorPage {

  selectedJourneyID;
  selectedStageIndex: number;
  newJourneyName: string;

  waypoint: WayPoint;
  poi;

  constructor(public appManager: AppManager, private navParams: NavParams, private nav: NavController, private journeyManager: JourneyManager) {

    this.poi = this.navParams.get('poi');
    this.waypoint = new WayPoint();
    this.waypoint.Title = this.poi.AddressInfo.Title;
    this.waypoint.PoiIDs = [this.poi.ID];
    this.waypoint.PoiList = [];
    
    let bookmark = new BookmarkedPOI("charging", 1);
    bookmark.Poi = this.poi;
    bookmark.PoiID = this.poi.ID;
    this.waypoint.PoiList.push(bookmark);
    
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
      this.journeyManager.addJourneyWaypoint(this.selectedJourneyID, this.selectedStageIndex, this.waypoint);

    } else {
      //start a new journey
      let journey = new Journey();
      journey.ID = Date.now().toString();
      if (this.newJourneyName == "") this.newJourneyName = "New Journey";
      journey.Title = this.newJourneyName;


      //add new journey

      this.journeyManager.addJourney(journey, this.waypoint);

    }

    //todo: async promise for server save
    this.journeyManager.saveJourneys();

    this.nav.pop();
  }

}
