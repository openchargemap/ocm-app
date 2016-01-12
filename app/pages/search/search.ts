/// <reference path="../../lib/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../../lib/typings/collections/collections.d.ts" />
import {Component, OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {IonicApp, Page, NavController, NavParams, Events, Translate, TranslatePipe} from 'ionic-framework/ionic';
import {Base} from '../../core/ocm/Base';
import {Mapping, MappingAPI} from '../../core/ocm/mapping/Mapping';
import {POIManager, POISearchParams} from '../../core/ocm/services/POIManager';
import {POIDetailsPage} from '../poi-details/poi-details';

@Page({
    templateUrl: 'build/pages/search/search.html',
    pipes: [TranslatePipe] // add in each component to invoke the transform method
})

export class SearchPage implements OnInit {
    mapping: Mapping;

    map: any;
    nav: any;
    //TODO: appmodel
    poiManager: POIManager;
    translate: any;
    mapDisplayed: boolean = false;

    constructor(app: IonicApp, nav: NavController, navParams: NavParams, events: Events, translate: Translate, http: Http, poiManager: POIManager) {
        this.nav = nav;
        this.map = null;
        this.translate = translate;

        this.poiManager = poiManager;

        this.mapping = new Mapping(events);

        this.mapping.setMapAPI(MappingAPI.GOOGLE_WEB);
        this.mapping.initMap("map-canvas");

        //////

        this.translate.translations('de', {
            'Location': 'lage',
            'ocm.test.key': 'wibble'
        });

        //this.translate.setLanguage('de');

        console.log("trans: " + this.translate.translate('Location')); // Shows 'Location'
        console.log("trans: " + this.translate.translate('ocm.test.key')); // Shows 'Location'
    
        ///

        
        events.subscribe('ocm:poi:selected', (poi) => { this.viewPOIDetails(poi[0]); });
        events.subscribe('ocm:mapping:zoom', () => { this.refreshResultsAfterMapChange(); });
        events.subscribe('ocm:mapping:dragend', () => { this.refreshResultsAfterMapChange(); });
        events.subscribe('ocm:poiList:updated', (listType) => { this.showPOIListOnMap(listType); });

       

    }

    ngOnInit() {
        
        //centre map on users location before starting to fetch other info
        //get user position
        
        //centre map
        
        //first start up, get fresh core reference data, then we can start getting POI results nearby
        
        
        this.poiManager.fetchCoreReferenceData().then(() => {
            console.log("Got core ref data. Updating local POIs");
            var params = new POISearchParams();
            this.poiManager.fetchPOIList(params);
        });
        
        /*
        var appContext = this;
         this.poiManager.populateTestData();
        var testPOI = this.getPOIByID(52224);
  
        setTimeout(function() { appContext.viewPOIDetails(testPOI); }, 1000);
        */
    }

    showPOIListOnMap(listType: string) {
        
        //TODO: vary by list type
        this.mapping.refreshMapView(500, this.poiManager.poiList, null);

        if (!this.mapDisplayed) {
            //centre map on first load
            var lastPOI = this.poiManager.poiList[0];
            this.mapping.updateMapCentrePos(lastPOI.AddressInfo.Latitude, lastPOI.AddressInfo.Longitude, true);
            this.mapDisplayed = true;
        }

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


    refreshResultsAfterMapChange() {
        console.log("map moved/zoomed");

        
        //this.appState.isSearchInProgress = true;

        var params = new POISearchParams();
        var mapcentre = this.mapping.getMapCenter();
        params.latitude = mapcentre.coords.latitude;
        params.longitude = mapcentre.coords.longitude;
        //params.distance = distance;
        // params.distanceUnit = distance_unit;
        // params.maxResults = this.appConfig.maxResults;
        params.includeComments = true;
        params.enableCaching = true;

        //map viewport search on bounding rectangle instead of map centre

        //if (this.appConfig.enableLiveMapQuerying) {
        // if (this.mappingManager.isMapReady()) {
        var bounds = this.mapping.getMapBounds();
        if (bounds != null) {
            params.boundingbox = "(" + bounds[0].latitude + "," + bounds[0].longitude + "),(" + bounds[1].latitude + "," + bounds[1].longitude + ")";
        }

        //close zooms are 1:1 level of detail, zoomed out samples less data
        var zoomLevel = this.mapping.getMapZoom();

        if (zoomLevel > 10) {
            params.levelOfDetail = 1;
        } else if (zoomLevel > 6) {
            params.levelOfDetail = 3;
        } else if (zoomLevel > 4) {
            params.levelOfDetail = 5;
        } else if (zoomLevel > 3) {
            params.levelOfDetail = 10;
        }
        else {
            params.levelOfDetail = 20;
        }
        //this.log("zoomLevel:" + zoomLevel + "  :Level of detail:" + params.levelOfDetail);
        //    }
        //}

        //apply filter settings from UI
        /*
        if ($("#filter-submissionstatus").val() != 200) params.submissionStatusTypeID = $("#filter-submissionstatus").val();
        if ($("#filter-connectiontype").val() != "") params.connectionTypeID = $("#filter-connectiontype").val();
        if ($("#filter-minpowerkw").val() != "") params.minPowerKW = $("#filter-minpowerkw").val();
        if ($("#filter-operator").val() != "") params.operatorID = $("#filter-operator").val();
        if ($("#filter-connectionlevel").val() != "") params.levelID = $("#filter-connectionlevel").val();
        if ($("#filter-usagetype").val() != "") params.usageTypeID = $("#filter-usagetype").val();
        if ($("#filter-statustype").val() != "") params.statusTypeID = $("#filter-statustype").val();
        */
        this.poiManager.fetchPOIList(params);
    }

    viewPOIDetails(poi: any) {

        this.nav.push(POIDetailsPage, {
            item: poi
        });
    }
}