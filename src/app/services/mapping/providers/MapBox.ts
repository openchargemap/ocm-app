
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Utils } from '../../../core/Utils';
import { MappingAPI, IMapProvider, MapOptions, IMapManager, MapType } from '../interfaces/mapping';
import { Events } from '../../../services/Events';
import { Observable } from 'rxjs';
import { GeoPosition, GeoLatLng, GeoBounds } from './../../../model/GeoPosition';
import { Logging, LogLevel } from './../../Logging';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { PlaceSearchResult } from '../../../model/AppModels';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtendedPOIDetails } from '../../../model/CoreDataModel';

/**Map Provider for MapBox GL JS API
* @module MapProviders
*/
let _this = null;

@Injectable()
export class MapBoxMapProvider implements IMapProvider {
  mapAPIType: MappingAPI;
  mapReady: boolean;
  providerError: string;
  mapCanvasID: string;

  private map: mapboxgl.Map;
  private markerList: Map<number, any>;
  private polylinePath: any;
  private _isMapAnimating: boolean = false;

  private searchMarker: mapboxgl.Marker;

  public mapTileSet: string;

  /** @constructor */
  constructor(private events: Events, private logging: Logging, private http: HttpClient) {
    this.events = events;
    this.mapAPIType = MappingAPI.MAPBOX;

    this.mapReady = false;
    this.markerList = new Map<number, any>();
  }

