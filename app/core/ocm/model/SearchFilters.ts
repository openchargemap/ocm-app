import {GeoLatLng} from '../mapping/Mapping';

export interface SearchFilters {
    CountryIdLists: Array<number>;
    NetworkOperatorIdList: Array<number>;
    ConnectionTypeIdList: Array<number>;
    DataProviderIdList: Array<number>;
    UsageTypeIdList: Array<number>;
    StatusTypeIdLis: Array<number>;
    Keyword: string;
    SearchPosition: GeoLatLng;
    FollowUserLocation: boolean;
    WebsiteURL: string;
    MinQualityLevel: number;
    MinPowerKW: number;
    MaxPowerKW: number;
    MinLevel: number;
    
    MaxResults: number;
    Distance: number;
    DistanceUnit: string;
    PolyLine: any;
    BoundingBox: any;
    
}


