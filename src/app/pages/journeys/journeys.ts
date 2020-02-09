import { JourneyManager } from './../../services/JourneyManager';
import { APIClient } from './../../services/APIClient';
import { AppManager } from './../../services/AppManager';
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { GeoLatLng } from '../../model/AppModels';

import { POIDetailsPage } from '../poi-details/poi-details';

@Component({
  templateUrl: 'journeys.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {

  constructor(
    public appManager: AppManager,

    public journeyManager: JourneyManager,
    public api: APIClient,
    public modalController: ModalController,
    public alertController: AlertController) {

    // this.discoverImages();

    // console.log(JSON.stringify(this.journeyManager.journeys, null, 4));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  discoverImages() {
    // populate panormaio for each point
    this.journeyManager.journeys.forEach(j => {
      j.Stages.forEach(s => {
        s.WayPoints.forEach(w => {
          if (w.PoiList != null) {
            w.PoiList.forEach(p => {

              if (p.Poi) {
                this.api.getPanoramioLocationPhotos(
                  new GeoLatLng(p.Poi.AddressInfo.Latitude, p.Poi.AddressInfo.Longitude))
                  .then((photos) => {
                    p.Photos = photos;
                  });
              }
            });
          }
        });
      });
    });

  }

  getJson(p): string {
    return JSON.stringify(p, null, 4);
  }

  viewPOIDetails(poi) {
    this.modalController
      .create({ component: POIDetailsPage, componentProps: { item: poi } })
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

  launchNavigation(poi) {

    let url = 'https://maps.google.com/?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    if (this.appManager.platform.is('ios')) {
      url = 'https://maps.apple.com?q=' + poi.AddressInfo.Latitude + ',' + poi.AddressInfo.Longitude;
    }
    window.open(url, '_system');
  }
}
