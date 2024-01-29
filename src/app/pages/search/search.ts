import { environment } from './../../../environments/environment';
import { AppConfig } from './../../core/AppConfig';
import { SettingsPage } from './../settings/settings';
import { TranslateService } from '@ngx-translate/core';
import { RoutePlannerPage } from './../route-planner/route-planner';
import { POIDetailsPage } from './../poi-details/poi-details';
import { GeoLatLng, GeoPosition } from './../../model/GeoPosition';
import { POISearchParams } from './../../model/POISearchParams';
import { Utils } from './../../core/Utils';
import { Logging, LogLevel } from './../../services/Logging';
import { JourneyManager } from './../../services/JourneyManager';
import { Mapping } from './../../services/mapping/Mapping';
import { POIManager } from './../../services/POIManager';
import { AppManager } from './../../services/AppManager';
import { Component, OnInit, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, Platform, ModalController, AlertController } from '@ionic/angular';
import { PlaceSearch } from '../../components/place-search/place-search';
import { PlaceSearchResult } from '../../model/AppModels';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Events } from '../../services/Events';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';

@Component({
  templateUrl: 'search.html',
  styleUrls: ['./search.scss']
})

export class SearchPage implements OnInit, AfterViewInit {

  private mapDisplayed: boolean = false;
  private debouncedRefreshMapResults: any;
  private mapCanvasID: string;

  private initialResultsShown: boolean = false;

  private searchOnDemand: boolean = false;

  public poiViewMode: string = 'modal'; // side or modal
  public sideViewAvailable = false;

  private searchPolyline: string;
  private routePlanningMode: boolean = true;

  public searchKeyword: string = '';
  public selectedPOI: any;

  public appConfig = new AppConfig();

  public defaultMapZoom: number = 15;

  public defaultStartPos = new GeoLatLng(37.415328, -122.076575);

  @ViewChild(PlaceSearch, { static: true })
  placeSearchMapPOI: PlaceSearch;

  constructor(
    public appManager: AppManager,
    public nav: NavController,

    public events: Events,
    public translate: TranslateService,
    public platform: Platform,
    public poiManager: POIManager,
    public mapping: Mapping,
    public journeyManager: JourneyManager,
    public zone: NgZone,

    public modalController: ModalController,
    private alertController: AlertController,
    public logging: Logging
  ) {

    this.mapCanvasID = 'map-canvas';

    this.mapping.setMapType(appManager.searchSettings.MapType);
    this.mapping.setMapAPI(environment.defaultMapProvider);

    // listen for window resize events
    const resizeEvent = fromEvent(window, 'resize');
    resizeEvent.pipe(debounceTime(500)).subscribe((event) => {
      let size = { width: Utils.getClientHeight(), height: Utils.getClientWidth() };

      this.events.publish('ocm:window:resized', [size]);
    });
  }

  ionViewDidEnter() {
    this.logging.log('Entered search page.', LogLevel.VERBOSE);
    // give input focus to native map
    this.mapping.focusMap();
    this.mapping.updateMapSize();
  }

  ionViewWillLeave() {
    // remove input focus from native map
    this.logging.log('Leaving search page.', LogLevel.VERBOSE);
    this.mapping.unfocusMap();
  }

  getPreferredMapHeight(clientHeight: number): number {
    if (clientHeight == null) {
      clientHeight = Utils.getClientHeight();
    }
    const preferredContentHeight = clientHeight - 56;
    return preferredContentHeight;
  }

  enforceMapHeight(size: any) {
    this.logging.log('Would resize map:' + size.width + ' ' + size.height, LogLevel.VERBOSE);

    const preferredContentHeight = this.getPreferredMapHeight(size[0]);

    if (document.getElementById(this.mapCanvasID).offsetHeight !== preferredContentHeight) {
      document.getElementById(this.mapCanvasID).style.height = preferredContentHeight + 'px';
    }
    if (this.mapping) {
      this.logging.log('Map height:' + preferredContentHeight, LogLevel.VERBOSE);
      this.mapping.updateMapSize();
    }
  }

