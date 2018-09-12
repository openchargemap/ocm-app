import {GeoLatLng} from './GeoPosition';

export interface SearchFilters {
    CountryIds: Array<number>;
    NetworkOperatorIds: Array<number>;
    ConnectionTypeIds: Array<number>;
    DataProviderIds: Array<number>;
    UsageTypeIds: Array<number>;
    StatusTypeIds: Array<number>;

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


