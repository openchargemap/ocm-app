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

    poiList;
    constructor(private appManager: AppManager) {

    }


    public fetchPOIList(searchParams: POISearchParams) {

        this.appManager.api.fetchPOIListByParam(searchParams, this)
            .subscribe(
            (results) => {
                console.log('fetched POI list:');
                this.poiList = results;
                this.appManager.events.publish('ocm:poiList:updated');
            },

            (reason) => {
                alert(JSON.stringify(reason));
            }
            );
    }
    

    public getPOIById(poiId: number, fetchInfo: boolean = false, skipCached: boolean = false): Observable<any> {

        if (!skipCached) {
            if (this.poiList != null) {
                for (var i = 0; i < this.poiList.length; i++) {
                    if (this.poiList[i].ID == poiId) {
                        //got result locally, wrap result in observable
                        let obs = Observable.create(observer => {
                            observer.next(this.poiList[i]);
                            observer.complete();
                        });
                        return obs;
                    }
                }
            }
        }


        //still not found it, fetch via api
        var params = new POISearchParams();
        params.poiIdList = [poiId];
        return this.appManager.api.fetchPOIListByParam(params, this);
    }



    hydrateCompactPOI(poi: any): Array<any> {

        let refData = this.appManager.referenceDataManager;

        if (poi.DataProviderID != null && poi.DataProvider == null) {
            poi.DataProvider = refData.getDataProviderByID(poi.DataProviderID);
        }
        if (poi.OperatorID != null && poi.OperatorInfo == null) {
            poi.OperatorInfo = refData.getNetworkOperatorByID(poi.OperatorID);
        }
        if (poi.UsageTypeID != null && poi.UsageType == null) {
            poi.UsageType = refData.getUsageTypeByID(poi.UsageTypeID);
        }
        if (poi.AddressInfo.CountryID != null && poi.AddressInfo.Country == null) {
            poi.AddressInfo.Country = refData.getCountryByID(poi.AddressInfo.CountryID);
        }
        if (poi.StatusTypeID != null && poi.StatusType == null) {
            poi.StatusType = refData.getStatusTypeByID(poi.StatusTypeID);
        }
        if (poi.SubmissionStatusTypeID != null && poi.SubmissionStatusType == null) {
            poi.SubmissionStatusType = refData.getSubmissionStatusTypesByID(poi.SubmissionStatusTypeID);
        }

        //TODO:  MediaItems,
        if (poi.Connections != null) {
            for (var c = 0; c < poi.Connections.length; c++) {
                var conn = poi.Connections[c];
                if (conn.ConnectionTypeID != null && conn.ConnectionType == null) {
                    conn.ConnectionType = refData.getConnectionTypeByID(conn.ConnectionTypeID);
                }
                if (conn.LevelID != null && conn.Level == null) {
                    conn.Level = refData.getChargingLevelTypeByID(conn.LevelID);
                }
                if (conn.CurrentTypeID != null && conn.CurrentTypeID == null) {
                    conn.CurrentType = refData.getOutputCurrentTypeByID(conn.CurrentTypeID);
                }
                if (conn.StatusTypeID != null && conn.StatusTypeID == null) {
                    conn.StatusTypeID = refData.getStatusTypeByID(conn.StatusTypeID);
                }

                poi.Connections[c] = conn;
            }
        }

        if (poi.UserComments != null) {
            for (var c = 0; c < poi.UserComments.length; c++) {
                var comment = poi.UserComments[c];
                if (comment.CommentType != null && comment.CommentTypeID == null) {
                    comment.CommentType = refData.getCommentTypeByID(conn.CommentTypeID);
                }
                if (comment.CheckinStatusType != null && comment.CheckinStatusTypeID == null) {
                    comment.CheckinStatusTypeID = refData.getCheckinStatusTypeByID(conn.CheckinStatusTypeID);
                }
                poi.UserComments[c] = comment;
            }
        }

        return poi;
    }

    // for a given list of POIs expand navigation properties (such as AddresssInfo.Country, Connection[0].ConnectionType etc)
    hydrateCompactPOIList(poiList: Array<any>) {
        for (var i = 0; i < poiList.length; i++) {
            poiList[i] = this.hydrateCompactPOI(poiList[i]);
        }
        return poiList;
    }

}