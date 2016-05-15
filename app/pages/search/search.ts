/// <reference path="../../lib/typings/googlemaps/google.maps.d.ts" />
/// <reference path="../../lib/typings/collections/collections.d.ts" />
import {Component, OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {IonicApp, Page, NavController, NavParams, Events, Platform, Loading} from 'ionic-angular';
import {Mapping, MappingAPI} from '../../core/ocm/mapping/Mapping';
import {POIManager, POISearchParams} from '../../core/ocm/services/POIManager';
import {POIDetailsPage} from '../poi-details/poi-details';
import {SettingsPage} from '../settings/settings';
import {SignInPage} from '../signin/signin';
import {AppManager} from '../../core/ocm/services/AppManager';
import {Base, LogLevel} from '../../core/ocm/Base';
import {Utils} from '../../core/ocm/Utils';
import {Keyboard} from 'ionic-native';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {PlaceSearchResult, GeoLatLng} from '../../core/ocm/model/AppModels';

@Page({
    templateUrl: 'build/pages/search/search.html',
    pipes: [TranslatePipe] // add in each component to invoke the transform method

})

export class SearchPage extends Base implements OnInit {
    mapping: Mapping;

    // translate: any;
    private mapDisplayed: boolean = false;


    private debouncedRefreshResults: any;
    private mapCanvasID: string;

    private placeList: Array<PlaceSearchResult>;
private initialResultsShown:boolean=false;

    searchKeyword: string;
    constructor(
        private appManager: AppManager,
        private nav: NavController,
        navParams: NavParams,
        private events: Events,
        private translate: TranslateService,
        private platform: Platform
    ) {
        super();

        this.mapping = new Mapping(events);

        this.mapCanvasID = "map-canvas";

        //decide whether to use native google maps ssdsdk or google web api        
        if (platform.is("ios") || platform.is("android")) {
            this.mapping.setMapAPI(MappingAPI.GOOGLE_NATIVE);
            Keyboard.disableScroll(true);
        } else {
            this.mapping.setMapAPI(MappingAPI.GOOGLE_WEB);
        }


    }

    onPageDidEnter() {
        this.log("Entered search page.", LogLevel.VERBOSE);
        //give input focus to native map
        this.mapping.focusMap();

        //attempt to find user current position
        this.locateUser();
        if (this.mapping) {
            //delayed refresh of map view to work around issue with map not showing on first load
            setTimeout(() => {
                this.mapping.updateMapSize();
            }, 1000);


        }
    }

    onPageWillLeave() {
        //remove input focus from native map
        this.mapping.unfocusMap();
    }

    getPreferredMapHeight(clientHeight: number): number {
        if (clientHeight == null) {
            clientHeight = Utils.getClientHeight();
        }
        var preferredContentHeight = clientHeight - 94;
        return preferredContentHeight;
    }

    enforceMapHeight(size: any) {
        this.log("Would resize map:" + size.width + " " + size.height, LogLevel.VERBOSE);

        let preferredContentHeight = this.getPreferredMapHeight(size[0]);

        if (document.getElementById(this.mapCanvasID).offsetHeight != preferredContentHeight) {
            document.getElementById(this.mapCanvasID).style.height = preferredContentHeight + "px";
        }
        if (this.mapping) {
            this.mapping.updateMapSize();
        }
    }

    ngOnInit() {

        this.debouncedRefreshResults = Utils.debounce(this.refreshResultsAfterMapChange, 300, false);

        this.events.subscribe('ocm:poi:selected', (args) => {

            this.viewPOIDetails(args[0]);

        });
        
        this.events.subscribe('ocm:mapping:ready', () => { 
            if (!this.initialResultsShown)    {
                this.log("Search: maps ready, showing first set of results");
                //show first set of results on load
                this.refreshResultsAfterMapChange();
            }
        });
        
        this.events.subscribe('ocm:mapping:zoom', () => { this.debouncedRefreshResults(); });
        this.events.subscribe('ocm:mapping:dragend', () => { this.debouncedRefreshResults(); });
        this.events.subscribe('ocm:poiList:updated', (listType) => { this.showPOIListOnMap(listType); });
        this.events.subscribe('ocm:poiList:cleared', () => {
            this.mapping.clearMarkers();
            this.debouncedRefreshResults();
        });

        this.events.subscribe('ocm:window:resized', (size) => {
            //handle window resized event, updating map layout if required
            this.enforceMapHeight(size[0]);
        });

        this.mapping.initMap(this.mapCanvasID);

        //centre map on users location before starting to fetch other info
        //get user position

        //centre map

        var appContext = this;


        //first start up, get fresh core reference data, then we can start getting POI results nearby
        if (!this.appManager.referenceDataManager.referenceDataLoaded()) {
            this.log("No cached ref dat, fetching ..", LogLevel.VERBOSE);
            this.appManager.api.fetchCoreReferenceData(null).subscribe((res) => {
                this.log("Got core ref data. Updating local POIs", LogLevel.VERBOSE);


            }, (rejection) => {
                this.log("Error fetching core ref data:" + rejection);
            });
        }

    }

    showPOIListOnMap(listType: string) {

        var preferredMapHeight = this.getPreferredMapHeight(null);
        //TODO: vary by list type
        this.mapping.refreshMapView(preferredMapHeight, this.appManager.poiManager.poiList, null);

        if (!this.mapDisplayed) {
            //centre map on first load
            /*var lastPOI = this.poiManager.poiList[0];
            if (lastPOI != null) {
                this.mapping.updateMapCentrePos(lastPOI.AddressInfo.Latitude, lastPOI.AddressInfo.Longitude, true);
            } */
            this.mapDisplayed = true;
        }

        this.mapping.updateMapSize();
    }

    getPOIByID(poiID) {
        var poiList = this.appManager.poiManager.poiList;
        for (var i = 0; i < poiList.length; i++) {
            if (poiList[i].ID == poiID) {
                return poiList[i];
            }
        }
        return null;
    }


    refreshResultsAfterMapChange() {
        this.log("map moved/zoomed", LogLevel.VERBOSE);


        //this.appState.isSearchInProgress = true;

        var params = new POISearchParams();
        this.mapping.getMapCenter().subscribe((mapcentre) => {
            if (mapcentre != null) {
                params.latitude = mapcentre.coords.latitude;
                params.longitude = mapcentre.coords.longitude;
            }

            /////
            //params.distance = distance;
            // params.distanceUnit = distance_unit;
            // params.maxResults = this.appConfig.maxResults;
            params.includeComments = true;
            params.enableCaching = true;

            //map viewport search on bounding rectangle instead of map centre

            //if (this.appConfig.enableLiveMapQuerying) {
            // if (this.mappingManager.isMapReady()) {
            this.mapping.getMapBounds().subscribe((bounds) => {
                if (bounds != null) {

                    params.boundingbox = "(" + bounds[0].latitude + "," + bounds[0].longitude + "),(" + bounds[1].latitude + "," + bounds[1].longitude + ")";
                    this.log(JSON.stringify(bounds), LogLevel.VERBOSE);

                }
                //close zooms are 1:1 level of detail, zoomed out samples less data
                this.mapping.getMapZoom().subscribe((zoomLevel: number) => {
                    this.log("map zoom level to be converted to level of detail:" + zoomLevel);
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

                    //apply filter settings from search settings 
                    if (this.appManager.searchSettings != null) {
                        if (this.appManager.searchSettings.ConnectionTypeList != null) {
                            params.connectionTypeIdList = this.appManager.searchSettings.ConnectionTypeList;
                        }

                        if (this.appManager.searchSettings.UsageTypeList != null) {
                            params.usageTypeIdList = this.appManager.searchSettings.UsageTypeList;
                        }

                        if (this.appManager.searchSettings.StatusTypeList != null) {
                            params.statusTypeIdList = this.appManager.searchSettings.StatusTypeList;
                        }

                        if (this.appManager.searchSettings.OperatorList != null) {
                            params.operatorIdList = this.appManager.searchSettings.OperatorList;
                        }

                        /*
                        if ($("#filter-submissionstatus").val() != 200) params.submissionStatusTypeID = $("#filter-submissionstatus").val();
                        if ($("#filter-connectiontype").val() != "") params.connectionTypeID = $("#filter-connectiontype").val();
                        if ($("#filter-minpowerkw").val() != "") params.minPowerKW = $("#filter-minpowerkw").val();
                        if ($("#filter-operator").val() != "") params.operatorID = $("#filter-operator").val();
                        if ($("#filter-connectionlevel").val() != "") params.levelID = $("#filter-connectionlevel").val();
                        if ($("#filter-usagetype").val() != "") params.usageTypeID = $("#filter-usagetype").val();
                        if ($("#filter-statustype").val() != "") params.statusTypeID = $("#filter-statustype").val();
                        */
                       
                    }
                     this.appManager.poiManager.fetchPOIList(params);
                });



            });


        }, (error)=>{
            this.log("No map centre, can't begin refresh."+error);
            
        });


    }

    viewPOIDetails(args: any) {

        if (args.poi != null) {
            this.log("Viewing POI Details " + args.poi.ID);
            this.nav.push(POIDetailsPage, {
                item: args.poi
            });

        } else {
            //may need to fetch POI details
            this.log("Viewing/fetching POI Details " + args.poiId);
            this.appManager.poiManager.getPOIById(args.poiId, true).subscribe(poi => {

                this.nav.push(POIDetailsPage, {
                    item: poi
                });
            });

        }

    }

    openSearchOptions() {
        this.nav.push(SettingsPage);
    }

    locateUser() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {

                this.mapping.updateMapCentrePos(position.coords.latitude, position.coords.longitude, true);
                this.mapping.setMapZoom(13); //TODO: provider specific ideal zoom for 'summary'
                this.mapping.updateMapSize();
            }, () => {
                ///no geolocation
                this.appManager.showToastNotification(this.nav, "Your location could not be determined.")
            });
        }
    }

    getPlaces(e: any) {


        let loading = Loading.create({
            content: "Searching..",
            dismissOnPageChange: true,
            duration: 3000
        });

        this.nav.present(loading);


        // Specify location, radius and place types for your Places API search.
        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(49.00, -13.00),
            new google.maps.LatLng(60.00, 3.00)
        );

        var request: any = {
            keyword: this.searchKeyword,
            bounds: defaultBounds,
            location: null,
            name: null,
            radius: null,
            rankBy: null
        };

        var attributionDiv = <HTMLDivElement>document.getElementById("place-attribution");
        // //TODO: move places request to API/service provider
        this.placeList = [];

        var service = new google.maps.places.PlacesService(attributionDiv);
        service.nearbySearch(request, (results, status) => {
            loading.dismiss();
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                document.getElementById("place-search").style.display = 'block';
                this.mapping.unfocusMap();

                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var placeResult = new PlaceSearchResult();
                    placeResult.Title = place.name;
                    placeResult.ReferenceID = (<any>place).place_id;
                    placeResult.Address = place.formatted_address;
                    placeResult.Type = "place";
                    placeResult.Location = new GeoLatLng(place.geometry.location.lat(), place.geometry.location.lng());
                    this.placeList.push(placeResult);
                    this.log(placeResult.Title);
                }
            }

            if (this.placeList.length == 0) {
                loading.dismiss();
                document.getElementById("place-search").style.display = 'none';
                this.mapping.focusMap();
                this.appManager.showToastNotification(this.nav, "No matching results");
            }
        });
    }

    placeSelected(e, item: PlaceSearchResult) {
        this.searchKeyword = item.Title;
        document.getElementById("place-search").style.display = 'none';

        //give map back the input focus (mainly for native map)
        this.mapping.focusMap();

        //move map to selected place
        this.mapping.updateMapCentrePos(item.Location.latitude, item.Location.longitude, true);
        this.debouncedRefreshResults();
    }


}