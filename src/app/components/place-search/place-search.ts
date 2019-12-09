import { Logging } from './../../services/Logging';
import { PlaceSearchResult } from './../../model/PlaceSearchResult';
import { Component, Input, Output, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { MapKitMapProvider } from '../../services/mapping/providers/MapKit';
import { GeoLatLng } from '../../model/AppModels';
import { environment } from '../../../environments/environment';
import { Platform, Events } from '@ionic/angular';
import { IMapProvider } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapBox';
import { HttpClient } from '@angular/common/http';

// declare var google: any;

declare var mapkit: any;

/*
  Component to provide geographic place search lookup
*/
@Component({
    selector: 'place-search',
    templateUrl: 'place-search.html',
    styleUrls: ['./place-search.scss']
})
export class PlaceSearch implements OnInit {

    private placeSearchType: string;
    private placeList: Array<PlaceSearchResult>;
    private searchInProgress = false;

    @Input()
    searchKeyword: string;

    placeSearchFocused: boolean;
    placeSearchActive = false;
    placeAttribution = "";

    @Output()
    selectedPlace: any;

    @Output()
    placeChanged = new EventEmitter();

    mapService: IMapProvider;

    constructor(public logging: Logging, public changeDetector: ChangeDetectorRef, private platform: Platform, private http: HttpClient, private events: Events) {
        this.searchKeyword = "";
        this.searchInProgress = false;

        this.mapService = new MapBoxMapProvider(events, logging, http);
    }

    async ngOnInit() {

        await this.platform.ready();

        this.mapService.initAPI();
    }

    onSearchFocus() {
        this.placeSearchFocused = true;
    }
    onSearchBlur() {
        this.placeSearchFocused = false;
    }

    onSearchCancel() {
        // hide search block
        // this.placeSearchActive = false;

        // this.appManager.isRequestInProgress = false;
    }

    public async getPlacesAutoComplete($event, searchType) {

        this.placeSearchType = searchType;
        let keywordForSearch = $event.target.value;

        /* if (searchType == "poiSearch") {


             this.placeSearchType = searchType;
             keywordForSearch = this.searchKeyword;
         }

         if (searchType == "routeStart") {
             this.placeSearchType = searchType;
             //keywordForSearch = this.routeStart;
         }

         if (searchType == "routeDestination") {
             this.placeSearchType = searchType;
            // keywordForSearch = this.routeDestination;
         }
        */

        if (keywordForSearch && keywordForSearch.length > 3) {
            this.logging.log("Starting place lookup for:" + keywordForSearch);

            this.placeSearchActive = true;
            this.searchInProgress = true;

            this.searchInProgress = false;
            this.placeSearchActive = true;

            try {
                this.placeList = await this.mapService.placeSearch(keywordForSearch);

                if (this.placeList && this.placeList.length > 0) {
                    this.placeAttribution = this.placeList[0].Attribution;
                }
            } catch (error) {

            }

            this.searchInProgress = false;
            this.placeSearchActive = true;
        } else {
            this.searchInProgress = false;
            this.placeSearchActive = false;
        }
    }

    public placeSelected(item: PlaceSearchResult) {

        let searchKeyword = item.Title;

        // move map to selected place

        this.logging.log("Looking up place details:" + searchKeyword + "::" + item.ReferenceID);

        this.selectedPlace = item;
        this.placeChanged.emit(item);

        this.placeSearchActive = false;
    }

}
