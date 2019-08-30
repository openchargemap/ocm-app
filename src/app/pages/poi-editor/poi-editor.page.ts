import { Component, OnInit } from '@angular/core';
import { POIDetails, OperatorInfo, ConnectionType } from '../../model/CoreDataModel';
import { AppManager } from '../../services/AppManager';
import { NavController, ModalController, Events } from '@ionic/angular';
import { Mapping } from '../../services/mapping/Mapping';
import { IMapProvider, MapOptions } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapBox';
import { Logging } from '../../services/Logging';
import { HttpClient } from '@angular/common/http';
import { GeoLatLng, GeoPosition } from '../../model/AppModels';

@Component({
  selector: 'app-poi-editor',
  templateUrl: './poi-editor.page.html',
  styleUrls: ['./poi-editor.page.css'],
})
export class PoiEditorPage implements OnInit {

  item: POIDetails;

  public startPos: GeoLatLng;

  mapService: IMapProvider;

  selectedTab: string = 'location';

  constructor(private appManager: AppManager, private modalController: ModalController,
    public mapping: Mapping, private events: Events, private logging: Logging, private http: HttpClient) {

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

    // add a default connection
    this.addConnection();
  }

  get operators(): Array<OperatorInfo> {
    return this.appManager.referenceDataManager.getNetworkOperators();
  }

  get connectionTypes(): Array<ConnectionType> {
    return this.appManager.referenceDataManager.getConnectionTypes();
  }

  /* this.usageTypes = this.appManager.referenceDataManager.getUsageTypes(this.filterByCountryPref);
 this.statusTypes = this.appManager.referenceDataManager.getStatusTypes(this.filterByCountryPref);
 this.connectionTypes = this.appManager.referenceDataManager.getConnectionTypes(this.filterByCountryPref);
 */

  ngOnInit() {
    this.mapService = new MapBoxMapProvider(this.events, this.logging, this.http);
    this.mapService.initAPI();


  }

  ionViewDidEnter() {

    this.mapService.initMap("edit-map", new MapOptions(), null);

    if (this.item.ID == -1) {

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
      }


      this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));

    }



  }

  getAddressForCurrentLatLng() {
    if (this.item.AddressInfo.Latitude && this.item.AddressInfo.Longitude) {
      // now resolve an address
      this.mapService.placeSearch(null, this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude).then(results => {
        if (results.length > 0) {
          this.item.AddressInfo.AddressLine1 = results[0].Address;
        }
      });
    }
  }

  addConnection() {
    this.item.Connections.push({
      ID: -1, ConnectionTypeID: null, StatusTypeID: null, PowerKW: 0, Quantity: 1
    });
  }

  async save() {

    try {
      await this.appManager.submitPOI(this.item);

      this.appManager.showToastNotification("You submission wil be reviewed (if required) and published shortly.");
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
