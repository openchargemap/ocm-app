/**
* @author Christopher Cook
* @copyright Webprofusion Ltd http://webprofusion.com
*/

import {Injectable} from '@angular/core';
import {Base, LogLevel} from '../Base';
import {AppManager} from './AppManager';
import {Http, Response} from '@angular/http';
import {CoreReferenceData} from '../model/CoreReferenceData';

@Injectable()

/**
 * Manage access to OCM reference data and filtered reference (country specific etc))
 */
export class ReferenceDataManager extends Base {

    private referenceData: CoreReferenceData;
    private filteredReferenceData: CoreReferenceData;

    constructor(private http: Http) {
        super();
        this.loadCachedRefData();
    }

    public setCoreReferenceData(refData) {
        this.referenceData = refData;
    }

    public setFilteredReferenceData(refData) {
        this.filteredReferenceData = refData;
    }
    
    public referenceDataLoaded():boolean{
        if (this.referenceData!=null){
            return true;
        } else {
            return false;
        }
    }

    /** 
     * Get list of countries, optionally filtered to only those with data present 
     * */
    public getCountries(filtered: boolean = false): Array<any> {

        if (filtered) {
            return this.referenceData.Countries
        } else {
            return this.filteredReferenceData.Countries;
        }

    }

    public getCountryByID(id: number): any {
        return this.getRefDataByID(this.referenceData.Countries, id);
    }

    /**
     * Get list of connection types optionally filtered to those in use or by country usage 
     */
    public getConnectionTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.ConnectionTypes
        } else {
            return this.filteredReferenceData.ConnectionTypes;
        }
    }

    public getConnectionTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.ConnectionTypes, id);
    }

    /**
    * Get list of usage types optionally filtered to those in use or by country usage 
    */
    public getUsageTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.UsageTypes.filter( i => i.ID>0);
        } else {
            return this.filteredReferenceData.UsageTypes;
        }
        
    }

    public getUsageTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.UsageTypes, id);
    }

    /**
     * Get list of Status types optionally filtered to those in use or by country usage 
     */
    public getStatusTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.StatusTypes.filter( i => i.ID>0);
        } else {
            return this.filteredReferenceData.StatusTypes;
        }
    }

    public getStatusTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.StatusTypes, id);
    }

    /**
     * Get list of Network operators optionally filtered to those in use or by country usage 
     */
    public getNetworkOperators(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.Operators;
        } else {
            return this.filteredReferenceData.Operators;
        }
    }

    public getNetworkOperatorByID(id: number): any {
        return this.getRefDataByID(this.referenceData.Operators, id);
    }

    /**
     * Get list of Data Providers optionally filtered to those in use or by country usage 
     */
    public getDataProviders(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.DataProviders;
        } else {
            return this.filteredReferenceData.DataProviders;
        }
    }

    public getDataProviderByID(id: number): any {
        return this.getRefDataByID(this.referenceData.DataProviders, id);
    }

 /**
     * Get list of Data Providers optionally filtered to those in use or by country usage 
     */
    public getCheckinStatusTypes(filtered: boolean = false, userSelectable=true): Array<any> {
        var results=null;
        
        if (filtered) {
            results= this.referenceData.CheckinStatusTypes;
        } else {
            results= this.filteredReferenceData.CheckinStatusTypes;
        }
        
        if (userSelectable){
            results = results.filter(c => c.IsAutomatedCheckin==false);
        }
        
        return results;
    }

    public getCheckinStatusTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.CheckinStatusTypes, id);
    }
    
     /**
     * Get list optionally filtered to those in use or by country usage 
     */
    public getCommentTypes(filtered: boolean = false, userSelectable:boolean=true): Array<any> {
        var results;
        
        if (filtered) {
            results= this.referenceData.UserCommentTypes;
        } else {
            results= this.filteredReferenceData.UserCommentTypes;
        }
        
        if (userSelectable){
            results = results.filter(c => c.ID != 100 && c.ID != 110);
        }
        
        return results;
    }

    public getCommentTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.UserCommentTypes, id);
    }
    /**
     * Get list optionally filtered to those in use or by country usage 
     */
    public getSubmissionStatusTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.SubmissionStatusTypes;
        } else {
            return this.filteredReferenceData.SubmissionStatusTypes;
        }
    }

    public getSubmissionStatusTypesByID(id: number): any {
        return this.getRefDataByID(this.referenceData.SubmissionStatusTypes, id);
    }
    
      /**
     * Get list optionally filtered to those in use or by country usage 
     */
    public getChargingLevelTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.ChargerTypes;
        } else {
            return this.filteredReferenceData.ChargerTypes;
        }
    }

    public getChargingLevelTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.ChargerTypes, id);
    }
    
       /**
     * Get list optionally filtered to those in use or by country usage 
     */
    public getOutputCurrentTypes(filtered: boolean = false): Array<any> {
        if (filtered) {
            return this.referenceData.CurrentTypes;
        } else {
            return this.filteredReferenceData.CurrentTypes;
        }
    }

    public getOutputCurrentTypeByID(id: number): any {
        return this.getRefDataByID(this.referenceData.CurrentTypes, id);
    }
    //////////////////////

    private loadCachedRefData() {
        let cachedRefData = localStorage.getItem("referenceData");

        //if no cached data available, use local copy
        if (cachedRefData == null) {

            this.http.get('./data/CoreReferenceData.json').map((res: Response) => res.json()).subscribe(res => {
                this.log("Using bundled reference data as cached ref data.");
                this.referenceData = res;
                
            });
        } else {

            
                this.referenceData = JSON.parse(cachedRefData);
            
        }
    }    

    private cacheRefData(refData) {
        if (this.referenceData != null) {
            this.referenceData.CacheDate = new Date();
            localStorage.setItem("referenceData", JSON.stringify(this.referenceData));
        }
    }

    public getRefDataByID(refDataList, id) {
        if (id != "") id = parseInt(id);

        if (refDataList != null) {
            for (var i = 0; i < refDataList.length; i++) {
                if (refDataList[i].ID == id) {
                    return refDataList[i];
                }
            }
        }
        return null;
    }

    private sortCoreReferenceData() {
        //sort reference data lists by Title
        this.sortReferenceData(this.referenceData.ConnectionTypes);
        this.sortReferenceData(this.referenceData.Countries);
        this.sortReferenceData(this.referenceData.Operators);
        this.sortReferenceData(this.referenceData.DataProviders);
        this.sortReferenceData(this.referenceData.UsageTypes);
        this.sortReferenceData(this.referenceData.StatusTypes);
        this.sortReferenceData(this.referenceData.CheckinStatusTypes);
        this.sortReferenceData(this.referenceData.SubmissionStatusTypes);
    }

    private sortReferenceData(sourceList) {
        sourceList.sort(this.sortListByTitle);
    }

    private sortListByTitle(a, b) {
        if (a.Title < b.Title) return -1;
        if (a.Title > b.Title) return 1;
        if (a.Title == b.Title) return 0;

        return 0;
    }

    public getMetadataValueByMetadataFieldID(metadataValues, id) {
        if (id != "") id = parseInt(id);

        if (metadataValues != null) {
            for (var i = 0; i < metadataValues.length; i++) {
                if (metadataValues[i].ID == id) {
                    return metadataValues[i];
                }
            }
        }
        return null;
    }
}