  async initialiseMapping() {

    await this.platform.ready();

    this.debouncedRefreshMapResults = Utils.debounce(this.refreshMapResults, 1000, false);

    this.events.subscribe('ocm:mapping:ready', async () => {

      this.logging.log("init map: mapping ready");
      // on map ready, perform an initial search either a a preset position or the users location

      if (this.mapping) {
        this.mapping.updateMapSize();
      }

      if (!this.initialResultsShown) {

        // if start position already set, use that for first search
        if (this.appManager.searchSettings.StartSearchPosition && !this.appManager.searchSettings.StartViewPoiId) {

          this.searchOnDemand = true;

          this.mapping.updateMapCentrePos(this.appManager.searchSettings.StartSearchPosition.latitude, this.appManager.searchSettings.StartSearchPosition.longitude, true, this.defaultMapZoom);

        } else {

          // when embedded the browser will need to prompt the user for location permission, this should be as the result of a user interaction.
          let locationEnabled = localStorage.getItem("_locationEnabled");

          if (this.appManager.isEmbeddedMode == true && locationEnabled != 'true') {

            // user need to be asked for position
            const alert = await this.alertController.create({
              header: 'Search using your location?',
              message: 'Select OK to continue.',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: async () => {
                    // denied
                    await this.useFallbackPosition();
                  }
                }, {
                  text: 'OK',
                  handler: async () => {

                    await this.locateUser();
                  }
                }
              ]
            });

            await alert.present();

          } else {
            // attempt to geolocate user and perform search
            await this.locateUser();

            if (this.mapping) {
              this.mapping.updateMapSize();
            }
          }
        }

      }
    });

    this.events.subscribe('ocm:mapping:zoom', () => { this.debouncedRefreshMapResults(); });
    this.events.subscribe('ocm:mapping:dragend', () => { this.debouncedRefreshMapResults(); });
    this.events.subscribe('ocm:poiList:updated', (listType) => { this.showPOIListOnMap(listType); });
    this.events.subscribe('ocm:poiList:cleared', () => {
      this.mapping.clearMarkers();
      setTimeout(() => {
        this.debouncedRefreshMapResults();
      }, 500);
    });

    this.events.subscribe('ocm:window:resized', (size) => {
      // handle window resized event, updating map layout if required
      if (size != null && size.length > 0) {
        this.enforceMapHeight(size[0]);
      }
    });

    this.events.subscribe('ocm:poi:selected', (args) => {

      if (args.poi) {
        this.viewPOIDetails(args, args.poi);
      } else {
        // perform lookup for POI then open details and recenter map
          this.viewPOIDetails(args, null, true); 
      }
    });

    // if this is cordova, map init can't happen until after platform ready
    // platform ready
    this.mapping.initMap(this.mapCanvasID);

  }

  async ngAfterViewInit() {
    await this.initialiseMapping();
  }

  async ngOnInit() {

    // first start up, get fresh core reference data, then we can start getting POI results nearby

    this.logging.log('Refreshing reference data ..', LogLevel.VERBOSE);
    const refreshedOK = await this.appManager.referenceDataManager.refreshReferenceData(this.appManager.api);

    if (!refreshedOK) {
      // problem connecting to API
      this.appManager.isOffline = true;
    }
  }

  showPOIListOnMap(listType: string) {

    const preferredMapHeight = this.getPreferredMapHeight(null);

    this.mapping.refreshMapView(preferredMapHeight, this.poiManager.poiList, null);

    if (!this.mapDisplayed) {
      this.mapDisplayed = true;
    }
  }

  getIconForPOI(poi) {
    return Utils.getIconForPOI(poi);
  }

  getPOIByID(poiID) {
    const poiList = this.poiManager.poiList;
    for (let i = 0; i < poiList.length; i++) {
      if (poiList[i].ID === poiID) {
        return poiList[i];
      }
    }
    return null;
  }


  async refreshMapResults() {
    if (!this.searchOnDemand) {
      this.logging.log('Skipping refresh, search on demand disabled..', LogLevel.VERBOSE);
      return;
    } else {
      this.logging.log('Refreshing Results..', LogLevel.VERBOSE);
    }

    /**
     * given a StartSearchPosition a lat/lng centered search will be performed, otherwise we perform a query based on the current map bounds
     */

    const params = new POISearchParams();
    let mapcentre: GeoPosition = null;

    if (this.appManager.searchSettings.StartViewPoiId) {
      // get details of given POI, centre map on it and view the POI
      let id = this.appManager.searchSettings.StartViewPoiId;
      this.appManager.searchSettings.StartViewPoiId = null;

      let poi = await this.poiManager.getPOIById(id, true);
      if (poi) {
        this.events.publish('ocm:poi:selected', { poiId: poi.ID, poi: poi });
        this.mapping.updateMapCentrePos(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude, true, this.defaultMapZoom);
      }

    }

    if (this.appManager.searchSettings.StartSearchPosition) {
      mapcentre = new GeoPosition(this.appManager.searchSettings.StartSearchPosition.latitude, this.appManager.searchSettings.StartSearchPosition.longitude);
      // clear start position after first search
      this.appManager.searchSettings.StartSearchPosition = null;
    }

    if (mapcentre && mapcentre.coords.latitude == 0 && mapcentre.coords.longitude == 0) {
      this.logging.log('Map center is zero. No query will be performed', LogLevel.WARNING);
      return;
    }

    if (mapcentre != null) {
      params.latitude = mapcentre.coords.latitude;
      params.longitude = mapcentre.coords.longitude;

      params.distance = 25;
      params.boundingbox = null;

      // store this as last known map centre
      this.appManager.searchSettings.LastSearchPosition = new GeoLatLng(mapcentre.coords.latitude, mapcentre.coords.longitude);
    } else {
      params.latitude = null;
      params.longitude = null;

      // map viewport search on bounding rectangle instead of map centre
      let bounds = await this.mapping.getMapBounds().toPromise();
      params.boundingbox = '(' + bounds[0].latitude +
        ',' + bounds[0].longitude + '),(' + bounds[1].latitude +
        ',' + bounds[1].longitude + ')';

      this.logging.log(JSON.stringify(bounds), LogLevel.VERBOSE);

    }

    params.includeComments = true;
    params.enableCaching = true;

    // apply filter settings from search settings
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

      if (this.appManager.searchSettings.MinPowerKW != null && this.appManager.searchSettings.MinPowerKW > 0) {
        params.minPowerKW = this.appManager.searchSettings.MinPowerKW;
      }

      if (this.appManager.searchSettings.MaxPowerKW != null && this.appManager.searchSettings.MaxPowerKW > 0) {
        params.maxPowerKW = this.appManager.searchSettings.MaxPowerKW;
      }

      if (this.appManager.searchSettings.MaxResults != null && this.appManager.searchSettings.MaxResults > 0 && this.appManager.searchSettings.MaxResults <= 10000) {
        params.maxResults = this.appManager.searchSettings.MaxResults;
      }

      if (this.journeyManager.getRoutePolyline() != null) {
        // when searching along a polyline we discard any other bounding box filters etc
        params.polyline = this.journeyManager.getRoutePolyline();
        params.boundingbox = null;
        params.levelOfDetail = null;
        params.latitude = null;
        params.longitude = null;

      }

    }

    // if user has recently edited a POI or enabled pending POIs, show pending listings
    if (this.appManager.searchSettings.EnablePOIPendingApproval) {
      params.submissionStatusTypeIdList = [1, 100, 200];
    }

    this.appManager.isRequestInProgress = true;

    let numResults = await this.poiManager.refreshPOIList(params);

    this.appManager.isRequestInProgress = false;
    this.initialResultsShown = true;

    if (numResults >= params.maxResults) {
      this.appManager.showToastNotification("A maximum of " + numResults + " results are returned per search. Zoom in for details.");
    }

  }

  viewPOIDetails(data: any, p: any, recenterMap: boolean = false) {

    this.logging.log('Viewing/fetching [' + this.poiViewMode + '] POI Details ' + data.poiId);

    if (p != null) {

      this.mapping.unfocusMap();

      this.modalController.create({ component: POIDetailsPage, componentProps: { item: p } })
        .then(m => {

          m.onDidDismiss().then(() => {
            // should focus map again..
            this.logging.log('Dismissing POI Details.');
            this.mapping.focusMap();
            this.searchOnDemand = true;
          });

          m.present();
        });

        if (recenterMap){
          this.mapping.updateMapCentrePos(p.AddressInfo.Latitude, p.AddressInfo.Longitude, true, this.defaultMapZoom);
        }
    } else {
      this.poiManager.getPOIById(data.poiId, true).then(poi => {

        this.logging.log('Got POI Details ' + poi.ID);

        if (this.poiViewMode === 'modal') {
          this.searchOnDemand = false; // suspend interactive searches while modal dialog active

          this.modalController.create({ component: POIDetailsPage, componentProps: { item: poi } })
            .then(m => {

              m.onDidDismiss().then(() => {
                // should focus map again..
                this.logging.log('Dismissing POI Details.');
                this.mapping.focusMap();
                this.searchOnDemand = true;
              });

              m.present();
            });

          this.mapping.unfocusMap();
          if (recenterMap){
            this.mapping.updateMapCentrePos(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude, true, this.defaultMapZoom);
          }
        }

        if (this.poiViewMode === 'side') {
          this.selectedPOI = poi;
        }

      }, (err) => {

        this.appManager.showToastNotification('POI Details not available');
      });
    }


  }

  closePOIDetails() {
    this.selectedPOI = null;
  }

  openRoutePlannerModal() {
    this.searchOnDemand = false;

    this.mapping.unfocusMap();

    this.modalController.create({ component: RoutePlannerPage })
      .then(m => {
        m.onDidDismiss().then((data) => {
          // should focus map again..
          this.logging.log('Dismissing Route Planner Details.');
          this.mapping.focusMap();
          this.searchOnDemand = true;
        });

        m.present();
      });
  }

  openSearchOptions() {

    this.searchOnDemand = false;
    this.mapping.unfocusMap();

    this.modalController.create({ component: SettingsPage })
      .then(m => {
        m.onDidDismiss().then((data) => {

          this.mapping.focusMap();
          this.searchOnDemand = true;
        });

        m.present();
      });
  }

  openSideView() {
    this.poiViewMode = 'side';
    this.mapping.updateMapSize();
  }

  closeSideView() {
    this.poiViewMode = 'modal';
    this.mapping.updateMapSize();
  }

  planRoute() {
    this.routePlanningMode = true;
  }

  search(ev) {
    // alert(ev);
    this.placeSearchMapPOI.getPlacesAutoComplete(ev, 'poiSearch');
  }

  useFallbackPosition() {
    // use a default location, or the last known search position if known
    let searchPos = this.defaultStartPos;

    if (this.appManager.searchSettings.LastSearchPosition != null) {
      searchPos = this.appManager.searchSettings.LastSearchPosition;
    }

    this.appManager.searchSettings.StartSearchPosition = searchPos;

    this.appManager.searchSettings.LastSearchPosition = null;

    this.searchOnDemand = true;

    this.mapping.updateMapCentrePos(searchPos.latitude, searchPos.longitude, true, this.defaultMapZoom);
  }

  _watchId = null;

  private async getPosition(options: PositionOptions = {}): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      this._watchId = Geolocation.watchPosition(options, (position, err) => {

        if (this._watchId) {
          Geolocation.clearWatch({ id: this._watchId });
        }

        if (err) {
          reject(err);
          return;
        }
        resolve(position);
      });
    });
  }

  async locateUser(): Promise<any> {

    // ensure we start with a real position even if user does not make a geolocation choice
    this.useFallbackPosition();

    try {

      this.logging.log('Attempting to locate user..');

      const position = await this.getPosition({ timeout: 10000 });

      if (!position) {
        throw "Failed to get user location.";
      }

      this.logging.log('Got user location.');

      this.appManager.searchSettings.StartSearchPosition = new GeoLatLng(position.coords.latitude, position.coords.longitude);

      this.searchOnDemand = true;

      this.mapping.updateMapCentrePos(position.coords.latitude, position.coords.longitude, true, this.defaultMapZoom);
      localStorage.setItem("_locationEnabled", "true");
      return true;

    } catch (err) {
      /// no geolocation
      this.logging.log('Failed to get user location. Searching using default or last position.' + err);
      this.appManager.showToastNotification('Your location could not be determined.');

      this.useFallbackPosition();
      return false;
    }
  }

  placeSelected(place: PlaceSearchResult) {

    this.searchKeyword = place.Address;
    this.logging.log('Got place details:' + place.Address);

    // give map back the input focus (mainly for native map)
    this.mapping.focusMap();

    if (place.Location != null) {
      this.mapping.updateMapCentrePos(place.Location.latitude, place.Location.longitude, true);
    } else if (place.ReferenceID != null && place.ReferenceID.startsWith("OCM-")) {
      // OCM ID
      let poiID = place.ReferenceID.replace("OCM-", "");
      this.events.publish('ocm:poi:selected', { poiId: poiID, poi: null });
    }

    this.debouncedRefreshMapResults();

  }
}
