import {Page, Modal, NavController} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Journey, WayPoint, GeoLatLng} from '../../core/ocm/model/AppModels';
import {JourneyManager} from '../../core/ocm/services/JourneyManager';
import {POIDetailsPage} from '../poi-details/poi-details';

@Page({
  templateUrl: 'build/pages/journeys/journeys.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {

  constructor(private appManager: AppManager, private nav: NavController, private journeyManager:JourneyManager) {


  }

  test() {
    console.log(JSON.stringify(this.journeyManager.journeys, null, 4));
  }

  getJson(p): string {
    return JSON.stringify(p, null, 4);
  }

  viewPOIDetails(poi) {
    var poiDetailsModal = Modal.create(POIDetailsPage, { item: poi });
    this.nav.present(poiDetailsModal);
  }
  
  
}
