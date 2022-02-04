import { environment } from './../../../../environments/environment';

import { GeoPosition, GeoLatLng, GeoBounds, PlaceSearchResult } from "../../../model/AppModels";
import { Observable } from 'rxjs';

export enum MappingAPI {
    GOOGLE_WEB = 1,
    GOOGLE_NATIVE = 2,
    LEAFLET = 3,
    MAPBOX = 4,
    MAPKIT_JS = 5,
    MAPTILER = 6
}

export type MapType = 'ROADMAP' | 'SATELLITE';

export interface IMapProvider {

    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;

    initAPI();
    initMap(mapCanvasID: string, mapConfig: MapOptions, mapManagerContext: IMapManager);
    refreshMapLayout();
    renderMap(poiList: Array<any>, mapHeight: number, parentContext: any);
    clearMarkers();
    getMapZoom(): Observable<number>;
    setMapZoom(zoomLevel: number);
    getMapCenter(): Observable<GeoPosition>;
    setMapCenter(pos: GeoPosition, zoomLevel?: number);
    setMapType(mapType: MapType);
    getMapBounds(): Observable<Array<GeoLatLng>>;
    moveToMapBounds(bounds: GeoBounds);
    renderPolyline(polyline: string);
    clearPolyline();
    focusMap();
    unfocusMap();
    placeSearch(keyword: string, latitude?: number, longitude?: number): Promise<Array<PlaceSearchResult>>;
    addPOILayer(data: any[]);
    disposeMap();
}

export class MapOptions {

    public enableClustering: boolean;
    public resultBatchID: number;

    public useMarkerIcons: boolean;
    public useMarkerAnimation: boolean;
    public enableTrackingMapCentre: boolean;
    public enableSearchByWatchingLocation: boolean;
    public mapCentre: GeoPosition;
    public searchDistanceKM: number;
    public iconSet: string;
    public mapAPI: MappingAPI;
    public mapMoveQueryRefreshMS: number; // time to wait before recognising map centre has changed
    public requestSearchUpdate: boolean;
    public enableSearchRadiusIndicator: boolean;
    public mapType: MapType;
    public minZoomLevel: number;
    public onMapMoveCompleted: any;

    /** @constructor */
    constructor() {
        this.enableClustering = false;
        this.resultBatchID = -1;
        this.useMarkerIcons = true;
        this.useMarkerAnimation = true;
        this.enableTrackingMapCentre = false;
        this.enableSearchByWatchingLocation = false;
        this.mapCentre = null;
        this.mapAPI = environment.defaultMapProvider;
        this.mapType = "ROADMAP";
        this.searchDistanceKM = 1000 * 100;
        this.mapMoveQueryRefreshMS = 300;
        this.enableSearchRadiusIndicator = false;
        this.minZoomLevel = 2;
    }
}


export interface IMapManager {

}
