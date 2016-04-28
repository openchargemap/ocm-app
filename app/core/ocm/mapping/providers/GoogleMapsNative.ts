/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

/// <reference path="../../../../lib/typings/collections/collections.d.ts" />
/// <reference path="../../../../lib/typings/cordova-plugin-googlemaps/cordova-plugin-googlemaps.d.ts" />

import {Observable} from 'rxjs/Observable';
import {Base, LogLevel} from '../../Base';
import {Utils} from '../../Utils';
import {MappingAPI, IMapProvider, MapOptions, Mapping, GeoLatLng, GeoPosition} from '../Mapping';
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
    private maxMarkers:number = 500;

    /** @constructor */
    constructor(private events: Events) {
        super();
        this.mapAPIType = MappingAPI.GOOGLE_NATIVE;
        this.mapReady = false;
        this.markerList = new collections.Dictionary<number, google.maps.Marker>();
        this.mapCanvasID = "map-view";
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
        return;
     
        var clearMarkersOnRefresh = false;
  
        this.map.setVisible(true);
        //map.clear();

        if (this.markerList != null && this.markerList.size() > this.maxMarkers) {
            //max markers on map, start new batch again 
            this.map.clear(() => { 
                this.renderPOIMarkers(clearMarkersOnRefresh, poiList);
            });
        } else {
             this.renderPOIMarkers(clearMarkersOnRefresh, poiList);
        }   
       
    }

    renderPOIMarkers(clearMarkersOnRefresh: boolean, poiList: Array<any>) {
        var map = this.map;
        var _providerContext = this;
        var bounds = new plugin.google.maps.LatLngBounds();
        var markersAdded = 0;

        //clear existing markers (if enabled)
        if (clearMarkersOnRefresh == true) {
            if (this.markerList != null) {
                for (var i = 0; i < this.markerList.size(); i++) {
                    if (this.markerList[i]) {
                        this.markerList[i].setMap(null);
                    }
                }
            }
            this.markerList = new collections.Dictionary<number, any>();
        }

        if (poiList != null) {
            //render poi markers
            var poiCount = poiList.length;
            for (var i = 0; i < poiList.length; i++) {
                if (poiList[i].AddressInfo != null) {
                    if (poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {
                        var poi = poiList[i];

                        var addMarker = true;
                        if (!clearMarkersOnRefresh && this.markerList != null) {
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

                            iconURL = "images/icons/map/set4_level" + poiLevel;
                            if (poi.UsageType != null && poi.UsageType.Title.indexOf("Private") > -1) {
                                iconURL += "_private";
                            }

                            iconURL += ".png";

                            var markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
                            if (poi.UsageType != null) markerTooltip += " " + poi.UsageType.Title;
                            if (poiLevel > 0) markerTooltip += " Level " + poiLevel;
                            if (poi.StatusType != null) markerTooltip += " " + poi.StatusType.Title;

                   
                            var markerPos = new plugin.google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude);

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
                            }, function (marker) {
                                //show full details when info window tapped
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function () {
                                    var markerTitle = marker.getTitle();
                                    var poiId = markerTitle.substr(4, markerTitle.indexOf(":") - 4);

                                    if (console) console.log("POI clicked:" + poiId);
                                    _providerContext.events.publish('ocm:poi:selected', { poi: null, poiId:poiId });

                                });
                            });

                            bounds.extend(markerPos);

                            this.markerList.setValue(poi.ID, newMarker);
                            markersAdded++;
                        }
                    }
                }
            }

            this.log(markersAdded + " new map markers added out of a total " + this.markerList.size());
        }

        var uiContext = this;
        //zoom to bounds of markers
        if (poiList != null && poiList.length > 0) {
             if (map.getCenter() == undefined) {
                    map.setCenter(bounds.getCenter());
            }
             map.getZoom((zoom) => { 
                    map.setZoom(zoom < 6 ? 6 : zoom);
             });
             
            /*if (!parentContext.appConfig.enableLiveMapQuerying) {
                this.log("Fitting to marker bounds:" + bounds);
                map.setCenter(bounds.getCenter());
                this.log("zoom before fit bounds:" + map.getZoom());

                map.fitBounds(bounds);

                //fix incorrect zoom level when fitBounds guesses a zooom level of 0 etc.
                var zoom = map.getZoom();
                map.setZoom(zoom < 6 ? 6 : zoom);
            } else {
               
            }*/
        }

        // this.log("Moving camera to map centre:" + this.mapOptions.mapCentre);

        //move camera insteaad of animating
        /*setTimeout(function () {
            map.moveCamera({
                'target': gmMapCentre,
                'tilt': 60,
                'zoom': 12,
                'bearing': 0
            });
        }, 500);*/

        this.refreshMapLayout();
}    
    refreshMapLayout() {
        if (this.map != null) {
            this.map.refreshLayout();
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
                        this.log(JSON.stringify(mapBounds));
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
}