import { MapBoxMapProvider } from './providers/MapBox';
import { IMapManager, MapOptions, IMapProvider, MappingAPI, MapType } from './interfaces/mapping';
import { Utils } from './../../core/Utils';
import { Logging, LogLevel } from './../Logging';

/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { GoogleMapsNative } from './providers/GoogleMapsNative';
// import { GoogleMapsWeb } from './providers/GoogleMapsWeb';
// import { LeafletMap } from './providers/LeafletMap';
import { MapKitMapProvider } from './providers/MapKit';
import { GeoLatLng, GeoPosition, GeoBounds } from '../../model/GeoPosition';

import { HttpClient } from '@angular/common/http';
import { MapTilerMapProvider } from './providers/MapTiler';
import { Events } from '../../services/Events';

/** Mapping - provides a way to render to various mapping APIs
 * @module Mapping
 */
@Injectable({
    providedIn: 'root',
})
export class Mapping implements IMapManager {

    public map: any;
    public mapCentreMarker: any;
    public mapsInitialised: boolean; // initial map setup initiated
    public mapAPIReady: boolean; // api loaded
    public mapOptions: MapOptions;
    public searchMarker: any;
    public errorMessage: string;
    public parentAppContext: any;
    private mapProvider: IMapProvider;
    private debouncedMapPositionUpdate: any;

    private events: Events;

    private isFocused: boolean = false;
    /** @constructor */
    constructor(events: Events, private logging: Logging, private http: HttpClient) {

        this.events = events;
        this.mapOptions = new MapOptions();

        this.mapAPIReady = false;
        this.mapsInitialised = false;

        this.setMapAPI(this.mapOptions.mapAPI);

        let mapManagerContext = this;
        this.debouncedMapPositionUpdate = Utils.debounce(() => {
            this.logging.log("signaling map position change:");
            if (mapManagerContext.mapProvider.mapReady) {

                // create new latlng from map centre so that values get normalised to 180/-180

                mapManagerContext.getMapCenter().subscribe((centerPos: GeoPosition) => {
                    if (centerPos != null) {
                        this.logging.log("Map centre/zoom changed, updating search position:" + centerPos);
                        this.updateMapCentrePos(centerPos.coords.latitude, centerPos.coords.longitude, false);
                    } else {
                        this.logging.log("Map centre/zoom changed - map not ready to change centre pos:");
                    }
                });
            }
        }, 300, false);
    }

    setParentAppContext(context: any) {
        this.parentAppContext = context;
    }

    setMapAPI(api: MappingAPI) {
        this.mapOptions.mapAPI = api;

        /*
        if (this.mapOptions.mapAPI == MappingAPI.GOOGLE_NATIVE) {
            this.mapProvider = new GoogleMapsNative(this.events, this.logging);
        }

        if (this.mapOptions.mapAPI == MappingAPI.GOOGLE_WEB) {
            this.mapProvider = new GoogleMapsWeb(this.events, this.logging);
        }

        if (this.mapOptions.mapAPI == MappingAPI.LEAFLET) {
            this.mapProvider = new LeafletMap(this.events, this.logging);
        }*/

        if (this.mapOptions.mapAPI == MappingAPI.MAPBOX) {
            this.mapProvider = new MapBoxMapProvider(this.events, this.logging, this.http);
        }

        if (this.mapOptions.mapAPI == MappingAPI.MAPKIT_JS) {
            this.mapProvider = new MapKitMapProvider(this.events, this.logging);
        }

        if (this.mapOptions.mapAPI == MappingAPI.MAPTILER) {
            this.mapProvider = new MapTilerMapProvider(this.events, this.logging, this.http);
        }
    }

    isMapReady() {
        if (this.mapProvider != null) {
            return this.mapProvider.mapReady;
        } else {
            return false;
        }
    }

    externalAPILoaded(mapAPI: MappingAPI) {
        this.mapAPIReady = true;
        this.logging.log("Mapping API Loaded: " + MappingAPI[mapAPI]);
    }

    /**
     * Performs one-time init of map object, detects cordova and chooses map api as appropriate
     * @param mapcanvasID  dom element for map canvas
     */
    initMap(mapcanvasID: string) {
        if (this.isMapReady()) { return; }

        if (this.mapProvider != null) {
            if (this.mapsInitialised) {
                this.logging.log("initMap: Map provider already initialised");
            }

            this.logging.log("Mapping Manager: Init " + MappingAPI[this.mapProvider.mapAPIType]);

            this.mapProvider.initMap(
                mapcanvasID,
                this.mapOptions,
                this
            );
        } else {
            if (this.mapsInitialised) {
                this.logging.log("initMap: map already initialised");
                return;
            } else {
                this.logging.log("initMap: " + this.mapOptions.mapAPI);
            }
        }
    }

