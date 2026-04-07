import { JourneyManager } from './../../services/JourneyManager';
import { AppManager } from './../../services/AppManager';
import { Journey, JourneyStage, WayPoint, BookmarkedPOI } from './../../model/Journey';
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { POIDetailsPage } from '../poi-details/poi-details';
import { FavouriteEditorPage } from './favourite-editor';

@Component({
    templateUrl: 'journeys.html',
    standalone: false
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {

  selectedTab: 'favourites' | 'journeys' = 'favourites';

  constructor(
    public appManager: AppManager,

    public journeyManager: JourneyManager,
    public modalController: ModalController,
    public alertController: AlertController) {

    // console.log(JSON.stringify(this.journeyManager.journeys, null, 4));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.journeyManager.fetchFavouritePOIDetails();
  }

  getJson(p: unknown): string {
    return JSON.stringify(p, null, 4);
  }

  getJourneyWaypointCount(journey: Journey): number {
    return (journey?.Stages || []).reduce((count: number, stage: JourneyStage) => count + ((stage?.WayPoints || []).length), 0);
  }

  getJourneyPoiCount(journey: Journey): number {
    return (journey?.Stages || []).reduce((count: number, stage: JourneyStage) => {
      return count + (stage?.WayPoints || []).reduce((waypointCount: number, waypoint: WayPoint) => waypointCount + ((waypoint?.PoiList || []).length), 0);
    }, 0);
  }

  getStageWaypointCount(stage: JourneyStage): number {
    return (stage?.WayPoints || []).length;
  }

  getStagePoiCount(stage: JourneyStage): number {
    return (stage?.WayPoints || []).reduce((count: number, waypoint: WayPoint) => count + ((waypoint?.PoiList || []).length), 0);
  }

  viewPOIDetails(poi: any) {
    this.modalController
      .create({ component: POIDetailsPage, componentProps: { item: poi }, cssClass: 'poi-details-modal' })
      .then(m => m.present());
  }

  getWaypointPoi(waypoint: WayPoint): any {
    return waypoint?.PoiList?.find((bookmark: BookmarkedPOI) => bookmark?.Poi != null)?.Poi || null;
  }

  editWaypoint(journeyId: string, stageIndex: number, waypointIndex: number, waypoint: WayPoint) {
    const poi = this.getWaypointPoi(waypoint);
    if (poi == null) {
      return;
    }

    this.modalController.create({
      component: FavouriteEditorPage,
      componentProps: {
        poi,
        waypoint,
        journeyId,
        stageIndex,
        waypointIndex
      }
    }).then(m => m.present());
  }

  get staticMapSize(): string {
    return '60x60';
  }

  getStaticMapURL(poi: any): string {

    // scale=2 for retina
    return 'https://maps.googleapis.com/maps/api/staticmap?center='
      + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude + '&zoom=13&scale=2&size='
      + this.staticMapSize + '&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:%7C'
      + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
  }

  deleteJourney(journeyId: string) {

    this.alertController.create({
      header: 'Delete this Journey?',
      message: 'Are you sure you want to delete this Journey?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // nope
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.journeyManager.deleteJourney(journeyId);
          }
        }
      ]
    }).then(a => a.present());

  }

  deleteFavourite(poiId: number) {

    this.alertController.create({
      header: 'Remove this Favourite?',
      message: 'Are you sure you want to remove this charging location from favourites?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Remove',
          handler: () => {
            this.journeyManager.removeFavourite(poiId);
          }
        }
      ]
    }).then(a => a.present());

  }

  launchNavigation(poi: any) {

    let url = 'https://maps.google.com/?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    if (this.appManager.platform.is('ios')) {
      url = 'https://maps.apple.com?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    }
    window.open(url, '_system');
  }
}
