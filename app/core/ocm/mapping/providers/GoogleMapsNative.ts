/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

/// <reference path="../../../../lib/typings/collections/collections.d.ts" />
/// <reference path="../../../../lib/typings/cordova-plugin-googlemaps/cordova-plugin-googlemaps.d.ts" />

import {Observable} from 'rxjs/Observable';
import {Base, LogLevel} from '../../Base';
import {Utils} from '../../Utils';
import {MappingAPI, IMapProvider, MapOptions, Mapping} from '../Mapping';
import {GeoLatLng, GeoPosition, GeoBounds} from '../../model/GeoPosition';
import {Events} from 'ionic-angular';

declare var plugin: any;

/**Map Provider for Google Maps Native API (Cordova Plugin)
 * @module Mapping
 */

export class GoogleMapsNative extends Base implements IMapProvider {
    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;
    mapCanvasID: string;

    private map: any;
    private markerList: collections.Dictionary<number, google.maps.Marker>;
    private maxMarkers: number = 200;
    private markerAllocCount: number = 0;
    /** @constructor */
    constructor(private events: Events) {
        super();
        this.mapAPIType = MappingAPI.GOOGLE_NATIVE;
        this.mapReady = false;
        this.mapCanvasID = "map-view";
        this.markerList = new collections.Dictionary<number, any>();
    }

    /**
    * Performs one-time init of map object for this map provider
    * @param mapcanvasID  dom element for map canvas
    * @param mapConfig  general map config/options
    * @param mapManipulationCallback  custom handler for map zoom/drag events
    */
    initMap(mapCanvasID, mapConfig: MapOptions, parentMapManager: Mapping) {
        this.log("GoogleMapsNative: initMap");
        this.mapCanvasID = mapCanvasID;

        var apiAvailable = true;
        if ((<any>window).plugin && plugin.google && plugin.google.maps) {
            apiAvailable = true;

            this.log("Native maps plugin is available.");

            if (this.map == null) {
                var mapCanvas = document.getElementById(mapCanvasID);
                this.map = plugin.google.maps.Map.getMap();
                //this.map.setDebuggable(true);
                var mapManagerContext = this;

                //setup map manipulation events
                this.map.addEventListener(plugin.google.maps.event.CAMERA_CHANGE, function () {
                    mapManagerContext.events.publish('ocm:mapping:dragend');
                    mapManagerContext.events.publish('ocm:mapping:zoom');
                });

                this.map.on(plugin.google.maps.event.MAP_READY, function () {
                    mapManagerContext.log("Native Mapping Ready.", LogLevel.INFO);

                    var mapOptions = {
                        mapType: plugin.google.maps.MapTypeId.ROADMAP,
                        controls: {
                            compass: true,
                            myLocationButton: true,
                            zoom: true
                        },
                        gestures: {
                            scroll: true,
                            tilt: true,
                            rotate: true,
                            zoom: true
                        }
                    };

                    mapManagerContext.map.setOptions(mapOptions);
                    mapManagerContext.map.setDiv(mapCanvas);
                    mapManagerContext.map.setVisible(true);
                    mapManagerContext.mapReady = true;
                    mapManagerContext.events.publish('ocm:mapping:ready');
                });
            }
        } else {
            this.log("No native maps plugin available.");
            this.mapReady = false;
        }
    }

    /**
    * Renders the given array of POIs as map markers
    * @param poiList  array of POI objects
    * @param parentContext  parent app context
    */
    showPOIListOnMap(poiList: Array<any>, parentContext: any) {

        var clearMarkersOnRefresh = false;

        this.map.setVisible(true);
        //map.clear();

        if (this.markerList != null && this.markerList.size() > this.maxMarkers) {
            //max markers on map, start new batch again 
            this.log("map:max markers. clearing map.");
            this.map.clear(() => {
                this.renderPOIMarkers(clearMarkersOnRefresh, poiList);
            });
        } else {
            this.renderPOIMarkers(clearMarkersOnRefresh, poiList);
        }

    }

    clearMarkers() {
        this.log("map:clearing markers");
        if (this.markerList != null) {
            for (var i = 0; i < this.markerList.size(); i++) {
                if (this.markerList[i] && this.markerList[i] != null) {
                    this.markerList[i].setMap(null);
                }
            }
        }
        this.markerList = new collections.Dictionary<number, any>();
    }

