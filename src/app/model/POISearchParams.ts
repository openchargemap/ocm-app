
/**
 * API filter parameters
 * */
export class POISearchParams {

    public poiIdList: Array<number> = null;
    public countryCode: string = null;
    public latitude: number = null;
    public longitude: number = null;
    public locationTitle: string = null;
    public distance: number = null;
    public distanceUnit: string = null;
    public connectionTypeIdList: Array<number> = null;
    public operatorIdList: Array<number> = null;
    public levelIdList: Array<number> = null;
    public countryIdList: Array<number> = null;
    public usageTypeIdList: Array<number> = null;
    public statusTypeIdList: Array<number> = null;
    public minPowerKW: number = null;
    public maxPowerKW: number = null;

    public submissionStatusTypeIdList: Array<number> = null;

    public maxResults: number = 500;
    public additionalParams: string = null;
    public includeComments: boolean = false;
    public compact: boolean = true;
    public enableCaching: boolean = true; // FIXME: need way for user to override cached data
    public levelOfDetail: number = 1; // if supplied, will return a random sample of matching results, higher number return less results
    public polyline: string = null; // (lat,lng),(lat,lng),(lat,lng),(lat,lng) or encoded polyline
    public boundingbox: string = null; // (lat,lng),(lat,lng),(lat,lng),(lat,lng)
}
