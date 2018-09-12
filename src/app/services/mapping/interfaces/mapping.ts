import { Observable } from "rxjs-compat/Observable";
import { GeoPosition, GeoLatLng, GeoBounds } from "../../../model/AppModels";

export enum MappingAPI {
    GOOGLE_WEB,
    GOOGLE_NATIVE,
    LEAFLET
}

export interface IMapProvider {
    mapAPIType: MappingAPI;
    mapReady: boolean;
    providerError: string;

    initMap(mapCanvasID: string, mapConfig: MapOptions, mapManagerContext: IMapManager);
    refreshMapLayout();
    renderMap(poiList: Array<any>, mapHeight: number, parentContext: any);
    clearMarkers();
    getMapZoom(): Observable<number>;
    setMapZoom(zoomLevel: number);
    getMapCenter(): Observable<GeoPosition>;
    setMapCenter(pos: GeoPosition);
    setMapType(mapType: string);
    getMapBounds(): Observable<Array<GeoLatLng>>;
    moveToMapBounds(bounds: GeoBounds);
    renderPolyline(polyline: string);
    clearPolyline();
    focusMap();
    unfocusMap();
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
    public mapType: string;
    public minZoomLevel: number;


    /** @constructor */
    constructor() {
        this.enableClustering = false;
        this.resultBatchID = -1;
        this.useMarkerIcons = true;
        this.useMarkerAnimation = true;
        this.enableTrackingMapCentre = false;
        this.enableSearchByWatchingLocation = false;
        this.mapCentre = null;
        this.mapAPI = MappingAPI.GOOGLE_WEB;
        this.mapType = "ROADMAP";
        this.searchDistanceKM = 1000 * 100;
        this.mapMoveQueryRefreshMS = 300;
        this.enableSearchRadiusIndicator = false;
        this.minZoomLevel = 2;
    }
}


export interface IMapManager {

}