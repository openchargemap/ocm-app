/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import {AppManager} from './AppManager';
import {Injectable, Inject} from '@angular/core';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Base, LogLevel} from '../Base';
import {POISearchParams} from '../Model/AppModels';
import {APIClient} from './APIClient';
import {ReferenceDataManager} from './ReferenceDataManager';

@Injectable()
export class POIManager extends Base {

    poiList;
    isRequestInProgress:boolean=false;
    
    constructor(private api:APIClient, private events:Events, private referenceDataManager:ReferenceDataManager) {
        super();
    }


    public fetchPOIList(searchParams: POISearchParams) {

        this.isRequestInProgress = true;
        this.api.fetchPOIListByParam(searchParams, this)
            .subscribe(
            (results:Array<any>) => {
                console.log('fetched POI list ['+results.length+']');
                this.poiList = results;
                this.events.publish('ocm:poiList:updated');
                //this.appManager.isRequestInProgress = false;
            },

            (reason) => {
                //alert(JSON.stringify(reason));
                this.isRequestInProgress = false;
            }
            );
    }

    public clearResults() {
        this.poiList = [];
        this.events.publish('ocm:poiList:cleared');
        this.log('clearing results after settings change', LogLevel.VERBOSE);
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
        return this.api.fetchPOIListByParam(params, this);
    }



    hydrateCompactPOI(poi: any): Array<any> {

        let refData = this.referenceDataManager;

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
                if (conn.CurrentTypeID != null && conn.CurrentType == null) {
                    conn.CurrentType = refData.getOutputCurrentTypeByID(conn.CurrentTypeID);
                }
                if (conn.StatusTypeID != null && conn.StatusType == null) {
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