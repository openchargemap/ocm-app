import { Component, OnInit } from '@angular/core';
import { POIDetails, OperatorInfo, ConnectionType, Country, ConnectionInfo, StatusType, ExtendedPOIDetails, ExtendedAddressInfo } from '../../model/CoreDataModel';
import { AppManager } from '../../services/AppManager';
import { NavController, ModalController, Events } from '@ionic/angular';
import { Mapping } from '../../services/mapping/Mapping';
import { IMapProvider, MapOptions } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapBox';
import { Logging } from '../../services/Logging';
import { HttpClient } from '@angular/common/http';
import { GeoLatLng, GeoPosition, POISearchParams } from '../../model/AppModels';
import { Utils } from '../../core/Utils';
import { POIManager } from '../../services/POIManager';
import { PoiDetails } from '../../components/poi-details/poi-details';

interface ValidationResult {
  isValid: boolean;
  msg: string;
}

@Component({
  selector: 'app-poi-editor',
  templateUrl: './poi-editor.page.html',
  styleUrls: ['./poi-editor.page.scss'],
})
export class PoiEditorPage implements OnInit {

  id: number;
  item: POIDetails;
  conn: ConnectionInfo;
  step: string = "location";

  originalMarkerPos: GeoLatLng;

  public startPos: GeoLatLng;

  mapService: IMapProvider;

  selectedTab: string = 'location';
  suggestedAddress: ExtendedAddressInfo = null;
  suggestedAddressAttribution: string = null;

  useFilteredConnectionTypes: boolean = true;
  useFilteredOperators: boolean = true;

  useQuickAdd: boolean = true;
  templateSites: Array<ExtendedPOIDetails> = [];
  nearbySites: Array<ExtendedPOIDetails> = [];
  selectedTemplatePOI: ExtendedPOIDetails = null;
  debouncedGecode: any;
  mapOptions: MapOptions;

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
        CountryID: 18, // TODO: default to last selected country
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

  get isReadyToSubmit(): boolean {
    return this.validate().isValid;
  }

  ngOnInit() {
    this.mapService = new MapBoxMapProvider(this.events, this.logging, this.http);
    this.mapService.initAPI();

  }
  async previous() {
    if (this.step == 'operator') {
      this.step = 'poi-nearby';
      await this.refreshNearbySites();
      if (this.nearbySites.length > 0) {
        return;
      }
    }

    if (this.step == 'poi-nearby') {
      this.step = 'location';
    }
  }
  async next() {
    if (this.step == 'location') {

      if (this.suggestedAddress) {
        this.useSuggestedAddress();
      }

      // check if there are any nearby sites already, if so user has to confirm they are not adding a duplicate
      this.step = 'poi-nearby';
      await this.refreshNearbySites();

      if (this.nearbySites.length > 0) {
        return;
      }
    }

    if (this.step == 'poi-nearby') {
      this.step = 'operator';
      await this.refreshTemplateSites();
    }
  }

