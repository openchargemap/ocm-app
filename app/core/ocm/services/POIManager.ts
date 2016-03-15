/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {AppManager} from './AppManager';
import {Injectable} from 'angular2/core';

export class POISearchParams {
    constructor() { }
    public countryCode: string = null;
    public latitude: number = null;
    public longitude: number = null;
    public locationTitle: string = null;
    public distance: number = null;
    public distanceUnit: string = null;
    public connectionTypeID: number = null;
    public operatorID: number = null;
    public levelID: number = null;
    public countryID: number = null;
    public usageTypeID: number = null;
    public statusTypeID: number = null;
    public minPowerKW: number = null;

    public submissionStatusTypeID: number = null;

    public maxResults: number = 1000;
    public additionalParams: string = null;
    public includeComments: boolean = false;
    public compact: boolean = true;
    public enableCaching: boolean = true; //FIXME: need way for user to override cached data
    public levelOfDetail: number = 1; //if supplied, will return a random sample of matching results, higher number return less results
    public polyline: string = null; //(lat,lng),(lat,lng),(lat,lng),(lat,lng) or encoded polyline
    public boundingbox: string = null;//(lat,lng),(lat,lng),(lat,lng),(lat,lng)
}

export interface ConnectionInfo {
    ID: number;
    Reference: string;
    ConnectionType: any;
    StatusType: any;
    Level: any;
    CurrentType: any;
    Amps: number;
    Voltage: number;
    PowerKW: number;
    Quantity: number;
    Comments?: string;
};

@Injectable()

export class POIManager {
    poiList: any;
    appManager: AppManager;

    constructor(appManager: AppManager) {
        this.appManager = appManager;
        //this.populateTestData();
    }

    fetchCoreReferenceData() {
        return this.appManager.api.fetchCoreReferenceData(null);
    }

    fetchPOIList(searchParams: POISearchParams) {

        var r = this.appManager.api.fetchPOIListByParam(searchParams).then((results) => {
            this.poiList = results;
            this.appManager.events.publish('ocm:poiList:updated');
        });


        /*.then(
            // Log the fulfillment value
            function(val) {
                console.log(val);
               
            })
            .catch(
            // Log the rejection reason
            function(reason) {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
            */
    }
}