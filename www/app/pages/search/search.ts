/// <reference path="../../lib/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../../lib/typings/collections/collections.d.ts" />

import {IonicApp, Page, NavController, NavParams, Events} from 'ionic-framework/ionic';
import {Base} from '../../core/ocm/Base';
import {Mapping, MappingAPI} from '../../core/ocm/mapping/Mapping';
import {POIManager} from '../../core/ocm/services/POIManager';
import {POIDetailsPage} from '../poi-details/poi-details';

@Page({
    templateUrl: 'app/pages/search/search.html',
})

export class SearchPage {
    mapping: Mapping;

    map: any;
    //TODO: appmodel
    poiManager: POIManager;


    constructor(app: IonicApp, nav: NavController, navParams: NavParams, events: Events) {
        this.nav = nav;
        this.map = null;

        this.mapping = new Mapping(events);

        this.mapping.setMapAPI(MappingAPI.GOOGLE_WEB);
        this.mapping.initMap("map-canvas");



        this.poiManager = new POIManager();
        this.mapping.refreshMapView(500, this.poiManager.poiList, null);
        var lastPOI = this.poiManager.poiList[0];
        this.mapping.updateMapCentrePos(lastPOI.AddressInfo.Latitude, lastPOI.AddressInfo.Longitude, true);
        //this.loadMap();
        
        events.subscribe('ocm:poi:selected', (poi) => { this.viewPOIDetails(poi) });

        var appContext = this;
        var testPOI = this.getPOIByID(57617);
        setTimeout(function() { appContext.viewPOIDetails(testPOI); }, 1000);

    }

    getPOIByID(poiID) {
        var poiList = this.poiManager.poiList;
        for (var i = 0; i < poiList.length; i++) {
            if (poiList[i].ID == poiID) {
                return poiList[i];
            }
        }
        return null;
    }

    loadMap() {
        let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    addMarker() {
        console.log("nothing to do");
    }

    viewPOIDetails(poi: any) {
        //alert(JSON.stringify(poi));
        //poi is an array of 1 items
        this.nav.push(POIDetailsPage, {
            item: poi
        });
    }
}