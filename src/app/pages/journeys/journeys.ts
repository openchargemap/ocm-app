import { JourneyManager } from './../../services/JourneyManager';
import { AppManager } from './../../services/AppManager';
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { POIDetailsPage } from '../poi-details/poi-details';

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

  getJson(p): string {
    return JSON.stringify(p, null, 4);
  }

  getJourneyWaypointCount(journey): number {
    return (journey?.Stages || []).reduce((count, stage) => count + ((stage?.WayPoints || []).length), 0);
  }

  getJourneyPoiCount(journey): number {
    return (journey?.Stages || []).reduce((count, stage) => {
      return count + (stage?.WayPoints || []).reduce((waypointCount, waypoint) => waypointCount + ((waypoint?.PoiList || []).length), 0);
    }, 0);
  }

  getStageWaypointCount(stage): number {
    return (stage?.WayPoints || []).length;
  }

  getStagePoiCount(stage): number {
    return (stage?.WayPoints || []).reduce((count, waypoint) => count + ((waypoint?.PoiList || []).length), 0);
  }

  viewPOIDetails(poi) {
    this.modalController
      .create({ component: POIDetailsPage, componentProps: { item: poi }, cssClass: 'poi-details-modal' })
      .then(m => m.present());
  }

  get staticMapSize(): string {
    return '60x60';
  }

  getStaticMapURL(poi): string {

    // scale=2 for retina
    return 'https://maps.googleapis.com/maps/api/staticmap?center='
      + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude + '&zoom=13&scale=2&size='
      + this.staticMapSize + '&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:%7C'
      + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
  }

  deleteJourney(journeyId) {

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

  deleteFavourite(poiId) {

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

  launchNavigation(poi) {

    let url = 'https://maps.google.com/?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    if (this.appManager.platform.is('ios')) {
      url = 'https://maps.apple.com?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    }
    window.open(url, '_system');
  }
}
