import { Logging, LogLevel } from './Logging';
/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/
import { AppManager } from './AppManager';
import { Injectable, Inject } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { POISearchParams } from '../Model/AppModels';
import { APIClient } from './APIClient';
import { ReferenceDataManager } from './ReferenceDataManager';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class POIManager {

    poiList;
    isRequestInProgress: boolean = false;

    constructor(public api: APIClient, public events: Events, public logging: Logging) {

    }


    public fetchPOIList(searchParams: POISearchParams): Promise<any> {

        this.isRequestInProgress = true;

        return  this.api.fetchPOIListByParam(searchParams).toPromise().then(
            (results: Array<any>) => {
                this.logging.log('fetched POI list [' + results.length + ']');
                this.poiList = results;
                this.events.publish('ocm:poiList:updated');
                //this.appManager.isRequestInProgress = false;
            },

            (reason) => {

                this.isRequestInProgress = false;
                
            }
        );

       
    }

    public clearResults() {
        this.poiList = [];
        this.events.publish('ocm:poiList:cleared');
        this.logging.log('clearing results after settings change', LogLevel.VERBOSE);
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
        var params = <POISearchParams>{
            poiIdList: [poiId]
        }


        return this.api.fetchPOIListByParam(params).map((res) => {
            return res[0];
        });
    }
}