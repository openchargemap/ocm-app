
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
import { environment } from '../../../../environments/environment';
import { PlaceSearchResult } from '../../../model/AppModels';


declare var mapkit: any;

/**Map Provider for Apple MapKit JS API
* @module MapProviders
*/
export class MapKitMapProvider implements IMapProvider {
  mapAPIType: MappingAPI;
  mapReady: boolean;
  providerError: string;
  mapCanvasID: string;

  private map: any;
  private markerList: Map<number, any>;
  private polylinePath: any;
  private mapkitUtils: MapKitUtils;

  /** @constructor */
  constructor(private events: Events, private logging: Logging) {
    this.events = events;
    this.mapAPIType = MappingAPI.MAPKIT_JS;
    this.mapReady = false;
    this.markerList = new Map<number, any>();
    this.mapkitUtils = new MapKitUtils();
  }

  initAPI() {
    if (mapkit) {
      mapkit.init({
        authorizationCallback: function (done) {
          done(environment.mapKitToken);
        }
      });
    }
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
    if (typeof mapkit === 'undefined') {
      apiLoaded = false;
    } else {
      apiLoaded = true;
    }

    if (apiLoaded) {

      this.initAPI();

      if (this.map == null) {
        let mapCanvas = document.getElementById(mapCanvasID);


        this.map = new mapkit.Map(mapCanvasID);

        // set cluster formatting
        this.map.annotationForCluster = function (clusterAnnotation) {
          if (clusterAnnotation.clusteringIdentifier === "poi") {
            clusterAnnotation.title = "Charging Location";
            clusterAnnotation.subtitle = clusterAnnotation.memberAnnotations
              .reduce((total, clusterAnnotation) => total + clusterAnnotation.population, 0);
          }
        };

        this.mapReady = true;

        mapkit.addEventListener("configuration-change", (event) => {
          this.events.publish('ocm:mapping:ready');
        });

        this.map.addEventListener("scroll-end", (event) => {
          this.events.publish('ocm:mapping:dragend');
        });

        this.map.addEventListener("zoom-end", (event) => {
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
          this.map.removeAnnotation(marker);
        } catch { }
      });
    }

    this.markerList = new Map<number, any>();

  }

