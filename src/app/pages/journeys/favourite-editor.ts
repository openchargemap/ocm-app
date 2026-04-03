import { JourneyManager } from './../../services/JourneyManager';
import { AppManager } from './../../services/AppManager';
import { WayPoint, BookmarkedPOI, Journey } from './../../model/Journey';
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'favourite-editor.html',
    standalone: false
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
    this.modalController.dismiss();
  }

  get canAdd(): boolean {
    if (this.selectedJourneyID != null && this.selectedJourneyID !== '') {
      return !!this.waypoint?.Title?.trim();
    }

    return !!this.newJourneyName?.trim() && !!this.waypoint?.Title?.trim();
  }

  add() {
    if (!this.canAdd) {
      return;
    }

    // store new waypoint in journey
    if (this.selectedJourneyID != null && this.selectedJourneyID !== '') {

      this.journeyManager.addJourneyWaypoint(this.selectedJourneyID, this.selectedStageIndex, this.waypoint);

    } else {
      // start a new journey
      const journey = new Journey();
      journey.ID = Date.now().toString();
      journey.Title = this.newJourneyName.trim();

      this.journeyManager.addJourney(journey, this.waypoint);

    }

    this.modalController.dismiss();
  }

}