  ionViewDidEnter() {

    this.mapOptions = new MapOptions();

    // listen for map centre moves and use the new position
    this.mapOptions.onMapMoveCompleted = () => {
      this.mapService.getMapCenter().subscribe((pos) => {
        if (pos) {
          this.item.AddressInfo.Latitude = pos.coords.latitude;
          this.item.AddressInfo.Longitude = pos.coords.longitude;

          this.getAddressForCurrentLatLng();
        }
      });
    };



    if (this.id != null) {

      this.editExistingPOI(this.id);

    }
    else {


      let lastOperatorId = localStorage.getItem("_editor-operatorid");
      if (lastOperatorId) {
        this.item.OperatorID = parseInt(lastOperatorId);
      }

      this.mapService.initMap("edit-map", this.mapOptions, null);

      // add new
      if (this.startPos) {
        this.item.AddressInfo.Latitude = this.startPos.latitude;
        this.item.AddressInfo.Longitude = this.startPos.longitude;

        // this.getAddressForCurrentLatLng();
      } else {
        // set lat/long from current map center
        if (this.mapping) {
          this.mapping.getMapCenter().subscribe(p => {
            if (p) {
              this.item.AddressInfo.Latitude = p.coords.latitude;
              this.item.AddressInfo.Longitude = p.coords.longitude;

              //this.getAddressForCurrentLatLng();

            }
          });
        }

        this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));
      }
    }

    this.refreshFilteredReferenceData();

  }

  async onCountryChange() {
    this.refreshFilteredReferenceData();
  }

  async onOperatorChange() {
    await this.refreshTemplateSites();

    if (this.item.OperatorID) {
      // remember this as the most recently chosen operator
      localStorage.setItem("_editor-operatorid", this.item.OperatorID.toString());
    }
  }

  editFullDetails() {
    this.useQuickAdd = false;
  }

  async getAddressForCurrentLatLng() {
    if (this.item.AddressInfo.Latitude && this.item.AddressInfo.Longitude) {
      // now resolve an address
      this.appManager.api.fetchReverseGeocodeResult(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude).then(results => {
        if (results.AddressInfo) {
          if (results.AddressInfo.CountryID) {
            this.item.AddressInfo.CountryID = results.AddressInfo.CountryID;
          }
          this.suggestedAddress = results.AddressInfo;
        }

      });

      /*return this.mapService.placeSearch(null, this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude).then(results => {
        if (results.length > 0) {
          this.suggestedAddress = results[0].Address;
  
        }
      });*/
    }
  }

  useSuggestedAddress() {
    Object.assign(this.item.AddressInfo, this.suggestedAddress);
    // attribution
    if (this.suggestedAddressAttribution) {
      if (!this.item.MetadataValues.find(a => a.MetadataFieldID == 4)) {
        this.item.MetadataValues.push({ ID: -1, MetadataFieldID: 4, ItemValue: this.suggestedAddressAttribution, MetadataFieldOptionID: null, MetadataFieldOption: null });
      }
    }
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

    this.refreshFilteredReferenceData();
  }

  refreshFilteredReferenceData() {
    // get filtered reference data based on current country selection
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

    // decorate object with expanded relationship properties
    this.appManager.referenceDataManager.hydrateCompactPOI(this.item);
  }

  validate(): ValidationResult {
    // validate
    let validationMsg = null;

    if (this.item.AddressInfo.Title == '') {
      validationMsg = "A location title is required"
    }

    if (!this.item.AddressInfo.CountryID) {
      validationMsg = "A country selection is required";
    }

    if (!this.item.AddressInfo.Latitude || !this.item.AddressInfo.Longitude) {
      validationMsg = "A location latitude and longitude is required";
    }

    if (!this.item.OperatorID) {
      validationMsg = "A Network Operator selection is required";
    }

    if (this.item.Connections.length == 0) {
      validationMsg = "Equipment information is required";
    }

    if (validationMsg) {
      return { isValid: false, msg: validationMsg };
    } else {
      return { isValid: true, msg: null };
    }
  }

  async save() {

    let validationResult = this.validate();

    if (!validationResult.isValid) {
      alert(validationResult.msg);
      return;
    }

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

  /**
   * For the current selected country and network operator, fetch a list of recently added sites to use as a template
   */
  async refreshTemplateSites() {

    if (this.useQuickAdd && this.item.AddressInfo.CountryID && this.item.OperatorID) {
      this.templateSites = [];

      let filter = new POISearchParams();
      filter.countryIdList = [this.item.AddressInfo.CountryID];
      filter.minPowerKW = 1;
      filter.operatorIdList = [this.item.OperatorID];
      filter.maxResults = 10;

      let results = await this.poiManager.fetchPOIList(filter);
      // sort by date
      results.sort((a: ExtendedPOIDetails, b: ExtendedPOIDetails) => {
        return new Date(a.DateCreated).getTime() - new Date(b.DateCreated).getTime();
      });

      this.templateSites = results;
    }
  }

  async refreshNearbySites() {

    if (this.item.AddressInfo.Latitude && this.item.AddressInfo.Longitude) {
      this.nearbySites = [];

      let filter = new POISearchParams();
      filter.latitude = this.item.AddressInfo.Latitude;
      filter.longitude = this.item.AddressInfo.Longitude;
      filter.distance = 5;
      filter.distanceUnit = 'km';
      filter.maxResults = 10;

      let results = await this.poiManager.fetchPOIList(filter);

      // sort by distance
      results.sort((a: ExtendedPOIDetails, b: ExtendedPOIDetails) => {
        return a.Distance - b.Distance;
      });

      this.nearbySites = results;
    }
  }

  changeTemplatePOI() {
    this.selectedTemplatePOI = null;
  }

  editPOI(poi: ExtendedPOIDetails) {
    // user has opted to edit an existing POI
    this.editExistingPOI(poi.ID);
  }

  editExistingPOI(id: number) {
    this.useQuickAdd = false;

    // edit existing
    this.poiManager.getPOIById(id, true).then(poi => {
      this.item = Object.assign({}, poi);

      this.mapService.initMap("edit-map", this.mapOptions, null);

      this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));

      this.refreshFilteredReferenceData();
    });
  }

  useTemplatePOI(source: ExtendedPOIDetails) {

    this.selectedTemplatePOI = source;

    //copy equipment etc
    Object.assign(this.item.Connections, source.Connections);

    // create new connect item IDs etc
    for (let i of this.item.Connections) {
      i.ID = -Utils.getRandomInt(10000);
      i.Reference = null;
      i.Comments = null;
      i.StatusTypeID = null;
    }

    this.item.UsageCost = source.UsageCost;
    this.item.UsageTypeID = source.UsageTypeID;

    // decorate object with expanded relationship properties
    this.appManager.referenceDataManager.hydrateCompactPOI(this.item);
  }
}
