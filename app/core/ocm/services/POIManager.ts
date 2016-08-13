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
import {Subscription} from 'rxjs/Subscription';
@Injectable()
export class POIManager extends Base {

    poiList;
    isRequestInProgress: boolean = false;

    constructor(private api: APIClient, private events: Events) {
        super();
    }


    public fetchPOIList(searchParams: POISearchParams): Observable<any> {

        this.isRequestInProgress = true;
        let poiFetchObservable = this.api.fetchPOIListByParam(searchParams);

        poiFetchObservable.subscribe(
            (results: Array<any>) => {
                console.log('fetched POI list [' + results.length + ']');
                this.poiList = results;
                this.events.publish('ocm:poiList:updated');
                //this.appManager.isRequestInProgress = false;
            },

            (reason) => {

                this.isRequestInProgress = false;
                Observable.throw(reason);

            }
        );

        return poiFetchObservable;
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
        var params = <POISearchParams>{
            poiIdList: [poiId]
        }


        return this.api.fetchPOIListByParam(params).map((res) => {
            return res[0];
        });
    }
}