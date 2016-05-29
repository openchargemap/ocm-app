import {Page} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Journey, WayPoint, GeoLatLng} from '../../core/ocm/model/AppModels';

@Page({
  templateUrl: 'build/pages/journeys/journeys.html',
})

/**
 * Journeys are collections of favourites, optionally along routes
 */
export class JourneysPage {
 
  constructor(public appManager: AppManager) {
   
    
  }
  
  test(){
    var journey = this.appManager.journeyManager.journeys[0];
    //var photos= this.appManager.api.getPanoramioLocationPhotos(new GeoLatLng(journey.WayPoints[0].PoiList[0]))
  }
  
 
}
