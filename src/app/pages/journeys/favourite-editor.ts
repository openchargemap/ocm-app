import { JourneyManager } from './../../services/JourneyManager';
import { AppManager } from './../../services/AppManager';
import { WayPoint, BookmarkedPOI, Journey } from './../../model/Journey';
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  templateUrl: 'favourite-editor.html',
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

  constructor(
    public appManager: AppManager,
    public navParams: NavParams,
    public journeyManager: JourneyManager,
    private modalController: ModalController
  ) {

    this.poi = this.navParams.get('poi');
    this.waypoint = new WayPoint();
    this.waypoint.Title = this.poi.AddressInfo.Title;
    this.waypoint.PoiIDs = [this.poi.ID];
    this.waypoint.PoiList = [];

    const bookmark = new BookmarkedPOI('charging', 1);
    bookmark.Poi = this.poi;
    bookmark.PoiID = this.poi.ID;
    this.waypoint.PoiList.push(bookmark);

    this.newJourneyName = 'Trip to ' + this.poi.AddressInfo.Title;
  }

  cancel() {
    // FIXME: this.nav.pop
    this.modalController.dismiss();
  }

  add() {

    // TODO: validation

    // store new waypoint in journey
    if (this.selectedJourneyID != null && this.selectedJourneyID !== '') {

      // TODO: should be injected instance of JourneyManager instead of via appManager
      this.journeyManager.addJourneyWaypoint(this.selectedJourneyID, this.selectedStageIndex, this.waypoint);

    } else {
      // start a new journey
      const journey = new Journey();
      journey.ID = Date.now().toString();
      if (this.newJourneyName === '') {
        this.newJourneyName = 'New Journey';
      }
      journey.Title = this.newJourneyName;


      // add new journey

      this.journeyManager.addJourney(journey, this.waypoint);

    }

    // todo: async promise for server save
    this.journeyManager.saveJourneys();

    this.modalController.dismiss();
  }

}
