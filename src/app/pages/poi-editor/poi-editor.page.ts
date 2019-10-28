import { Component, OnInit } from '@angular/core';
import { POIDetails, OperatorInfo, ConnectionType, Country, ConnectionInfo, StatusType } from '../../model/CoreDataModel';
import { AppManager } from '../../services/AppManager';
import { NavController, ModalController, Events } from '@ionic/angular';
import { Mapping } from '../../services/mapping/Mapping';
import { IMapProvider, MapOptions } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapBox';
import { Logging } from '../../services/Logging';
import { HttpClient } from '@angular/common/http';
import { GeoLatLng, GeoPosition } from '../../model/AppModels';
import { Utils } from '../../core/Utils';
import { POIManager } from '../../services/POIManager';

@Component({
  selector: 'app-poi-editor',
  templateUrl: './poi-editor.page.html',
  styleUrls: ['./poi-editor.page.css'],
})
export class PoiEditorPage implements OnInit {

  id: number;
  item: POIDetails;
  conn: ConnectionInfo;

  originalMarkerPos: GeoLatLng;

  public startPos: GeoLatLng;

  mapService: IMapProvider;

  selectedTab: string = 'location';
  suggestedAddress: string = '';

  useFilteredConnectionTypes: boolean = true;
  useFilteredOperators: boolean = true;

  constructor(
    private appManager: AppManager,
    private modalController: ModalController,
    public mapping: Mapping,
    private events: Events,
    private logging: Logging,
    private http: HttpClient,
    private poiManager: POIManager
  ) {

    this.item = {
      ID: -1,
      DataProviderID: 1,
      DataProvidersReference: null,
      OperatorsReference: null,
      OperatorID: null,
      UsageCost: null,
      UsageTypeID: null,
      NumberOfPoints: null,
      GeneralComments: null,
      DatePlanned: null,
      StatusTypeID: null,
      SubmissionStatusTypeID: null,
      Connections: [],
      MetadataValues: [],
      AddressInfo: {
        ID: -1,
        CountryID: null,
        Title: '',
        AddressLine1: '',
        Latitude: 0,
        Longitude: 0
      }
    };

  }

  get operators(): Array<OperatorInfo> {
    return this.appManager.referenceDataManager.getNetworkOperators(this.useFilteredOperators);
  }

  get connectionTypes(): Array<ConnectionType> {
    return this.appManager.referenceDataManager.getConnectionTypes(this.useFilteredConnectionTypes);
  }

  get currentTypes(): Array<ConnectionType> {
    return this.appManager.referenceDataManager.getOutputCurrentTypes();
  }

  get statusTypes(): Array<StatusType> {
    return this.appManager.referenceDataManager.getStatusTypes();
  }

  get countries(): Array<Country> {
    return this.appManager.referenceDataManager.getCountries();
  }

  ngOnInit() {
    this.mapService = new MapBoxMapProvider(this.events, this.logging, this.http);
    this.mapService.initAPI();

  }

  ionViewDidEnter() {

    this.mapService.initMap("edit-map", new MapOptions(), null);

    if (this.id != null) {
      // edit existing
      this.poiManager.getPOIById(this.id, true).then(poi => {
        this.item = Object.assign({}, poi);

        this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));
      });
    }
    else {
      // add new
      if (this.startPos) {
        this.item.AddressInfo.Latitude = this.startPos.latitude;
        this.item.AddressInfo.Longitude = this.startPos.longitude;

        this.getAddressForCurrentLatLng();
      } else {
        // set lat/long from current map center
        if (this.mapping) {
          this.mapping.getMapCenter().subscribe(p => {
            if (p) {
              this.item.AddressInfo.Latitude = p.coords.latitude;
              this.item.AddressInfo.Longitude = p.coords.longitude;

              this.getAddressForCurrentLatLng();

            }
          });
        }


        this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));
      }
    }


  }

  getAddressForCurrentLatLng() {
    if (this.item.AddressInfo.Latitude && this.item.AddressInfo.Longitude) {
      // now resolve an address
      this.mapService.placeSearch(null, this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude).then(results => {
        if (results.length > 0) {
          this.suggestedAddress = results[0].Address;

        }
      });
    }
  }

  useSuggestedAddress() {
    this.item.AddressInfo.AddressLine1 = this.suggestedAddress;
  }

  editConnection(id) {
    const source = this.item.Connections.find(f => f.ID == id);
    this.conn = Object.assign({}, source);
  }

  cancelEditConnection() {
    this.conn = null;
  }

  async addConnection() {
    this.conn = {
      ID: -Utils.getRandomInt(10000),
      ConnectionTypeID: null,
      StatusTypeID: null,
      PowerKW: 0,
      Quantity: 1
    };

    // get filtered reference data
    this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, { CountryIds: [this.item.AddressInfo.CountryID] })
  }

  updateConnection() {
    // once the current connection info item has been edited, add or update it in the list
    if (this.conn) {
      let update = this.item.Connections.find(f => f.ID == this.conn.ID);
      if (update) {
        Object.assign(update, this.conn);
      } else {
        // add new
        this.item.Connections.push(this.conn);
      }

      this.conn = null;
    }

    // decorate object with expenaded relationship properties
    this.appManager.referenceDataManager.hydrateCompactPOI(this.item);
  }

  async save() {

    try {
      await this.appManager.submitPOI(this.item);

      this.appManager.showToastNotification("You submission will be reviewed (if required) and published shortly.");
      this.modalController.dismiss();
    } catch (err) {
      if (err.error) {
        alert(err.error);
      }
    }
  }

  async cancel() {
    this.modalController.dismiss();
  }

}