  /**
  * Renders the given array of POIs as map markers
  * @param poiList  array of POI objects
  * @param parentContext  parent app context
  */
  showPOIListOnMap(poiList: Array<any>, parentContext: any) {
    let clearMarkersOnRefresh: boolean = false;
    let map = this.map;
    let bounds = {};
    let markersAdded = 0;
    let mapProviderContext = this;

    let isFirstResultSet = this.markerList.size == 0;

    // clear existing markers (if enabled)
    if (clearMarkersOnRefresh) {
      this.clearMarkers();
    }

    if (poiList != null) {
      // render poi markers
      let poiCount = poiList.length;
      let newMarkers = [];

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

              /* markerImg = {
                 url: iconURL,
                 size: new google.maps.Size(68, 100.0),

                 anchor: new google.maps.Point(15, 45),
                 scaledSize: new google.maps.Size(34, 50)

               };*/

              let markerTooltip = "OCM-" + poi.ID + ": " + poi.AddressInfo.Title + ":";
              if (poi.UsageType != null) { markerTooltip += " " + poi.UsageType.Title; }

              if (poi.StatusType != null) { markerTooltip += " " + poi.StatusType.Title; }

              const coordinates = new mapkit.Coordinate(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude);

              let marker = new mapkit.ImageAnnotation(coordinates, {
                title: markerTooltip,
                size: { width: 34, height: 50 },
                url: { 1: iconURL },
                clusteringIdentifier: "poi"
              });


              marker.poi = poi;

              marker.addEventListener('select', (el) => {
                const clickedPOI = el.target.poi;
                this.events.publish('ocm:poi:selected', { poi: clickedPOI, poiId: clickedPOI.ID });
              });

              this.markerList.set(poi.ID, marker);

              newMarkers.push(marker);

              markersAdded++;
            }
          }
        }
      }

      if (newMarkers.length > 0) {



        this.map.addAnnotations(newMarkers);


        if (isFirstResultSet) {
          // zoom into results for first result set
          this.map.showItems(newMarkers,
            {
              animate: true,
              padding: new mapkit.Padding(60, 25, 60, 25)
            });
        }
      }


      this.logging.log(markersAdded + " new map markers added out of a total " + this.markerList.size);
    }

    // zoom to bounds of markers
    /* if (poiList != null && poiList.length > 0) {
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
     }*/

    // this.refreshMapLayout();
  }

  refreshMapLayout() {
    if (this.map != null) {

      setTimeout(() => {
        this.logging.log("MapKit: refreshMapLayout", LogLevel.VERBOSE);
        // this.map.resize();

      }, 200);

    }
  }

  setMapCenter(pos: GeoPosition, zoomLevel?: number) {
    if (this.map) {
      this.map.setCenterAnimated(new mapkit.Coordinate(pos.coords.latitude, pos.coords.longitude), false);

      if (zoomLevel) {
        this.setMapZoom(zoomLevel);
      }
    }
  }

  getMapCenter(): Observable<GeoPosition> {

    // wrap getCenter in an observable
    let obs = new Observable<GeoPosition>(observer => {
      if (this.map != null) {
        let pos = this.map.center;
        if (pos != null) {
          observer.next(new GeoPosition(pos.latitude, pos.longitude));
          observer.complete();
        }
      }
    });

    return obs;
  }

  setMapZoom(zoom: number) {
    // this.logging.log("MapKit: setMapZoom not supported", LogLevel.VERBOSE);
    // this.map.setZoom(zoomLevel);

    // use the zoom level to compute the region

    // const currentZoomLevel = this.map._impl.zoomLevel;

    const zoomLevel = Math.min(zoom, 28);

    const delta = this.mapkitUtils.deltaFromZoomLevel(this.map, this.map.center, Math.round(zoomLevel));
    // Create the CoordinateRegion from the delta latitude and
    // the delta longitude multiplied by 111 (1deg = 111km)
    const span = new mapkit.CoordinateSpan(delta.latitudeDelta * 111, delta.longitudeDelta * 111);
    const region = new mapkit.CoordinateRegion(this.map.center, span);
    this.map.setRegionAnimated(region);
  }

  getMapZoom(): Observable<number> {

    // wrap getzoom in an observable
    let obs = new Observable<number>(observer => {

      this.logging.log("MapKit: getMapZoom not supported", LogLevel.VERBOSE);
      let zoom = this.map._impl.zoomLevel; // TODO: should not use internal property
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
    this.logging.log("MapKit: skipped setting Map Type :" + mapType);
  }

  getMapBounds(): Observable<Array<GeoLatLng>> {
    // wrap getzoom in an observable
    let obs = new Observable<Array<GeoLatLng>>(observer => {

      let bounds = new Array<GeoLatLng>();

      let mapBounds = this.map.region.toBoundingRegion();
      bounds.push(new GeoLatLng(mapBounds.southLatitude, mapBounds.westLongitude));
      bounds.push(new GeoLatLng(mapBounds.northLatitude, mapBounds.eastLongitude));

      observer.next(bounds);
      observer.complete();
    });
    return obs;
  }

  moveToMapBounds(bounds: GeoBounds) {
    this.logging.log("MapKit: map bounds not implemented");
    /*this.map.fitBounds(
      new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(bounds.southWest.longitude, bounds.southWest.latitude),
        new mapboxgl.LngLat(bounds.northEast.longitude, bounds.northEast.latitude))
    );*/
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

    // not implemented

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

  async placeSearch(keyword: string): Promise<Array<PlaceSearchResult>> {
    let searchService = new mapkit.Search({ getsUserLocation: true });

    return new Promise<Array<PlaceSearchResult>>(async (resolve, reject) => {

      let placeList: Array<PlaceSearchResult> = [];

      searchService.search(keyword, async (error, data) => {

        if (error) {
          // Handle search error
          reject(error);
        }

        placeList = [];

        data.places.map((place) => {

          let placeResult = new PlaceSearchResult();

          placeResult.Title = place.name;
          // placeResult.ReferenceID = (<any>place).place_id;
          placeResult.Address = place.formattedAddress;
          placeResult.Type = "place";
          placeResult.Location = new GeoLatLng(place.coordinate.latitude, place.coordinate.longitude);

          placeList.push(placeResult);
        });

        resolve(placeList);
      });
    });

  }

  addPOILayer(data: any[]) {
    this.logging.log("Add POI Layer not implemented in this provider.");
  }
}

class MapKitUtils {

  // adapted from https://medium.com/@xavierletohic/how-to-migrate-from-google-maps-api-javascript-to-apple-mapkit-js-dc862f1f0a89
  // which is based on http://troybrant.net/blog/2010/01/set-the-zoom-level-of-an-mkmapview/

  mercatorRadius = 85445659.44705395;
  mercatorOffset = 268435456;

  longitudeToPixelSpaceX(longitude) {
    return Math.round(this.mercatorOffset + this.mercatorRadius * longitude * Math.PI / 180.0);
  }

  latitudeToPixelSpaceY(latitude) {
    return Math.round(this.mercatorOffset - this.mercatorRadius * Math.log((1 + Math.sin(latitude * Math.PI / 180.0)) / (1 - Math.sin(latitude * Math.PI / 180.0))) / 2.0);
  }

  pixelSpaceXToLongitude(pixelX) {
    return ((Math.round(pixelX) - this.mercatorOffset) / this.mercatorRadius) * 180.0 / Math.PI;
  }

  pixelSpaceYToLatitude(pixelY) {
    return (Math.PI / 2.0 - 2.0 * Math.atan(Math.exp((Math.round(pixelY) - this.mercatorOffset) / this.mercatorRadius))) * 180.0 / Math.PI;
  }

  /**
  *
  * @param {object} map
  * @param {object} centerCoordinates
  * @param {number} zoomLevel
  */
  deltaFromZoomLevel(map, centerCoordinates, zoomLevel) {
    // convert center coordinate to pixel space
    let centerPixelX = this.longitudeToPixelSpaceX(centerCoordinates.longitude);
    let centerPixelY = this.latitudeToPixelSpaceY(centerCoordinates.latitude);

    // determine the scale value from the zoom level
    let zoomExponent = 20 - zoomLevel;
    let zoomScale = Math.pow(2, zoomExponent);

    // scale the map’s size in pixel space
    let mapSizeInPixels = map.visibleMapRect.size;
    let scaledMapWidth = mapSizeInPixels.width * zoomScale;
    let scaledMapHeight = mapSizeInPixels.height * zoomScale;

    // figure out the position of the top-left pixel
    let topLeftPixelX = centerPixelX - (scaledMapWidth / 2);
    let topLeftPixelY = centerPixelY - (scaledMapHeight / 2);

    // find delta between left and right longitudes
    let minLng = this.pixelSpaceXToLongitude(topLeftPixelX);
    let maxLng = this.pixelSpaceXToLongitude(topLeftPixelX + scaledMapWidth);
    let longitudeDelta = maxLng - minLng;

    // find delta between top and bottom latitudes
    let minLat = this.pixelSpaceYToLatitude(topLeftPixelY);
    let maxLat = this.pixelSpaceYToLatitude(topLeftPixelY + scaledMapHeight);
    let latitudeDelta = -1 * (maxLat - minLat);

    // create and return the lat/lng span
    return {
      latitudeDelta,
      longitudeDelta
    };
  }

}
