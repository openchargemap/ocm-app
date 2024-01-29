import { Logging } from './../../services/Logging';
import { PlaceSearchResult } from './../../model/PlaceSearchResult';
import { Component, Input, Output, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IMapProvider } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapBox';
import { HttpClient } from '@angular/common/http';
import { Events } from '../../services/Events';
import { GeoLatLng } from 'src/app/model/GeoPosition';

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

                let keywordToLatLngResult = await this.detectAlternativeSearchResultType(keywordForSearch);

                if (keywordToLatLngResult) {
                    this.placeList.unshift(keywordToLatLngResult);
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

    ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        }

        return dd;
    }

    ParseDMS(input) {
        // https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
        try {
            var parts = input.split(/[^\d\w\.]+/);
            var lat = this.ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
            var lng = this.ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
            return new GeoLatLng(lat, lng);
        } catch {
            return null;
        }
    }

    public async detectAlternativeSearchResultType(input: string): Promise<PlaceSearchResult> {

        input = input.trim();

        if (input.startsWith("OCM-")) {
            input = input.replace("OCM-", "");
        }

        if (Number.isInteger(Number(input))) {
            // assume OCM ID
            let searchResult = new PlaceSearchResult();
            searchResult.Title = "Go to OCM ID";
            searchResult.Address = "OCM-" + input;
            searchResult.ReferenceID = "OCM-" + input;
            return searchResult;
        }

        // check if item is a lat/long pair
        let validation = input.match(/^\s*((lat|latitude)(:)?)?\s*((\-)?[0-9]+\.[0-9]+)\s*(,?)\s*((lng|lon|longitude)(:)?)?\s*((\-)?[0-9]+\.[0-9]+)\s*$/gi);
        if (validation && validation.length > 0) {
            // item may be a lat/long pair
            let result = input.match(/((\-)?[0-9]+\.[0-9]+)+/g);
            const latLngArray = ('' + result).split(",");
            let searchResult = new PlaceSearchResult();

            searchResult.Title = "Go to Lat/Lng";
            searchResult.Address = "Lat:" + latLngArray[0] + ", Lng:" + latLngArray[1];
            searchResult.Location = new GeoLatLng(parseFloat(latLngArray[0]), parseFloat(latLngArray[1]));
            return searchResult;
        } else {

            // check if item is a Degrees Minutes Second coordinate pair
            var converted = this.ParseDMS(input);
            if (converted && !isNaN(converted.latitude) && !isNaN(converted.longitude)) {
                let searchResult = new PlaceSearchResult();
                searchResult.Title = "Go to Lat/Lng";
                searchResult.Address = "Lat:" + converted.latitude + ", Lng:" + converted.longitude;
                searchResult.Location = converted;
                return searchResult;
            } else {
                return null;
            }
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
