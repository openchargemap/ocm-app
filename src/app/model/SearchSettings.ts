import {GeoLatLng} from './GeoPosition';


export class SearchSettings {
  OperatorList: Array<number>;
  ConnectionTypeList: Array<number>;
  CountryList: Array<number>;
  UsageTypeList: Array<number>;
  StatusTypeList: Array<number>;
  MinPowerKW: number;
  MaxPowerKW: number;
  UseDistanceInKM: boolean;
  HasActiveFilters: boolean;
  LastSearchPosition: GeoLatLng;
  StartSearchPosition: GeoLatLng;
  Language: string;

  constructor() {
    this.OperatorList = [];
    this.ConnectionTypeList = [];
    this.CountryList = [];
    this.UsageTypeList = [];
    this.StatusTypeList = [];
    this.HasActiveFilters = false;
    //TODO: reference data filtered by country (most popular for given country ids)
  }

  public LoadSettings() {

  }
  public SaveSettings() {

  }

  public CheckForActiveFilters(): boolean {
    if (this.OperatorList.length > 0
      || this.ConnectionTypeList.length > 0
      || this.CountryList.length > 0
      || this.UsageTypeList.length > 0
      || this.StatusTypeList.length > 0
      || this.MinPowerKW > 0
      || this.MaxPowerKW > 0
    ) {
      this.HasActiveFilters = true;
    } else {
      this.HasActiveFilters = false;
    }
    return this.HasActiveFilters;
  }

}
