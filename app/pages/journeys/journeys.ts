import {Component} from '@angular/core';
import {Modal, NavController, Alert} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Journey, WayPoint, GeoLatLng} from '../../core/ocm/model/AppModels';
import {JourneyManager} from '../../core/ocm/services/JourneyManager';
import {APIClient} from '../../core/ocm/services/APIClient';
import {POIDetailsPage} from '../poi-details/poi-details';

@Component({
  templateUrl: 'build/pages/journeys/journeys.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {

  constructor(private appManager: AppManager, private nav: NavController, private journeyManager: JourneyManager, private api: APIClient) {

    //this.discoverImages();

    //console.log(JSON.stringify(this.journeyManager.journeys, null, 4));
  }

  discoverImages() {
    //popoulate panormaio for each point
    this.journeyManager.journeys.forEach(j => {
      j.Stages.forEach(s => {
        s.WayPoints.forEach(w => {
          if (w.PoiList != null) {
            w.PoiList.forEach(p => {
             
              if (p.Poi) {
                this.api.getPanoramioLocationPhotos(new GeoLatLng(p.Poi.AddressInfo.Latitude, p.Poi.AddressInfo.Longitude)).then((photos) => {
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
    var poiDetailsModal = Modal.create(POIDetailsPage, { item: poi });
    this.nav.present(poiDetailsModal);
  }

  get staticMapSize(): string {

    return "60x60";

  }

  getStaticMapURL(poi): string {

    //scale=2 for retina
    return "https://maps.googleapis.com/maps/api/staticmap?center="
      + poi.AddressInfo.Latitude + "," + poi.AddressInfo.Longitude + "&zoom=13&scale=2&size="
      + this.staticMapSize + "&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xff0000%7Clabel:%7C"
      + poi.AddressInfo.Latitude + "," + poi.AddressInfo.Longitude;
  }
  
  deleteJourney(journeyId){
      let confirm = Alert.create({
      title: 'Delete this Journey?',
      message: 'Are you sure you want to delete this Journey?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //nope
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.journeyManager.deleteJourney(journeyId);
          }
        }
      ]
    });
    
    this.nav.present(confirm);
  }

  launchNavigation(){
    this.appManager.showToastNotification(this.nav, "Feature not yet implemented.");
  }
}
