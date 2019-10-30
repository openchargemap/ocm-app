
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/

import { Utils } from '../../../core/Utils';
import { MappingAPI, IMapProvider, MapOptions, IMapManager } from '../interfaces/mapping';
import { Events } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from 'typescript-collections';
import { GeoPosition, GeoLatLng, GeoBounds } from './../../../model/GeoPosition';
import { Logging, LogLevel } from './../../Logging';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';
import { map } from 'leaflet';
import { PlaceSearchResult } from '../../../model/AppModels';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**Map Provider for MapBox GL JS API
* @module MapProviders
*/

@Injectable()
export class MapBoxMapProvider implements IMapProvider {
  mapAPIType: MappingAPI;
  mapReady: boolean;
  providerError: string;
  mapCanvasID: string;

  private map: mapboxgl.Map;
  private markerList: Dictionary<number, any>;
  private polylinePath: any;

  private searchMarker: mapboxgl.Marker;

  public mapTileSet: string;

  /** @constructor */
  constructor(private events: Events, private logging: Logging, private http: HttpClient) {
    this.events = events;
    this.mapAPIType = MappingAPI.MAPBOX;
    this.mapTileSet = 'mapbox://styles/mapbox/streets-v10';
    this.mapReady = false;
    this.markerList = new Dictionary<number, any>();
  }

  initAPI() {
    if (mapboxgl) {
      (<any>mapboxgl).accessToken = environment.mapBoxToken;
    }
  }

  /**
  * Performs one-time init of map object for this map provider
  * @param mapcanvasID  dom element for map canvas
  * @param mapConfig  general map config/options
 
  */
  initMap(mapCanvasID, mapConfig: MapOptions, parentMapManager: IMapManager) {
    this.mapCanvasID = mapCanvasID;

    var apiLoaded = true;
    if (typeof mapboxgl === 'undefined') {
      apiLoaded = false;
    } else {
      apiLoaded = true;
    }

    if (apiLoaded) {
      if (this.map == null) {
        var mapCanvas = document.getElementById(mapCanvasID);

        this.initAPI();

        this.map = new mapboxgl.Map({
          container: mapCanvasID,
          style: this.mapTileSet,
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


        this.map.on('load', () => {

          this.events.publish('ocm:mapping:ready');
        });

        this.map.on('move', () => {

          // if search maerk enabled, move marker to map centre
          if (this.searchMarker) {
            this.getMapCenter().subscribe(pos => {
              this.searchMarker.setLngLat(new mapboxgl.LngLat(pos.coords.longitude, pos.coords.latitude));
            });

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

      this.markerList.forEach((key, marker) => {
        try {
          marker.remove();
        } catch{ }
      });
    }

    this.markerList = new Dictionary<number, google.maps.Marker>();
  }

  /**
  * Renders the given array of POIs as map markers
  * @param poiList  array of POI objects
  * @param parentContext  parent app context
  */
  showPOIListOnMap(poiList: Array<any>, parentContext: any) {
    var clearMarkersOnRefresh: boolean = false;
    var map = this.map;
    var bounds = new mapboxgl.LngLatBounds();
    var markersAdded = 0;
    var mapProviderContext = this;

    //clear existing markers (if enabled)
    if (clearMarkersOnRefresh) {
      this.clearMarkers();
    }

    var mapzoom = map.getZoom();

    if (poiList != null) {
      //render poi markers
      var poiCount = poiList.length;
      for (var i = 0; i < poiList.length; i++) {
        if (poiList[i].AddressInfo != null && poiList[i].AddressInfo.Latitude != null && poiList[i].AddressInfo.Longitude != null) {

          var poi = poiList[i];

          let addMarker = true;
          if (!clearMarkersOnRefresh && this.markerList != null) {
            // find if this poi already exists in the marker list
            if (this.markerList.containsKey(poi.ID)) {
              addMarker = false;
            }
          }

          if (addMarker) {

            let iconURL = Utils.getIconForPOI(poi);

            var icon = document.createElement("img");
            icon.src = iconURL;
            icon.width = 34;
            icon.height = 50;

            let markerOptions = {
              element: icon
            };

            var markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
            if (poi.UsageType != null) markerTooltip += " " + poi.UsageType.Title;

            if (poi.StatusType != null) markerTooltip += " " + poi.StatusType.Title;

            let newMarker = new mapboxgl.Marker(markerOptions)
              .setLngLat([poi.AddressInfo.Longitude, poi.AddressInfo.Latitude])
              .addTo(map);


            (<any>newMarker).poi = poi;

            let markerElement = newMarker.getElement();

            (<any>markerElement).poi = poi;
            markerElement.addEventListener('click', (el) => {
              const clickedPOI = (<any>el.currentTarget).poi;
              this.events.publish('ocm:poi:selected', { poi: clickedPOI, poiId: clickedPOI.ID });
            });


            bounds.extend(newMarker.getLngLat());

            this.markerList.setValue(poi.ID, newMarker);
            markersAdded++;
          }

        }
      }

      this.logging.log(markersAdded + " new map markers added out of a total " + this.markerList.size());
    }

    var uiContext = this;
    // zoom to bounds of markers
    if (poiList != null && poiList.length > 0) {
      if (parentContext != null && !parentContext.appConfig.enableLiveMapQuerying) {
        this.logging.log("Fitting to marker bounds:" + bounds);
        map.setCenter(bounds.getCenter());
        this.logging.log("zoom before fit bounds:" + map.getZoom());

        map.fitBounds(bounds);

        // fix incorrect zoom level when fitBounds guesses a zooom level of 0 etc.
        var zoom = map.getZoom();
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
        this.searchMarker = new mapboxgl.Marker({ color: '#99ccff', anchor: 'top' })
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
    let obs = Observable.create(observer => {
      if (this.map != null) {
        var pos = this.map.getCenter();
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
    let obs = Observable.create(observer => {

      let zoom = this.map.getZoom();
      observer.next(zoom);
      observer.complete();

    });
    return obs;
  }

  setMapType(mapType: string) {
    /* try {
       this.map.set("google.maps.MapTypeId." + mapType);
     } catch (exception) {
       this.logging.log("Failed to set map type:" + mapType + " : " + exception.toString());
     }*/
    this.logging.log("MapBox: skipped setting Map Type :" + mapType);
  }

  getMapBounds(): Observable<Array<GeoLatLng>> {
    // wrap getzoom in an observable
    let obs = Observable.create(observer => {

      var bounds = new Array<GeoLatLng>();

      var mapBounds = this.map.getBounds();
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
  };
}
