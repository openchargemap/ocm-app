/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {AppManager} from './AppManager';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

export class POISearchParams {
    constructor() { }

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

    public submissionStatusTypeIdList: Array<number> = null;

    public maxResults: number = 500;
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

    getPOIById(poiId: number, fetchInfo:boolean=false):Observable<any> {
        if (this.poiList != null) {
            for (var i = 0; i < this.poiList.length; i++) {
                if (this.poiList[i].ID == poiId) {
                    //wrap result in observable
                    let obs = Observable.create(observer => {
                        observer.next(this.poiList[i]);
                        observer.complete();
                    });
                    return obs;
                }
            }
        }    

                  
        //still not found it, fetch via api
        var params = new POISearchParams();
        params.poiIdList = [poiId];
        return this.appManager.api.fetchPOIListByParam(params, true);
    }
}