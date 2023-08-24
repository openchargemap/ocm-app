
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Utils } from '../../../core/Utils';
import { MappingAPI, IMapProvider, MapOptions, IMapManager } from '../interfaces/mapping';
import { Events } from '../../../services/Events';
import { GeoPosition, GeoLatLng, GeoBounds } from './../../../model/GeoPosition';
import { Logging, LogLevel } from './../../Logging';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerCluster,
    MarkerOptions,
    Marker,
    BaseArrayClass,
    GoogleMapsMapTypeId,
    Environment,
    LatLngBounds
} from '@ionic-native/google-maps/ngx';
import { environment } from '../../../../environments/environment';
import { MapIcons } from '../Icons';
import { PlaceSearchResult } from '../../../model/AppModels';
import { Observable } from 'rxjs';

/**Map Provider for Google Maps Native API (Cordova Plugin)
 * @module Mapping
 */

export class GoogleMapsNative implements IMapProvider {
    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;
    mapCanvasID: string;

    private map: GoogleMap;
    private markerList: Map<number, Marker>;
    private maxMarkers: number = 200;
    private markerAllocCount: number = 0;
    private polylinePath: any;

    /** @constructor */
    constructor(private events: Events, private logging: Logging) {

        this.mapAPIType = MappingAPI.GOOGLE_NATIVE;
        this.mapReady = false;
        this.mapCanvasID = "map-view";
        this.markerList = new Map<number, Marker>();
    }

    initAPI() {

    }

    disposeMap() {

    }

    /**
    * Performs one-time init of map object for this map provider
    * @param mapcanvasID  dom element for map canvas
    * @param mapConfig  general map config/options
    * @param mapManipulationCallback  custom handler for map zoom/drag events
    */
    initMap(mapCanvasID, mapConfig: MapOptions, parentMapManager: IMapManager) {

        this.logging.log("GoogleMapsNative: initMap");
        this.mapCanvasID = mapCanvasID;

        let apiAvailable = true;
        if (GoogleMaps) {
            apiAvailable = true;

            this.logging.log("Native maps plugin is available.");

            if (this.map == null) {


                let key = environment.googleMapsKey;
                Environment.setEnv({
                    'API_KEY_FOR_BROWSER_RELEASE': key,
                    'API_KEY_FOR_BROWSER_DEBUG': key
                });

                this.map = GoogleMaps.create(mapCanvasID, {
                    mapType: GoogleMapsMapTypeId.ROADMAP,
                    controls: {
                        compass: true,
                        myLocationButton: false,
                        zoom: true
                    },
                    gestures: {
                        scroll: true,
                        tilt: true,
                        rotate: true,
                        zoom: true
                    },
                    camera: {
                        /* 'target': {
                             "lat": 37.415328,
                             "lng": -122.076575
                         },*/
                        'zoom': 10
                    }
                }
                );

                this.map.one(GoogleMapsEvent.MAP_READY).then(() => {


                    //   this.map.on(plugin.google.maps.event.MAP_READY).subscribe(() => {
                    this.logging.log("Native Mapping Ready.", LogLevel.INFO);


                    this.map.setVisible(true);
                    this.mapReady = true;
                    this.events.publish('ocm:mapping:ready');
                    this.setMapCenter(new GeoPosition(37.415328, -122.076575)); // native maps needs a map centre before anything is displayed

                    // setup map manipulation events
                    this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(() => {
                        this.events.publish('ocm:mapping:dragend');
                        this.events.publish('ocm:mapping:zoom');
                    });
                });

                // });
            } else {
                this.logging.log("Map object is not null at init..");
            }
        } else {
            this.logging.log("No native maps plugin available.");
            this.mapReady = false;
        }
    }

    /**
    * Renders the given array of POIs as map markers
    * @param poiList  array of POI objects
    * @param parentContext  parent app context
    */
    showPOIListOnMap(poiList: Array<any>, parentContext: any) {

        let clearMarkersOnRefresh = false;

        this.map.setVisible(true);

        /*if (this.markerList != null && this.markerList.size() > this.maxMarkers) {
            //max markers on map, start new batch again
            this.logging.log("map:max markers. clearing map.");
            this.map.clear();
        }*/
        this.renderPOIMarkers(clearMarkersOnRefresh, poiList);
    }

    clearMarkers() {

        if (this.markerList != null) {
            this.markerList.forEach((value: any, key: number) => {
                value.remove();
            });
        }

        this.markerList = new Map<number, Marker>();
    }

