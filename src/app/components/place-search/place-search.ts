import { Logging } from './../../services/Logging';
import { PlaceSearchResult } from './../../model/PlaceSearchResult';
import { Component, Input, Output, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { MapKitMapProvider } from '../../services/mapping/providers/MapKit';
import { GeoLatLng } from '../../model/AppModels';
import { environment } from '../../../environments/environment';

//declare var google: any;

declare var mapkit: any;

/*
  Component to provide geographic place search lookup
*/
@Component({
    selector: 'place-search',
    templateUrl: 'place-search.html'
})
export class PlaceSearch implements OnInit {

    private placeSearchType: string;
    private placeList: Array<PlaceSearchResult>;
    private searchInProgress: boolean = false;

    @Input()
    searchKeyword: string;

    placeSearchFocused: boolean;
    placeSearchActive: boolean = false;

    @Output()
    selectedPlace: any;

    @Output()
    placeChanged = new EventEmitter();

    constructor(public logging: Logging, public changeDetector: ChangeDetectorRef) {
        this.searchKeyword = "";
        this.searchInProgress = false;
    }

    ngOnInit(){
        mapkit.init({
            authorizationCallback: function (done) {
              done(environment.mapKitToken);
            }
          });
    }

    onSearchFocus() {
        this.placeSearchFocused = true;
    }
    onSearchBlur() {
        this.placeSearchFocused = false;
    }

    onSearchCancel() {
        //hide search block
        //this.placeSearchActive = false;

        //this.appManager.isRequestInProgress = false;
    }

    public getPlacesAutoComplete($event, searchType) {

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
            this.searchInProgress = true;

            let searchService = new mapkit.Search({ getsUserLocation: true });

            searchService.search(keywordForSearch, (error, data) => {
                this.searchInProgress = false;
                this.placeSearchActive = true;

                if (error) {
                    // Handle search error
                    return;
                }

                this.placeList = [];
                data.places.map((place) => {

                    let placeResult = new PlaceSearchResult();

                    placeResult.Title = place.name;
                    //placeResult.ReferenceID = (<any>place).place_id;
                    placeResult.Address = place.formattedAddress;
                    placeResult.Type = "place";
                    placeResult.Location = new GeoLatLng(place.coordinate.latitude, place.coordinate.longitude);

                    this.placeList.push(placeResult);
                });
            });
        }
    }

    public placeSelected(item: PlaceSearchResult) {

        let searchKeyword = item.Title;

        //move map to selected place

        this.logging.log("Looking up place details:" + searchKeyword + "::" + item.ReferenceID);

        this.selectedPlace = item;
        this.placeChanged.emit(item);

        this.placeSearchActive = false;
    }

}
