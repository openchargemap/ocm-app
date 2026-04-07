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

  selectedJourneyID: string | null = null;
  selectedStageIndex: number | string | null = null;
  newJourneyName: string;
  isEditMode = false;
  private defaultNewJourneyName: string;
  private sourceJourneyID: string | null = null;
  private sourceStageIndex: number | null = null;
  private sourceWaypointIndex: number | null = null;

  waypoint: WayPoint;
  poi;

  constructor(
    public appManager: AppManager,
    public navParams: NavParams,
    public journeyManager: JourneyManager,
    private modalController: ModalController
  ) {

    this.sourceJourneyID = this.navParams.get('journeyId');
    this.sourceStageIndex = this.navParams.get('stageIndex');
    this.sourceWaypointIndex = this.navParams.get('waypointIndex');
    this.isEditMode = this.sourceJourneyID != null && this.sourceStageIndex != null && this.sourceWaypointIndex != null;

    const existingWaypoint = this.navParams.get('waypoint');
    this.poi = this.navParams.get('poi') || existingWaypoint?.PoiList?.[0]?.Poi;
    this.waypoint = existingWaypoint
      ? JSON.parse(JSON.stringify(existingWaypoint)) as WayPoint
      : this.createWaypointFromPoi(this.poi);

    this.defaultNewJourneyName = 'Trip to ' + this.poi.AddressInfo.Title;
    this.newJourneyName = this.journeyManager.getJourney(this.sourceJourneyID || '')?.Title || this.defaultNewJourneyName;

    if (this.isEditMode) {
      this.selectedJourneyID = this.sourceJourneyID;
      this.selectedStageIndex = this.sourceStageIndex;
    } else {
      const lastUsedJourneyId = this.journeyManager.getLastUsedJourneyId();
      if (lastUsedJourneyId != null) {
        this.selectedJourneyID = lastUsedJourneyId;
        this.selectedStageIndex = '';
      }
    }
  }

  private createWaypointFromPoi(poi: any): WayPoint {
    const waypoint = new WayPoint();
    waypoint.Title = poi.AddressInfo.Title;
    waypoint.PoiIDs = [poi.ID];
    waypoint.PoiList = [];

    const bookmark = new BookmarkedPOI('charging', 1);
    bookmark.Poi = poi;
    bookmark.PoiID = poi.ID;
    waypoint.PoiList.push(bookmark);

    return waypoint;
  }

  onJourneyChange() {
    this.selectedStageIndex = this.isEditMode && this.selectedJourneyID === this.sourceJourneyID
      ? this.sourceStageIndex
      : '';

    if (this.selectedJourneyID == null || this.selectedJourneyID === '') {
      this.newJourneyName = this.defaultNewJourneyName;
    }
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

  save() {
    if (!this.canAdd) {
      return;
    }

    if (this.isEditMode && this.sourceJourneyID != null && this.sourceStageIndex != null && this.sourceWaypointIndex != null) {
      this.journeyManager.updateJourneyWaypoint(
        this.sourceJourneyID,
        this.sourceStageIndex,
        this.sourceWaypointIndex,
        this.selectedJourneyID,
        this.selectedStageIndex,
        this.waypoint,
        this.newJourneyName.trim()
      );
    } else if (this.selectedJourneyID != null && this.selectedJourneyID !== '') {
      this.journeyManager.addJourneyWaypoint(this.selectedJourneyID, this.selectedStageIndex, this.waypoint);
    } else {
      const journey = new Journey();
      journey.ID = Date.now().toString();
      journey.Title = this.newJourneyName.trim();

      this.journeyManager.addJourney(journey, this.waypoint);

    }

    this.modalController.dismiss();
  }

}