    renderPOIMarkers(clearMarkersOnRefresh: boolean, poiList: Array<any>) {
        var map = this.map;
        var _providerContext = this;
        var bounds = new plugin.google.maps.LatLngBounds();
        var markersAdded = 0;

        //clear existing markers (if enabled)
        if (clearMarkersOnRefresh == true || (this.markerList != null && this.markerList.values.length > this.maxMarkers)) {

            this.clearMarkers();
        }

        if (poiList != null) {
            //render poi markers
            var poiCount = poiList.length;
            for (var i = 0; i < poiList.length; i++) {
                if (poiList[i].AddressInfo != null) {
                    if (poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {
                        var poi = poiList[i];

                        var addMarker = true;
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

                            iconURL = "images/icons/map/level" + poiLevel;

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


                            var markerPos = new plugin.google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude);
                            //cache marker details
                            this.markerList.setValue(poi.ID, poi.ID);
                            this.markerAllocCount++;
                            var newMarker = map.addMarker({
                                'position': markerPos,
                                'title': markerTooltip,
                                'snippet': "View details",
                                'icon': {
                                    'url': 'www/' + iconURL,
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
                }
            }

            this.log(markersAdded + " new map markers added out of a total " + this.markerList.values.length + " [alloc:" + this.markerAllocCount + "]");
        }

        var uiContext = this;
        //zoom to bounds of markers

        this.refreshMapLayout();
    }
    refreshMapLayout() {
        if (this.map != null) {
            this.map.refreshLayout();
            this.log("refreshed map layout, focusing map");
            this.focusMap();
        }
    }

    setMapCenter(pos: GeoPosition) {
        if (this.mapReady) {
            this.map.setCenter(new plugin.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
    }

    getMapCenter(): Observable<GeoPosition> {

        //wrap getCameraPosition in an observable
        let obs = Observable.create(observer => {
            this.map.getCameraPosition((cameraPos) => {
                let geoPos = new GeoPosition(cameraPos.target.latitude, cameraPos.target.longitude);
                observer.next(geoPos);
                observer.complete();
            });
        });

        return obs;
    }

    setMapZoom(zoomLevel: number) {
        this.map.setZoom(zoomLevel);
    }


    getMapZoom(): Observable<number> {

        //wrap getzoom in an observable
        let obs = Observable.create(observer => {

            this.map.getZoom((zoom) => {
                observer.next(zoom);
                observer.complete();
            });

        });
        return obs;
    }

    setMapType(mapType: string) {
        try {
            this.map.setMapTypeId(eval("google.maps.MapTypeId." + mapType));
        } catch (exception) {
            this.log("Failed to set map type:" + mapType + " : " + exception.toString());
        }
    }

    getMapBounds(): Observable<Array<GeoLatLng>> {

        let obs = Observable.create((observer) => {



            this.map.getVisibleRegion(
                mapBounds => {
                    if (mapBounds != null) {
                        var bounds = new Array<GeoLatLng>();
                        //this.log(JSON.stringify(mapBounds));
                        bounds.push(new GeoLatLng(mapBounds.northeast.lat, mapBounds.northeast.lng));
                        bounds.push(new GeoLatLng(mapBounds.southwest.lat, mapBounds.southwest.lng));

                        observer.next(bounds);
                        observer.complete();
                    } else {
                        this.log("google maps native: failed to get map bounds");
                        observer.error();
                    }
                });
        });
        return obs;
    }

      moveToMapBounds(bounds: GeoBounds) {
        this.map.fitBounds(
            new google.maps.LatLngBounds(
                new google.maps.LatLng(bounds.southWest.latitude, bounds.southWest.longitude),
                new google.maps.LatLng(bounds.northEast.latitude, bounds.northEast.longitude))
                );
    }

    renderMap(poiList: Array<any>, mapHeight: number, parentContext: any): boolean {

        if (!this.mapReady) {
            this.log("renderMap: skipping render, map not ready yet");
        }

        if (this.map == null) this.log("Native map not initialised");
        if (this.mapCanvasID == null) this.log("mapcanvasid not set!!");

        //document.getElementById(this.mapCanvasID).style.height = mapHeight + "px";

        this.showPOIListOnMap(poiList, parentContext);
        /*
        plugin.google.maps.Map.isAvailable((isAvailable, message)=> {
            if (isAvailable) {
                //setup map view if not already initialised
         

               
            } else {
                this.log("Native Maps not available");
            }
            
        });
*/
        return true;
    }
    renderPolyline(polyline: string) {
        //
    }
    unfocusMap() {
        this.map.setClickable(false);
    }
    focusMap() {
        this.map.setClickable(true);
    }
}