    /**
    * Used by map provider as callback when a zoom or pan/drag has been performed
    * @param manipulationType  string name for event "zoom", "drag" etc
    */
    mapManipulationPerformed(manipulationType: string) {
        this.logging.log("map manipulated:" + manipulationType);
        let mapManagerContext = this;
        if (manipulationType == "drag" || manipulationType == "zoom") {
            // after the center of the map centre has stopped changing, update search centre pos
            this.debouncedMapPositionUpdate();
        }
    }

    updateMapSize() {
        if (this.mapProvider) {
            this.mapProvider.refreshMapLayout();
        }
    }

    updateMapCentrePos(lat: number, lng: number, moveMap: boolean, zoomLevel?: number) {
        // update record of map centre so search results can optionally be refreshed
        if (moveMap) {
            if (this.mapProvider != null) {
                this.mapProvider.setMapCenter(new GeoPosition(lat, lng), zoomLevel);
            }
        }

        this.mapOptions.mapCentre = new GeoPosition(lat, lng);
    }

    moveToMapBounds(bounds: GeoBounds) {
        this.mapProvider.moveToMapBounds(bounds);
    }

    refreshMapView(mapHeight: number, poiList: Array<any>, searchPos: any): boolean {
        if (this.mapProvider != null) {
            this.logging.log("Mapping Manager: renderMap " + MappingAPI[this.mapProvider.mapAPIType]);

            if (this.isMapReady()) {
                this.mapProvider.renderMap(poiList, mapHeight, this.parentAppContext);
            } else {
                this.logging.log("refreshMapView: map provider not initialised..");
            }
        } else {
            this.logging.log("Unsupported Map API: refreshMapView", LogLevel.ERROR);
        }
        return true;
    }

    setMapType(maptype: MapType) {
        if (this.mapOptions.mapType == maptype) { return; }

        this.mapOptions.mapType = maptype;

        if (this.isMapReady() && this.mapProvider != null) {

            this.logging.log("Changing map type:" + maptype);
            this.mapProvider.setMapType(maptype);
        } else {
            this.logging.log("Map type set, maps not initialised yet.");
        }
    }

    unfocusMap() {
        this.logging.log("[mapping] Unfocus Map.");
        this.isFocused = false;
        this.mapProvider.unfocusMap();
    }

    focusMap() {
        this.logging.log("[mapping] Focus Map.");
        this.isFocused = true;
        this.mapProvider.focusMap();
    }

    getMapBounds(): Observable<Array<GeoLatLng>> {
        return this.mapProvider.getMapBounds();
    }
    getMapZoom(): Observable<number> {
        // TODO: normalize zoom between providers?
        return this.mapProvider.getMapZoom();
    }
    setMapZoom(zoom: number) {
        this.mapProvider.setMapZoom(zoom);
    }
    getMapCenter(): Observable<GeoPosition> {
        return this.mapProvider.getMapCenter();
    }

    showPOIOnStaticMap(mapcanvasID: string, poi, includeMapLink: boolean = false, isRunningUnderCordova: boolean = false, mapWidth: number = 200, mapHeight: number = 200) {
        let mapCanvas = document.getElementById(mapcanvasID);
        if (mapCanvas != null) {
            let title = poi.AddressInfo.Title;
            let lat = poi.AddressInfo.Latitude;
            let lon = poi.AddressInfo.Longitude;

            if (mapWidth > 640) { mapWidth = 640; }
            if (mapHeight > 640) { mapHeight = 640; }
            let width = mapWidth;
            let height = mapHeight;

            let mapImageURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=14&size=" + width + "x" + height + "&maptype=roadmap&markers=color:blue%7Clabel:A%7C" + lat + "," + lon + "&sensor=false";
            let mapHTML = "";
            if (includeMapLink == true) {
                mapHTML += "<div>" + Utils.formatMapLink(poi, "<div><img width=\"" + width + "\" height=\"" + height + "\" src=\"" + mapImageURL + "\" /></div>", isRunningUnderCordova) + "</div>";
            } else {
                mapHTML += "<div><img width=\"" + width + "\" height=\"" + height + "\" src=\"" + mapImageURL + "\" /></div>";
            }

            mapCanvas.innerHTML = mapHTML;
        }
    }

    renderPolyline(polyline: string) {
        this.mapProvider.renderPolyline(polyline);
    }
    clearPolyline() {
        this.mapProvider.clearPolyline();
    }

    clearMarkers() {
        this.logging.log("mapping: clearing markers");

        this.mapProvider.clearMarkers();
    }

    addPOILayer(data: any[]) {
        this.mapProvider.addPOILayer(data);
    }

}
