import { GeoLatLng } from "./GeoPosition";
import { MapType } from "../services/mapping/interfaces/mapping";

export const MAX_POWER: number = 1000;

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
  StartViewPoiId: number;
  Language: string;
  FilterOptionsByCountryId: number;
  MapType: MapType;
  EnableAdvancedEditorFeatures: boolean;
  EnablePOIPendingApproval: boolean;
  MaxResults: number;

  constructor() {
    this.OperatorList = [];
    this.ConnectionTypeList = [];
    this.CountryList = [];
    this.UsageTypeList = [];
    this.StatusTypeList = [];
    this.MaxPowerKW = null;
    this.MinPowerKW = null;
    this.HasActiveFilters = false;

    this.FilterOptionsByCountryId = null;
    this.UseDistanceInKM = true;
    this.MapType = "ROADMAP";
    this.EnableAdvancedEditorFeatures = false;
    this.EnablePOIPendingApproval = false;
    this.MaxResults = 500;
  }

  public LoadSettings() { }

  public SaveSettings() { }

  public ClearActiveFilters() {
    this.OperatorList = [];
    this.ConnectionTypeList = [];
    this.CountryList = [];
    this.UsageTypeList = [];
    this.StatusTypeList = [];
    this.MinPowerKW = null;
    this.MaxPowerKW = null;
  }

  public CheckForActiveFilters(): boolean {
    if (
      this.OperatorList.length > 0 ||
      this.ConnectionTypeList.length > 0 ||
      this.CountryList.length > 0 ||
      this.UsageTypeList.length > 0 ||
      this.StatusTypeList.length > 0 ||
      this.MinPowerKW > 0 ||
      this.MaxPowerKW > 0 ||
      (this.MaxPowerKW != null && this.MaxPowerKW < MAX_POWER)
    ) {
      this.HasActiveFilters = true;
    } else {
      this.HasActiveFilters = false;
    }
    return this.HasActiveFilters;
  }
}
