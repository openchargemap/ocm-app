import { Logging } from './../../providers/Logging';
import { PlaceSearchResult } from './../../model/PlaceSearchResult';
import { Component, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

declare var google:any;
/*
  Component to provide geographic place search lookup
*/
@Component({
    selector: 'place-search',
    templateUrl: 'place-search.html'
})
export class PlaceSearch {

    @Input()
    searchKeyword: string;

    placeSearchFocused: boolean;

    private placeSearchType: string;

    private placeList: Array<PlaceSearchResult>;
    private placeSearchActive: boolean = false;

    private searchInProgress: boolean = false;

    @Output()
    selectedPlace: any;

    @Output()
    placeChanged = new EventEmitter();

    constructor(public logging: Logging, public changeDetector: ChangeDetectorRef) {

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


        //this.appManager.showToastNotification(this.nav, "Starting lookup for " + keywordForSearch);


        if (keywordForSearch && keywordForSearch.length > 3) {
            this.logging.log("Starting place lookup for:" + keywordForSearch);
            this.searchInProgress = true;
            var service = new (<any>google.maps.places).AutocompleteService();

            service.getQueryPredictions({ input: keywordForSearch }, (predictions, status) => {

                this.searchInProgress = false;
                this.placeSearchActive = true;

                //loading.dismiss();
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    //this.appManager.showToastNotification(this.nav, status);
                    return;
                }
                var results = predictions;
                this.logging.log("Got place search results: " + results.length);
                //                this.mapping.unfocusMap();

                this.placeList = [];

                for (var i = 0; i < results.length; i++) {

                    var place = results[i];

                    if (place.place_id) {
                        var placeResult = new PlaceSearchResult();
                        placeResult.Title = place.description;
                        placeResult.ReferenceID = (<any>place).place_id;
                        placeResult.Address = place.description;
                        placeResult.Type = "place";
                        // placeResult.Location = new GeoLatLng(place.geometry.location.lat(), place.geometry.location.lng());
                        this.placeList.push(placeResult);
                    }
                    //this.log(JSON.stringify(place));
                }

                //force refresh of results list
                this.changeDetector.detectChanges();
            });

        }
    }



    public placeSelected(item: PlaceSearchResult) {
        let placeSearchType = "test";
        let searchKeyword = item.Title;


        //move map to selected place

        this.logging.log("Looking up place details:" + searchKeyword + "::" + item.ReferenceID);
        var attributionDiv = <HTMLDivElement>document.getElementById("place-attribution");
        var service = new google.maps.places.PlacesService(attributionDiv);

        (<any>service).getDetails({ placeId: item.ReferenceID }, (place, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.logging.log("Got place details:" + place.name);


                this.selectedPlace = place;
                this.placeChanged.emit(place);

            } else {
                this.logging.log("Failed to fetch place:" + status.toString());
            }
        });
        this.placeSearchActive = false;
    }

}
