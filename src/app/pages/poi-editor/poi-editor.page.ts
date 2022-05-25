import { Component, OnInit, ViewChild } from '@angular/core';
import { POIDetails, OperatorInfo, ConnectionType, Country, ConnectionInfo, StatusType, ExtendedPOIDetails, ExtendedAddressInfo, UsageType } from '../../model/CoreDataModel';
import { AppManager } from '../../services/AppManager';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { GeoLatLng, POISearchParams } from '../../model/AppModels';
import { Utils } from '../../core/Utils';
import { POIManager } from '../../services/POIManager';
import { Mapping } from '../../services/mapping/Mapping';
import { PoiLocationEditorComponent } from '../../components/poi-location-editor/poi-location-editor';
import { PoiEquipmentEditorComponent } from '../../components/poi-equipment-editor/poi-equipment-editor';
import { StandardStatusTypes, StandardOperators } from '../../model/StandardEnumTypes';

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

  /*
   * The 'step' defines the granular part of the workflow we're at in the process
   */
  step: 'location' | 'poi-nearby' | 'copy-equipment' | 'edit-equipment' | 'info';

  /**
   * Defines the overall UI grouping for our current step
   */
  selectedTab: 'location' | 'equipment' | 'info';


  startPos: GeoLatLng;
  useFilteredConnectionTypes: boolean = true;

  templateSites: Array<ExtendedPOIDetails> = [];
  nearbySites: Array<ExtendedPOIDetails> = [];
  selectedTemplatePOI: ExtendedPOIDetails = null;

  suggestedAddress: ExtendedAddressInfo = null;
  suggestedAddressAttribution: string = null;

  isNonDuplicateConfirmed: boolean = false;
  skipPOICopy: boolean = false;

  validationMsg: string = null;

  loading: any;

  @ViewChild(PoiLocationEditorComponent, { static: false })
  private editorMap: PoiLocationEditorComponent;

  get countries(): Array<Country> {
    return this.appManager.referenceDataManager.getCountries();
  }

  get usageTypes(): Array<UsageType> {
    return this.appManager.referenceDataManager.getUsageTypes();
  }

  get statusTypes(): Array<StatusType> {
    return this.appManager.referenceDataManager.getStatusTypes().filter(s => {
      return s.IsUserSelectable == true;
    });
  }

  get isAddMode(): boolean {

    if (this.item.ID <= 0) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private appManager: AppManager,
    private modalController: ModalController,
    private poiManager: POIManager,
    public mapping: Mapping,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {

    this.initNewItem();

  }

  initNewItem() {
    this.item = {
      ID: -1,
      DataProviderID: 1,
      DataProvidersReference: null,
      OperatorsReference: null,
      OperatorID: 1,
      UsageCost: null,
      UsageTypeID: 4, // public - membership required
      NumberOfPoints: 1,
      GeneralComments: null,
      DatePlanned: null,
      StatusTypeID: 50, // operational
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
    this.step = 'location';
    this.selectedTab = 'location';
  }

  get isReadyToSubmit(): boolean {

    // true if basic validation has passed and we are at last step of workflow
    return this.validate().isValid && this.step == 'info';
  }


  ngOnInit() {

  }

  async presentLoadingUI() {
    // if (!this.loading) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait..'
    });
    // }

    await this.loading.present();
  }

  async dismissLoadingUI() {
    if (this.loading) { await this.loading.dismiss(); }
  }

  ionViewDidEnter() {

    if (this.id != null) {

      this.editExistingPOI(this.id);

    } else {
      // adding new POI
      let lastOperatorId = localStorage.getItem("_editor-operatorid");
      if (lastOperatorId) {
        this.item.OperatorID = parseInt(lastOperatorId, 10);
      }

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

              // this.getAddressForCurrentLatLng();

            }
          });
        }

        // this.mapService.setMapCenter(new GeoPosition(this.item.AddressInfo.Latitude, this.item.AddressInfo.Longitude));
      }
    }

    /* if (!this.operatorCache || this.operatorCache.length == 0) {
       this.operatorCache = this.appManager.referenceDataManager.getNetworkOperators(false);
     }*/

    this.refreshFilteredReferenceData();

  }

  async previous() {

    switch (this.step) {
      case 'info':
        this.step = 'edit-equipment';
        break;
      case 'edit-equipment':
        this.step = this.isAddMode ? 'copy-equipment' : 'location';
        break;
      case 'copy-equipment':
        this.step = 'location';
        break;
      case 'poi-nearby':
        this.step = 'location';
        break;
    }

    await this.initCurrentStep(false);

  }

  async next() {


    if (this.step == 'poi-nearby' && this.nearbySites.length > 0 && !this.isNonDuplicateConfirmed) {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: 'Please confirm you are not adding a duplicate site.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {

            }
          }, {
            text: 'Confirm',
            handler: () => {
              this.isNonDuplicateConfirmed = true;
              this.next();
            }
          }
        ]
      });

      alert.present();
      return;
    }

    const validation = this.validate(this.step);
    if (validation.isValid) {

      switch (this.step) {
        case 'location':
          this.step = this.isAddMode ? 'poi-nearby' : 'edit-equipment';
          break;
        case 'poi-nearby':
          this.step = this.isAddMode ? 'copy-equipment' : 'edit-equipment';
          break;
        case 'copy-equipment':
          this.step = 'edit-equipment';
          break;
        case 'edit-equipment':
          this.step = 'info';
          break;
      }

      await this.initCurrentStep(true);
    } else {
      const a = await this.alertController.create({ message: validation.msg });
      a.present();
    }
  }

  async initCurrentStep(isNextDirection: boolean) {

    if (this.step == 'poi-nearby') {
      // check if there are any nearby sites already, if so user has to confirm they are not adding a duplicate
      this.selectedTab = 'location';
      const siteNum = await this.refreshNearbySites();

      // if no poi nearby, skip to next/previous step as required
      if (siteNum == 0) {
        isNextDirection ? await this.next() : await this.previous();
      }
    } else if (this.step == 'location') {
      this.selectedTab = 'location';
    } else if (this.step == 'copy-equipment') {
      this.selectedTab = 'equipment';

      // this.selectedOperator = this.operatorCache.find(o => o.ID == this.item.OperatorID);

      await this.refreshTemplateSites();
    } else if (this.step == 'edit-equipment') {
      this.selectedTab = 'equipment';
    } else if (this.step == 'info') {
      this.selectedTab = 'info';
    }
  }

  async onCountryChange() {
    this.refreshFilteredReferenceData();
  }

  async onOperatorChange(operatorInfo: OperatorInfo = null) {

    if (operatorInfo != null) {
      if (this.item.OperatorID != operatorInfo.ID) {

        this.item.OperatorID = operatorInfo.ID;

        // remember this as the most recently chosen operator
        localStorage.setItem("_editor-operatorid", this.item.OperatorID.toString());

        await this.refreshTemplateSites();
      }
    }

  }

  useSuggestedAddress($evt = null) {
    if ($evt) {
      this.suggestedAddress = $evt.suggestedAddress;
      this.suggestedAddressAttribution = $evt.suggestedAddressAttribution;
    }

    Object.assign(this.item.AddressInfo, this.suggestedAddress);
    // attribution
    if (this.suggestedAddressAttribution) {
      if (!this.item.MetadataValues.find(a => a.MetadataFieldID == 4)) {
        this.item.MetadataValues.push({ ID: -1, MetadataFieldID: 4, ItemValue: this.suggestedAddressAttribution, MetadataFieldOptionID: null, MetadataFieldOption: null });
      }
    }
  }

  async editConnection(c: ConnectionInfo) {
    const source = this.item.Connections.find(f => f.ID == c.ID);

    const item = Object.assign({}, source);
    const modal = await this.modalController.create({
      component: PoiEquipmentEditorComponent,
      componentProps: { conn: item }
    });

    modal.onWillDismiss().then((result: any) => {
      if (result && result.data && result.data.item) {
        this.updateConnection(result.data.item);
      }
    });

    return await modal.present();
  }

  async deleteConnection(c: ConnectionInfo) {
    const source = this.item.Connections.find(f => f.ID == c.ID);

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this connection information?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            // delete item
            this.item.Connections = this.item.Connections.filter(f => f.ID != source.ID);
            this.appManager.referenceDataManager.hydrateCompactPOI(this.item, true);
          }
        }
      ]
    });

    alert.present();
  }

  async addConnection() {

    // TODO: depending on the country, there may be a good default e.g. Type 2 32 amp 230V AC.

    const item = {
      ID: -Utils.getRandomInt(10000),
      ConnectionTypeID: null,
      StatusTypeID: 50, //  operational
      PowerKW: null,
      Quantity: 1
    };

    const modal = await this.modalController.create({
      component: PoiEquipmentEditorComponent,
      componentProps: { conn: item }
    });

    modal.onWillDismiss().then((result: any) => {
      if (result && result.data && result.data.item) {
        this.updateConnection(result.data.item);
      }
    });

    return await modal.present();

    // this.refreshFilteredReferenceData();
  }

  refreshFilteredReferenceData() {
    // get filtered reference data based on current country selection
    this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, { CountryIds: [this.item.AddressInfo.CountryID] });
  }

  updateConnection(conn: ConnectionInfo) {
    // once the current connection info item has been edited, add or update it in the list
    if (conn) {
      let update = this.item.Connections.find(f => f.ID == conn.ID);
      if (update) {
        Object.assign(update, conn);
      } else {
        // add new
        this.item.Connections.push(conn);
      }
    }

    // decorate object with expanded relationship properties
    this.appManager.referenceDataManager.hydrateCompactPOI(this.item, true);
  }

  validate(step: string = 'all'): ValidationResult {
    // validate
    let validationMsg = null;

    if (step == 'all' || step == 'location') {

      // location info
      if (!this.item.AddressInfo.Latitude || !this.item.AddressInfo.Longitude) {
        validationMsg = "Location is required";
      }

      if (this.item.AddressInfo.Title == '') {
        validationMsg = "A location title is required";
      }

      if (!this.item.AddressInfo.AddressLine1 && !this.item.AddressInfo.AddressLine2) {
        validationMsg = "An approximate address is required.";
      }

      if (!this.item.AddressInfo.CountryID) {
        validationMsg = "A country selection is required";
      }

      if (!this.item.AddressInfo.Latitude || !this.item.AddressInfo.Longitude) {
        validationMsg = "A location latitude and longitude is required";
      }
    }

    if (step == 'all' || step == 'poi-nearby') {
      // poi's nearby
      if (this.nearbySites.length > 0 && !this.isNonDuplicateConfirmed) {
        validationMsg = "Please confirm that the site is not a duplicate";
      }
    }

    if (step == 'all' || step == 'equipment') {

      if (!this.item.OperatorID) {
        validationMsg = "Please confirm the charging network or equipment operator.";
      }

      if (this.item.Connections.length == 0) {
        validationMsg = "Equipment information is required";
      }
    }

    // TODO: status, usage type, submission status

    if (validationMsg) {
      this.validationMsg = validationMsg;
      return { isValid: false, msg: validationMsg };
    } else {
      this.validationMsg = null;
      return { isValid: true, msg: null };
    }
  }

  async save() {

    let validationResult = this.validate();

    if (!validationResult.isValid) {
      alert(validationResult.msg);
      return;
    }

    await this.presentLoadingUI();
    try {
      await this.appManager.submitPOI(this.item);

      await this.dismissLoadingUI();

      this.appManager.showToastNotification("You submission will be reviewed (if required) and published shortly.");

      this.modalController.dismiss();
    } catch (err) {
      await this.dismissLoadingUI();
      if (err.error) {
        alert("Sorry, your submission could not be completed at this time. Please try again later.");
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

    if (this.item.AddressInfo.CountryID && this.item.OperatorID) {

      await this.presentLoadingUI();

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

      this.dismissLoadingUI();
    }
  }

  /**
   * Fetch list of POis dear the currently set location, return numbers of results
   * */
  async refreshNearbySites(): Promise<number> {

    if (this.item.AddressInfo.Latitude && this.item.AddressInfo.Longitude) {
      await this.presentLoadingUI();

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

      this.dismissLoadingUI();
      return results.length;
    } else {
      return 0;
    }
  }

  confirmNonDuplicate() {
    this.isNonDuplicateConfirmed = true;
    this.next();
  }

  changeTemplatePOI() {
    this.selectedTemplatePOI = null;
  }

  editPOI(poi: ExtendedPOIDetails) {
    // user has opted to edit an existing POI
    this.editExistingPOI(poi.ID);
  }

  async editExistingPOI(id: number) {

    this.skipPOICopy = true;
    this.isNonDuplicateConfirmed = true;

    await this.presentLoadingUI();

    // edit existing
    this.poiManager.getPOIById(id, true, true).then(poi => {
      this.item = Object.assign({}, poi);

      if (this.item.OperatorID == null) {
        this.item.OperatorID = StandardOperators.UnknownOperator;
      }
      this.refreshFilteredReferenceData();

      this.dismissLoadingUI();

    });
  }

  /**
   * For a given POI, copy the equipment and usage details to the item currently being edited
   * @param source POI detail to copy
   */
  useTemplatePOI(source: ExtendedPOIDetails) {

    this.selectedTemplatePOI = source;

    // copy equipment etc
    Object.assign(this.item.Connections, source.Connections);

    // create new connect item IDs etc
    for (let i of this.item.Connections) {
      i.ID = -Utils.getRandomInt(10000);
      i.Reference = null;
      i.Comments = null;
      i.StatusTypeID = StandardStatusTypes.Operational;
    }

    this.item.UsageCost = source.UsageCost;
    this.item.UsageTypeID = source.UsageTypeID;

    // decorate object with expanded relationship properties
    this.appManager.referenceDataManager.hydrateCompactPOI(this.item);
  }

  skipCopyingPOI() {
    this.skipPOICopy = true;
  }
}
