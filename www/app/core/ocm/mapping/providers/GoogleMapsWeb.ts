/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/


/// <reference path="../../../../lib/typings/googlemaps/google.maps.d.ts" />

import {Base, LogLevel} from '../../Base';
import {Utils} from '../../Utils';
import {MappingAPI, IMapProvider, MapOptions, Mapping, GeoLatLng, GeoPosition} from '../Mapping';

import {Events} from 'ionic-framework/ionic';

/**Map Provider for Google Maps Web API
* @module MapProviders
*/
export class GoogleMapsWeb extends Base implements IMapProvider {
    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;
    mapCanvasID: string;

    private map: any;
    private markerList: collections.Dictionary<number, google.maps.Marker>;
    private mapManipulationCallback: any;

    private events: Events;

    /** @constructor */
    constructor(events: Events) {
        super();
        this.events = events;
        this.mapAPIType = MappingAPI.GOOGLE_WEB;
        this.mapReady = false;
        this.markerList = new collections.Dictionary<number, google.maps.Marker>();
    }

    /**
    * Performs one-time init of map object for this map provider
    * @param mapcanvasID  dom element for map canvas
    * @param mapConfig  general map config/options
    
    */
    initMap(mapCanvasID, mapConfig: MapOptions, parentMapManager: Mapping) {
        this.mapCanvasID = mapCanvasID;


        var apiLoaded = true;
        if (typeof google === 'undefined') {
            apiLoaded = false;
        } else if (typeof google.maps === 'undefined') {
            apiLoaded = false;
        }

        if (apiLoaded) {
            if (this.map == null) {
                var mapCanvas = document.getElementById(mapCanvasID);

                if (mapCanvas != null) {
                    (<any>google.maps).visualRefresh = true;

                    mapCanvas.style.width = '99.5%';
                    mapCanvas.style.height = Utils.getClientHeight().toString();

                    //create map
                    var mapOptions = {
                        zoom: 10,
                        minZoom: mapConfig.minZoomLevel,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DEFAULT,
                            position: google.maps.ControlPosition.BOTTOM_RIGHT
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.DEFAULT,
                            position: google.maps.ControlPosition.BOTTOM_RIGHT
                        },

                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.BOTTOM_RIGHT
                        }
                    };

                    this.map = new google.maps.Map(mapCanvas, mapOptions);

                    //TODO: events for map manipulation to perform search
                    var mapProviderContext = this;
                    google.maps.event.addListener(this.map, 'dragend', function() {
                        mapProviderContext.events.publish('ocm:mapping:dragend');
                    });
                    
                    google.maps.event.addListener(this.map, 'zoom_changed', function() { 
                        mapProviderContext.events.publish('ocm:mapping:zoom');
                    });

                    this.mapReady = true;
                    
                    this.events.publish('ocm:mapping:ready');
                }
            }
        }
        else {
            this.log("Call to initMap before API is ready:" + MappingAPI[this.mapAPIType], LogLevel.ERROR);

            this.mapReady = false;
            return false;
        }
    }

    /**
    * Renders the given array of POIs as map markers
    * @param poiList  array of POI objects
    * @param parentContext  parent app context
    */
    showPOIListOnMap(poiList: Array<any>, parentContext: any) {
        var clearMarkersOnRefresh = false;
        var map = this.map;
        var bounds = new google.maps.LatLngBounds();
        var markersAdded = 0;
        var mapProviderContext = this;

        //clear existing markers (if enabled)
        if (clearMarkersOnRefresh == true) {
            if (this.markerList != null) {
                for (var i = 0; i < this.markerList.size(); i++) {
                    if (this.markerList[i]) {
                        this.markerList[i].setMap(null);
                    }
                }
            }
            this.markerList = new collections.Dictionary<number, google.maps.Marker>();
        }
        var mapzoom = map.getZoom();
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
                                
                                //set marker scale based on zoom?
                                //var m = this.markerList.getValue(poi.ID);
                                //if (m.set())
                            }
                        }

                        if (addMarker) {
                            var poiLevel = Utils.getMaxLevelOfPOI(poi);

                            var iconURL = null;
                            var animation = null;
                            var shadow = null;
                            var markerImg = null;

                            iconURL = "app/images/icons/map/set4_level" + poiLevel;
                            if (poi.UsageType != null && poi.UsageType.Title.indexOf("Private") > -1) {
                                iconURL += "_private";
                            }

                            iconURL += ".png";

                            markerImg = new google.maps.MarkerImage(
                                iconURL,
                                new google.maps.Size(68, 100.0),
                                null,
                                new google.maps.Point(15, 45),
                                new google.maps.Size(34, 50)
                                //new google.maps.Size(17, 25)
                            );

                            var markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
                            if (poi.UsageType != null) markerTooltip += " " + poi.UsageType.Title;
                            if (poiLevel > 0) markerTooltip += " Level " + poiLevel;
                            if (poi.StatusType != null) markerTooltip += " " + poi.StatusType.Title;

                            var newMarker = <any>new google.maps.Marker({
                                position: new google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude),
                                map: map,
                                icon: markerImg != null ? markerImg : iconURL,
                                title: markerTooltip
                            });

                            newMarker.poi = poi;

                            var anchorElement = document.getElementById("body");
                            google.maps.event.addListener(newMarker, 'click', function() {
                                //broadcast details of selected POI
                                mapProviderContext.events.publish('ocm:poi:selected', poi);

                            });

                            bounds.extend(newMarker.getPosition());

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
            if (parentContext != null && !parentContext.appConfig.enableLiveMapQuerying) {
                this.log("Fitting to marker bounds:" + bounds);
                map.setCenter(bounds.getCenter());
                this.log("zoom before fit bounds:" + map.getZoom());

                map.fitBounds(bounds);

                //fix incorrect zoom level when fitBounds guesses a zooom level of 0 etc.
                var zoom = map.getZoom();
                map.setZoom(zoom < 6 ? 6 : zoom);
            } else {
                if (map.getCenter() == undefined) {
                    map.setCenter(bounds.getCenter());
                }
            }
        }

        this.refreshMapLayout();
    }

    refreshMapLayout() {
        if (this.map != null) {
            google.maps.event.trigger(this.map, 'resize');
        }
    }

    setMapCenter(pos: GeoPosition) {
        if (this.mapReady) {
            this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
    };

    getMapCenter(): GeoPosition {
        var pos = this.map.getCenter();
        return new GeoPosition(pos.lat(), pos.lng());
    }

    setMapZoom(zoomLevel: number) {
        this.map.setZoom(zoomLevel);
    }

    getMapZoom(): number {
        return this.map.getZoom();
    }

    setMapType(mapType: string) {
        try {
            this.map.setMapTypeId(eval("google.maps.MapTypeId." + mapType));
        } catch (exception) {
            this.log("Failed to set map type:" + mapType + " : " + exception.toString());
        }
    }

    getMapBounds(): Array<GeoLatLng> {
        var bounds = new Array<GeoLatLng>();

        var mapBounds = this.map.getBounds();
        bounds.push(new GeoLatLng(mapBounds.getNorthEast().lat(), mapBounds.getNorthEast().lng()));
        bounds.push(new GeoLatLng(mapBounds.getSouthWest().lat(), mapBounds.getSouthWest().lng()));

        return bounds;
    }

    renderMap(poiList: Array<any>, mapHeight: number, parentContext: any): boolean {
        document.getElementById(this.mapCanvasID).style.height = mapHeight + "px";

        if (typeof (google) == "undefined") {
            //no google maps currently available
            this.providerError = "Google maps cannot be loaded. Please check your data connection.";
            return false;
        }

        //finish init of map view if not already initialised (could previously be called before api ready)
        //this.initMap(this.mapCanvasID, parentContext.mappingManager.mapOptions, this.mapManipulationCallback);

        if (this.mapReady) {
            this.showPOIListOnMap(poiList, parentContext);
        }

        return true;
    }
}