    renderPOIMarkers(clearMarkersOnRefresh: boolean, poiList: Array<any>) {
        let map = this.map;
        let _providerContext = this;
        let bounds = new LatLngBounds();
        let markersAdded = 0;

        // clear existing markers (if enabled)
        if (clearMarkersOnRefresh == true) {

            this.clearMarkers();
        }

        let markersToAdd = [];

        if (poiList != null) {
            // render poi markers
            let poiCount = poiList.length;
            for (let i = 0; i < poiList.length; i++) {
                let item = poiList[i];
                if (item.AddressInfo != null && item.AddressInfo.Latitude != null && item.AddressInfo.Longitude != null) {
                    if (!this.markerList.has(item.ID)) {
                        markersToAdd.push(item);
                    }
                }
            }
            /*  if (poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {
                  let poi = poiList[i];

                  let addMarker = true;
                  if (this.markerList != null) {
                      //find if this poi already exists in the marker list
                      if (this.markerList.containsKey(poi.ID)) {
                          addMarker = false;
                      }
                  }

                  if (addMarker) {
                      var poiLevel = Utils.getMaxLevelOfPOI(poi);

                      var iconURL = null;
                      var animation = null;
                      var shadow = null;
                      var markerImg = null;

                      iconURL = window.location.href.replace(/\/([^\/]+)$/, "") + "assets/images/icons/map/level" + poiLevel;

                      if (poi.UsageType != null && poi.UsageType.Title.indexOf("Private") > -1) {
                          iconURL += "_private";
                      } else if (poi.StatusType != null && poi.StatusType.IsOperational != true) {
                          iconURL += "_nonoperational";
                      } else {
                          iconURL += "_operational";
                      }

                      iconURL += "_icon.png";

                      var markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
                      if (poi.UsageType != null) markerTooltip += " " + poi.UsageType.Title;
                      if (poiLevel > 0) markerTooltip += " Level " + poiLevel;
                      if (poi.StatusType != null) markerTooltip += " " + poi.StatusType.Title;

                      //cache marker details
                      this.markerList.setValue(poi.ID, poi.ID);
                      this.markerAllocCount++;
                      markersAdded++;
                      var newMarker = map.addMarker({
                          'position': { lat: poi.AddressInfo.Latitude, lng: poi.AddressInfo.Longitude },
                          'title': markerTooltip,
                          'snippet': "View details",
                          'iconData': {
                              'url': iconURL,
                              'size': {
                                  'width': 30,
                                  'height': 50
                              }
                          }
                      }, (marker) => {
                          //show full details when info window tapped
                          //marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function () {
                          marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
                              var markerTitle = marker.getTitle();
                              var poiId = markerTitle.substr(4, markerTitle.indexOf(":") - 4);

                              if (console) console.log("POI clicked:" + poiId);
                              _providerContext.events.publish('ocm:poi:selected', { poi: null, poiId: poiId });

                          });


                      });

                      //bounds.extend(markerPos);

                  }
              }
              */

            let useClustering = false;


            if (markersToAdd.length > 0) {

                if (useClustering) {
                    let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
                        markers: markersToAdd,
                        icons: [
                            {
                                min: 3,
                                max: 9,
                                url: "./assets/markercluster/small.png",
                                label: {
                                    color: "white"
                                }
                            },
                            {
                                min: 10,
                                url: "./assets/markercluster/large.png",
                                label: {
                                    color: "white"
                                }
                            }
                        ]
                    });

                } else {
                    let baseArray: BaseArrayClass<any> = new BaseArrayClass<any>(markersToAdd);

                    baseArray.mapAsync((poi: any, callback: (marker: Marker) => void) => {

                        let poiLevel = Utils.getMaxLevelOfPOI(poi);


                        /*  var iconURL = null;

                          iconURL = window.location.href.replace(/\/([^\/]+)$/, "") + "/assets/images/icons/map/level" + poiLevel;
                         // iconURL = iconURL.replace("ionic://localhost", "");

                          if (poi.UsageType != null && poi.UsageType.Title.indexOf("Private") > -1) {
                              iconURL += "_private";
                          } else if (poi.StatusType != null && poi.StatusType.IsOperational != true) {
                              iconURL += "_nonoperational";
                          } else {
                              iconURL += "_operational";
                          }

                          iconURL += "_icon.png";
                          */

                        let iconName = MapIcons.getIconName(poi, poiLevel, false);

                        let markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
                        if (poi.UsageType != null) { markerTooltip += " " + poi.UsageType.Title; }
                        if (poiLevel > 0) { markerTooltip += " Level " + poiLevel; }
                        if (poi.StatusType != null) { markerTooltip += " " + poi.StatusType.Title; }

                        let opt = {
                            position: { lat: poi.AddressInfo.Latitude, lng: poi.AddressInfo.Longitude },
                            title: poi.Title,
                            icon: {
                                url: MapIcons.getIcon(iconName),
                                size: {
                                    width: 34,
                                    height: 50
                                }
                            }
                        };

                        map.addMarker(opt).then((m => {

                            this.markerList.set(poi.ID, m);

                            m.poi = poi;
                            m.on(GoogleMapsEvent.MARKER_CLICK).subscribe((poiClicked) => {
                                this.events.publish('ocm:poi:selected', { poi: poiClicked[1].poi, poiId: poiClicked[1].poi.ID });
                            });

                        }));

                    }).then((markers: Marker[]) => {
                        //  console.log(markers);

                        markersAdded = markers.length;

                        this.logging.log(markersAdded + " new map markers added out of a total " + this.markerList.values.length + " [alloc:" + this.markerAllocCount + "]");
                    });

                }

            }
        }


        this.refreshMapLayout();
    }

    refreshMapLayout() {
        /* if (this.map != null) {
              this.map.trigger(GoogleMapsEvent.);
              this.logging.log("refreshed map layout, focusing map");
              this.focusMap();
          }*/
    }

    setMapCenter(pos: GeoPosition, zoomLevel?: number) {
        if (this.mapReady) {

            let mapOptions: any = {
                target: { lat: pos.coords.latitude, lng: pos.coords.longitude }
            };

            if (zoomLevel) {
                mapOptions.zoom = zoomLevel;
            }

            this.map.moveCamera(mapOptions);
        }
    }

    getMapCenter(): Observable<GeoPosition> {

        // wrap getCameraPosition in an observable
        let obs = new Observable<GeoPosition>((observer => {
            let result = this.map.getCameraPosition();
            if (result) {
                const geoPos = new GeoPosition(result.target.lat, result.target.lng);
                observer.next(geoPos);
                observer.complete();
            } else {
                // failed to get camera position
            }

        }));

        return obs;
    }

    setMapZoom(zoomLevel: number) {
        this.map.setCameraZoom(zoomLevel);
    }


    getMapZoom(): Observable<number> {

        // wrap get zoom in an observable
        let obs = new Observable<number>(observer => {
            let zoom = this.map.getCameraZoom();
            observer.next(zoom);
            observer.complete();
        });
        return obs;
    }

    setMapType(mapType: string) {
        try {
            this.map.setMapTypeId("google.maps.MapTypeId." + mapType);
        } catch (exception) {
            this.logging.log("Failed to set map type:" + mapType + " : " + exception.toString());
        }
    }

    getMapBounds(): Observable<Array<GeoLatLng>> {

        let obs = new Observable<Array<GeoLatLng>>((observer) => {

            let mapBounds = this.map.getVisibleRegion();

            if (mapBounds != null) {
                let bounds = new Array<GeoLatLng>();
                // this.logging.log(JSON.stringify(mapBounds));

                bounds.push(new GeoLatLng(mapBounds.southwest.lat, mapBounds.southwest.lng));
                bounds.push(new GeoLatLng(mapBounds.northeast.lat, mapBounds.northeast.lng));

                observer.next(bounds);
                observer.complete();
            } else {
                this.logging.log("google maps native: failed to get map bounds");
                observer.error();
            }

        });
        return obs;
    }

    moveToMapBounds(bounds: GeoBounds) {
        // alert("move to map bounds not implemented");
        /*this.map.fitBounds(
            new google.maps.LatLngBounds(
                new google.maps.LatLng(bounds.southWest.latitude, bounds.southWest.longitude),
                new google.maps.LatLng(bounds.northEast.latitude, bounds.northEast.longitude))
        );*/
    }

    renderMap(poiList: Array<any>, mapHeight: number, parentContext: any): boolean {

        if (!this.mapReady) {
            this.logging.log("renderMap: skipping render, map not ready yet");
        }

        if (this.map == null) { this.logging.log("Native map not initialised"); }
        if (this.mapCanvasID == null) { this.logging.log("mapcanvasid not set!!"); }

        this.showPOIListOnMap(poiList, parentContext);

        return true;
    }

    renderPolyline(polyline: string) {
        this.clearPolyline();
        // TODO: add polyline
        this.map.addPolyline({
            points: <any>google.maps.geometry.encoding.decodePath(polyline),
            'color': '#AA00FF',
            'width': 10,
            'geodesic': true
        });
    }

    clearPolyline() {
        if (this.polylinePath != null) {
            this.polylinePath.setMap(null);
        }
    }

    unfocusMap() {
        this.map.setClickable(false);
    }

    focusMap() {
        if (this.mapReady) {
            this.map.setClickable(true);
        } else {
            this.logging.log("focus: map not ready..");
        }

    }

    placeSearch(keyword: string): Promise<Array<PlaceSearchResult>> {
        // not implemented
        return null;
    }

    addPOILayer(data: any[]) {
        this.logging.log("Add POI Layer not implemented in this provider.");
    }
}
