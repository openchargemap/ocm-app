import { Events } from '@ionic/angular';
import { Logging, LogLevel } from './Logging';
/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/
import { Injectable, Inject } from '@angular/core';
import { POISearchParams } from '../model/AppModels';
import { APIClient } from './APIClient';

@Injectable({
  providedIn: 'root',
})
export class POIManager {

  poiList: any[];
  isRequestInProgress: boolean = false;

  constructor(public api: APIClient, public events: Events, public logging: Logging) {

  }

  public fetchPOIList(searchParams: POISearchParams) {

    this.isRequestInProgress = true;

    return this.api.fetchPOIListByParam(searchParams).then((results: []) => {
      this.isRequestInProgress = false;
      if (results && results.length) this.logging.log('fetched POI list [' + results.length + ']');
      this.poiList = results;
      this.events.publish('ocm:poiList:updated');
    }, (rejected) => {
      this.isRequestInProgress = false;

    });
  }

  public clearResults() {
    this.poiList = [];
    this.events.publish('ocm:poiList:cleared');
    this.logging.log('clearing results after settings change', LogLevel.VERBOSE);
  }

  async getPOIById(poiId: number, fetchInfo: boolean = false, skipCached: boolean = false): Promise<any> {

    if (!skipCached) {
      if (this.poiList != null) {
        const result = this.poiList.find(p => p.ID == poiId);
        if (result) {
          return result;
        }
      }
    }

    // still not found it, fetch via api
    const params = <POISearchParams>{
      poiIdList: [poiId],
      enableCaching: !skipCached
    };

    const results = await this.api.fetchPOIListByParam(params);

    if (results && results.length > 0) {

      if (this.poiList && results[0].ID == poiId) {
        // refresh info in poi list: discard item from list and push it back into list
        this.poiList = this.poiList.filter(p => p.ID != poiId);
        this.poiList.push(results[0]);
        this.logging.log('POI refreshed in cache ' + poiId);
      }

      return results[0];
    } else {
      return null;
    }
  }
}