  initAPI() {
    if (mapboxgl) {
      //(<any>mapboxgl).accessToken = environment.mapBoxToken;
      Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapBoxToken);
    }
  }

  disposeMap() {
    // clean up map resources
    if (this.map) {
      this.logging.log("Disposing map", LogLevel.INFO);
      this.map.remove();
    }
  }

  private getCurrentMapTileSet(mapType: MapType): string {
    if (mapType == 'SATELLITE') {
      return 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true';
    } else {
      return 'mapbox://styles/mapbox/streets-v12?optimize=true';
    }
  }

  flyAroundPoint(timestamp) {

    if (this._isMapAnimating) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      this.map.rotateTo((timestamp / 100) % 360, { duration: 0 });

      // Request the next frame of the animation.
      const _context = this;
      requestAnimationFrame(function (t) { _context.flyAroundPoint(t); });
    }
  }

  /**
  * Performs one-time init of map object for this map provider
  * @param mapcanvasID  dom element for map canvas
  * @param mapConfig  general map config/options
  */
  initMap(mapCanvasID: string, mapConfig: MapOptions, parentMapManager: IMapManager) {
    this.mapCanvasID = mapCanvasID;

    let apiLoaded = true;
    if (typeof mapboxgl === 'undefined') {
      apiLoaded = false;
    } else {
      apiLoaded = true;
    }

    if (apiLoaded) {
      if (this.map == null) {
        let mapCanvas = document.getElementById(mapCanvasID);

        this.initAPI();

        this.map = new mapboxgl.Map({
          container: mapCanvasID,
          //style: this.getCurrentMapTileSet(mapConfig.mapType),
          zoom: 15,
          attributionControl: false
        });

        this.map.addControl(new mapboxgl.AttributionControl({
          compact: true,
          customAttribution: ["Open Charge Map Contributors"]
        }));

        // Add zoom and rotation controls to the map.
        this.map.addControl(new mapboxgl.NavigationControl());

        this.mapReady = true;


        this.map.getCanvas().focus();

        // pixels the map pans when the up or down arrow is clicked
        let deltaDistance = 100;

        // degrees the map rotates when the left or right arrow is clicked
        let deltaDegrees = 25;

        function easing(t) {
          return t * (2 - t);
        }

        this.map.getCanvas().addEventListener(
          'keydown',
          (e) => {
            e.preventDefault();
            if (e.which === 38) {
              // up
              this.map.panBy([0, -deltaDistance], {
                easing: easing
              });
            } else if (e.which === 40) {
              // down
              this.map.panBy([0, deltaDistance], {
                easing: easing
              });
            } else if (e.which === 37) {
              // left
              this.map.easeTo({
                bearing: this.map.getBearing() - deltaDegrees,
                easing: easing
              });
            } else if (e.which === 39) {
              // right
              this.map.easeTo({
                bearing: this.map.getBearing() + deltaDegrees,
                easing: easing
              });
            } else if (e.which === 32) {
              // fly around
              if (!this._isMapAnimating) {
                this._isMapAnimating = true;
                this.flyAroundPoint(0);
              } else {
                this._isMapAnimating = false;
              }
            }
          },
          true
        );

        //  this.flyAroundPoint(0);

        this.map.on('load', () => {

          this.events.publish('ocm:mapping:ready');
        });

        let updateSearchMarker = Utils.debounce(() => {
          this.getMapCenter().subscribe(pos => {
            this.searchMarker.setLngLat(new mapboxgl.LngLat(pos.coords.longitude, pos.coords.latitude));
          });
        }, 500, false);

        this.map.on('move', () => {


          // if search marker enabled, move marker to map centre
          if (this.searchMarker) {
            updateSearchMarker();
          }

        });

        this.map.on('moveend', () => {
          this.events.publish('ocm:mapping:dragend');

          // optional callback when map moves
          if (mapConfig.onMapMoveCompleted) {
            mapConfig.onMapMoveCompleted();
          }
        });

        this.map.on('zoomend', () => {
          this.events.publish('ocm:mapping:zoom');
        });

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

    this.markerList = new Map<number, any>();
  }

  /**
  * Renders the given array of POIs as map markers
  * @param poiList  array of POI objects
  * @param parentContext  parent app context
  */
  showPOIListOnMap(poiList: Array<any>, parentContext: any, isNativePOI: boolean = true) {
    let clearMarkersOnRefresh: boolean = false;
    let map = this.map;
    let bounds = new mapboxgl.LngLatBounds();
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
        if (poiList[i].AddressInfo != null && poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {

          let poi = poiList[i];

          let addMarker = true;
          if (!clearMarkersOnRefresh && this.markerList != null) {
            // find if this poi already exists in the marker list
            if (this.markerList.has(poi.ID)) {
              addMarker = false;

              let existingMarker = this.markerList.get(poi.ID);
              if (existingMarker && existingMarker.poi) {
                if ((<ExtendedPOIDetails>existingMarker.poi).DateLastStatusUpdate != poi.DateLastStatusUpdate) {
                  // data has changed, re-add marker
                  existingMarker.remove();
                  addMarker = true;
                }
              }
            }
          }

          if (addMarker) {

            let icon = null;
            let color = null;

            if (!isNativePOI) {
              icon = null;
              color = Utils.getColorForPOI(poi);
            } else {
              icon = document.createElement("img");
              icon.src = Utils.getIconForPOI(poi);
              icon.width = 34;
              icon.height = 50;
            }

            let markerOptions: mapboxgl.MarkerOptions = {
              element: icon,
              color: color,
              anchor: 'bottom'
            };

            let markerTooltip = (isNativePOI ? "OCM-" : "EXT-") + poi.ID + ": " + poi.AddressInfo.Title + ":";
            if (poi.UsageType != null) { markerTooltip += " " + poi.UsageType.Title; }

            if (poi.StatusType != null) { markerTooltip += " " + poi.StatusType.Title; }

            let newMarker = new mapboxgl.Marker(markerOptions)
              .setLngLat([poi.AddressInfo.Longitude, poi.AddressInfo.Latitude])
              .addTo(map);

            (<any>newMarker).poi = poi;

            let markerElement = newMarker.getElement();

            (<any>markerElement).poi = poi;
            markerElement.addEventListener('click', (el) => {
              const clickedPOI = (<any>el.currentTarget).poi;
              this.events.publish('ocm:poi:selected', { poiId: clickedPOI.ID, poi: clickedPOI });
            });

            bounds.extend(newMarker.getLngLat());

            this.markerList.set(poi.ID, newMarker);
            markersAdded++;
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
        this.logging.log("MapBoxGL: refreshMapLayout", LogLevel.VERBOSE);
        this.map.resize();

      }, 200);

    }
  }

  setMapCenter(pos: GeoPosition) {
    if (this.mapReady) {
      this.map.setCenter(new mapboxgl.LngLat(pos.coords.longitude, pos.coords.latitude));

      if (!this.searchMarker) {
        this.searchMarker = new mapboxgl.Marker({ color: '#99ccff', anchor: 'bottom' })
          .setLngLat(new mapboxgl.LngLat(pos.coords.longitude, pos.coords.latitude))
          .addTo(this.map);

        this.searchMarker.getElement().addEventListener('click', () => {
          let searchPos = this.searchMarker.getLngLat();
          this.events.publish('ocm:mapping:addpoi', new GeoLatLng(searchPos.lat, searchPos.lng));
        });
      }
    }
  }

  getMapCenter(): Observable<GeoPosition> {

    // wrap getCenter in an observable
    let obs = new Observable<GeoPosition>(observer => {
      if (this.map != null) {
        let pos = this.map.getCenter();
        if (pos != null) {
          observer.next(new GeoPosition(pos.lat, pos.lng));
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

  setMapType(mapType: MapType) {

    this.map.setStyle(this.getCurrentMapTileSet(mapType));
  }

  getMapBounds(): Observable<Array<GeoLatLng>> {
    // wrap getzoom in an observable
    let obs = new Observable<Array<GeoLatLng>>(observer => {

      let bounds = new Array<GeoLatLng>();

      let mapBounds = this.map.getBounds();
      bounds.push(new GeoLatLng(mapBounds.getSouthWest().lat, mapBounds.getSouthWest().lng));
      bounds.push(new GeoLatLng(mapBounds.getNorthEast().lat, mapBounds.getNorthEast().lng));


      observer.next(bounds);
      observer.complete();
    });
    return obs;
  }

  moveToMapBounds(bounds: GeoBounds) {
    this.map.fitBounds(
      new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(bounds.southWest.longitude, bounds.southWest.latitude),
        new mapboxgl.LngLat(bounds.northEast.longitude, bounds.northEast.latitude))
    );
  }

  renderMap(poiList: Array<any>, mapHeight: number, parentContext: any): boolean {
    document.getElementById(this.mapCanvasID).style.height = mapHeight + "px";

    // finish init of map view if not already initialised (could previously be called before api ready)
    // this.initMap(this.mapCanvasID, parentContext.mappingManager.mapOptions, this.mapManipulationCallback);

    if (this.mapReady) {
      this.showPOIListOnMap(poiList, parentContext);
    }

    return true;
  }

  renderPolyline(polyline: string) {
    this.clearPolyline();
    /*
        this.polylinePath = {
          path: <any>google.maps.geometry.encoding.decodePath(polyline),
          geodesic: true,
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 4
        };
    
        this.polylinePath.setMap(this.map);
    */
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

  async placeSearch(keyword: string, latitude?: number, longitude?: number): Promise<Array<PlaceSearchResult>> {

    let api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword ? keyword : longitude + ',' + latitude}.json?access_token=${environment.mapBoxToken}`;

    return new Promise<Array<PlaceSearchResult>>(async (resolve, reject) => {

      this.http.get(api).toPromise().then((results: any) => {

        let placeList: Array<PlaceSearchResult> = [];

        placeList = [];
        if (results.features) {
          results.features.map((feature) => {

            let placeResult = new PlaceSearchResult();

            placeResult.Title = feature.place_name;

            placeResult.Address = feature.place_name;
            placeResult.Type = "place";
            placeResult.Location = new GeoLatLng(feature.center[1], feature.center[0]);
            placeResult.Attribution = results.attribution;
            placeList.push(placeResult);
          });
        }


        resolve(placeList);
      });
    });
  }

  addPOILayer(data: any[]) {
    this.logging.log("Add POI Layer not implemented in this provider.");
    this.showPOIListOnMap(data, null, false);
  }
}
