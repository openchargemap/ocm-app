
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Utils } from '../../../core/Utils';
import { MappingAPI, IMapProvider, MapOptions, IMapManager } from '../interfaces/mapping';
import { Events } from '../../../services/Events';
import { Observable } from 'rxjs';
import { GeoPosition, GeoLatLng, GeoBounds } from './../../../model/GeoPosition';
import { Logging, LogLevel } from './../../Logging';
import { PlaceSearchResult } from '../../../model/AppModels';

/**Map Provider for Google Maps Web API
* @module MapProviders
*/
export class GoogleMapsWeb implements IMapProvider {
    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;
    mapCanvasID: string;

    private map: google.maps.Map;
    private markerList: Map<number, google.maps.Marker>;

    private polylinePath: google.maps.Polyline;

    /** @constructor */
    constructor(private events: Events, private logging: Logging) {
        this.events = events;
        this.mapAPIType = MappingAPI.GOOGLE_WEB;
        this.mapReady = false;
        this.markerList = new Map<number, google.maps.Marker>();
    }


    initAPI() {

    }

    disposeMap() {

    }

    /**
    * Performs one-time init of map object for this map provider
    * @param mapcanvasID  dom element for map canvas
    * @param mapConfig  general map config/options

    */
    initMap(mapCanvasID, mapConfig: MapOptions, parentMapManager: IMapManager) {
        this.mapCanvasID = mapCanvasID;

        let apiLoaded = true;
        if (typeof google === 'undefined') {
            apiLoaded = false;
        } else if (typeof google.maps === 'undefined') {
            apiLoaded = false;
        }

        if (apiLoaded) {
            if (this.map == null) {
                let mapCanvas = document.getElementById(mapCanvasID);

                if (mapCanvas != null) {
                    (<any>google.maps).visualRefresh = true;

                    mapCanvas.style.width = '100%';
                    mapCanvas.style.height = Utils.getClientHeight().toString();
                    this.logging.log("Defaulted map height to " + Utils.getClientHeight());
                    // create map
                    let mapOptions = {
                        zoom: 10,
                        minZoom: mapConfig.minZoomLevel,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DEFAULT,
                            position: google.maps.ControlPosition.BOTTOM_LEFT,
                            mapTypeIds: ['roadmap', 'terrain', 'satellite']
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            //style: google.maps.ControlPosition.ZoomControlStyle.DEFAULT,
                            position: google.maps.ControlPosition.BOTTOM_LEFT
                        },

                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.BOTTOM_LEFT
                        }
                    };

                    this.map = new google.maps.Map(mapCanvas, mapOptions);

                    // TODO: events for map manipulation to perform search
                    let mapProviderContext = this;
                    google.maps.event.addListener(this.map, 'dragend', function () {
                        mapProviderContext.events.publish('ocm:mapping:dragend');
                    });

                    google.maps.event.addListener(this.map, 'zoom_changed', function () {
                        mapProviderContext.events.publish('ocm:mapping:zoom');
                    });

                    google.maps.event.addListenerOnce(this.map, 'idle', function () {
                        mapProviderContext.events.publish('ocm:mapping:ready');
                    });

                    this.mapReady = true;

                    // this.events.publish('ocm:mapping:ready');
                }
            }
        } else {
            this.logging.log("Call to initMap before API is ready:" + MappingAPI[this.mapAPIType], LogLevel.ERROR);

            this.mapReady = false;
            return false;
        }
    }

    clearMarkers() {
        if (this.markerList != null) {
            this.markerList.forEach((value: any, key: number) => {
                value.remove();
            });
        }

        this.markerList = new Map<number, google.maps.Marker>();
    }

    /**
    * Renders the given array of POIs as map markers
    * @param poiList  array of POI objects
    * @param parentContext  parent app context
    */
    showPOIListOnMap(poiList: Array<any>, parentContext: any) {
        let clearMarkersOnRefresh: boolean = false;
        let map = this.map;
        let bounds = new google.maps.LatLngBounds();
        let markersAdded = 0;
        let mapProviderContext = this;

        // clear existing markers (if enabled)
        if (clearMarkersOnRefresh) {
            this.clearMarkers();
        }
        let mapzoom = map.getZoom();
        if (poiList != null) {
            // render poi markers
            let poiCount = poiList.length;
            for (let i = 0; i < poiList.length; i++) {
                if (poiList[i].AddressInfo != null) {
                    if (poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {
                        let poi = poiList[i];

                        let addMarker = true;
                        if (!clearMarkersOnRefresh && this.markerList != null) {
                            // find if this poi already exists in the marker list
                            if (this.markerList.has(poi.ID)) {
                                addMarker = false;

                                // set marker scale based on zoom?
                                // var m = this.markerList.getValue(poi.ID);
                                // if (m.set())
                            }
                        }

                        if (addMarker) {


                            let iconURL = null;
                            let animation = null;
                            let shadow = null;
                            let markerImg = null;


                            iconURL = Utils.getIconForPOI(poi);

                            markerImg = {
                                url: iconURL,
                                size: new google.maps.Size(68, 100.0),

                                anchor: new google.maps.Point(15, 45),
                                scaledSize: new google.maps.Size(34, 50)

                            };

                            let markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
                            if (poi.UsageType != null) { markerTooltip += " " + poi.UsageType.Title; }

                            if (poi.StatusType != null) { markerTooltip += " " + poi.StatusType.Title; }

                            let newMarker = <any>new google.maps.Marker({
                                position: new google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude),
                                map: map,
                                icon: markerImg != null ? markerImg : iconURL,
                                title: markerTooltip
                            });

                            newMarker.poi = poi;

                            google.maps.event.addListener(newMarker, 'click', function () {
                                // broadcast details of selected POI
                                if (console) { console.log("POI clicked:" + this.poi.ID); }

                                mapProviderContext.events.publish('ocm:poi:selected', { poi: this.poi, poiId: this.poi.ID });

                            });

                            bounds.extend(newMarker.getPosition());

                            this.markerList.set(poi.ID, newMarker);
                            markersAdded++;
                        }
                    }
                }
            }

            this.logging.log(markersAdded + " new map markers added out of a total " + this.markerList.size);
        }

        let uiContext = this;
        // zoom to bounds of markers
        if (poiList != null && poiList.length > 0) {
            if (parentContext != null && !parentContext.appConfig.enableLiveMapQuerying) {
                this.logging.log("Fitting to marker bounds:" + bounds);
                map.setCenter(bounds.getCenter());
                this.logging.log("zoom before fit bounds:" + map.getZoom());

                map.fitBounds(bounds);

                // fix incorrect zoom level when fitBounds guesses a zooom level of 0 etc.
                let zoom = map.getZoom();
                map.setZoom(zoom < 6 ? 6 : zoom);
            } else {
                if (map.getCenter() == undefined) {
                    map.setCenter(bounds.getCenter());
                }
            }
        }

        // this.refreshMapLayout();
    }

    refreshMapLayout() {
        if (this.map != null) {

            setTimeout(() => {
                this.logging.log("GoogleMapsWeb: refreshMapLayout", LogLevel.VERBOSE);
                google.maps.event.trigger(this.map, 'resize');
            }, 200);

        }
    }

    setMapCenter(pos: GeoPosition) {
        if (this.mapReady) {
            this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
    }

    getMapCenter(): Observable<GeoPosition> {

        // wrap getCenter in an observable
        let obs = new Observable<GeoPosition>(observer => {
            if (this.map != null) {
                let pos = this.map.getCenter();
                if (pos != null) {
                    observer.next(new GeoPosition(pos.lat(), pos.lng()));
                    observer.complete();
                }
            }
        });

        return obs;
    }

    setMapZoom(zoomLevel: number) {
        this.map.setZoom(zoomLevel);
    }

    getMapZoom(): Observable<number> {

        // wrap getzoom in an observable
        let obs = new Observable<number>(observer => {

            let zoom = this.map.getZoom();
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
        // wrap getzoom in an observable
        let obs = new Observable<Array<GeoLatLng>>(observer => {

            let bounds = new Array<GeoLatLng>();

            let mapBounds = this.map.getBounds();
            bounds.push(new GeoLatLng(mapBounds.getNorthEast().lat(), mapBounds.getNorthEast().lng()));
            bounds.push(new GeoLatLng(mapBounds.getSouthWest().lat(), mapBounds.getSouthWest().lng()));


            observer.next(bounds);
            observer.complete();
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
        document.getElementById(this.mapCanvasID).style.height = mapHeight + "px";

        if (typeof (google) == "undefined") {
            // no google maps currently available
            this.providerError = "Google maps cannot be loaded. Please check your data connection.";
            return false;
        }

        // finish init of map view if not already initialised (could previously be called before api ready)
        // this.initMap(this.mapCanvasID, parentContext.mappingManager.mapOptions, this.mapManipulationCallback);

        if (this.mapReady) {
            this.showPOIListOnMap(poiList, parentContext);
        }

        return true;
    }
    renderPolyline(polyline: string) {
        this.clearPolyline();

        this.polylinePath = new google.maps.Polyline({
            path: <any>google.maps.geometry.encoding.decodePath(polyline),
            geodesic: true,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 4
        });

        this.polylinePath.setMap(this.map);

    }

    clearPolyline() {
        if (this.polylinePath != null) {
            this.polylinePath.setMap(null);
        }
    }

    focusMap() {
        //
    }

    unfocusMap() {
        //
    }

    placeSearch(keyword: string): Promise<Array<PlaceSearchResult>> {
        // not implemented
        return null;
    }

    addPOILayer(data: any[]) {
        this.logging.log("Add POI Layer not implemented in this provider.");
    }
}
