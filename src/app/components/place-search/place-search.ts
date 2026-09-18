import { Logging, LogLevel } from './../../services/Logging';
import { PlaceSearchResult } from './../../model/PlaceSearchResult';
import { Component, Input, Output, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@ionic/angular/lazy';
import { IMapProvider } from '../../services/mapping/interfaces/mapping';
import { MapBoxMapProvider } from '../../services/mapping/providers/MapTiler';
import { HttpClient } from '@angular/common/http';
import { Events } from '../../services/Events';
import { GeoLatLng } from '../../model/GeoPosition';

// declare var google: any;

declare var mapkit: any;

/*
  Component to provide geographic place search lookup
*/
@Component({
    selector: 'place-search',
    templateUrl: 'place-search.html',
    styleUrls: ['./place-search.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PlaceSearch implements OnInit, OnDestroy {

    private static nextResultsId = 0;
    private placeSearchType: string;
    private requestSequence = 0;

    @Input()
    searchKeyword: string;

    @Input()
    anchoredToInput = false;

    placeList: Array<PlaceSearchResult> = [];
    searchInProgress = false;
    placeSearchFocused: boolean;
    placeSearchActive = false;
    placeAttribution = "";
    activeResultIndex = -1;
    readonly resultsId = `place-search-results-${PlaceSearch.nextResultsId++}`;

    get activeDescendantId(): string | null {
        return this.activeResultIndex >= 0 ? `${this.resultsId}-option-${this.activeResultIndex}` : null;
    }

    @Output()
    selectedPlace: any;

    @Output()
    placeChanged = new EventEmitter();

    mapService: IMapProvider;

    // Anchor tracking used only when anchoredToInput is true (see setupAnchoredPortal).
    private anchorParent: HTMLElement | null = null;
    private anchorHeader: HTMLElement | null = null;
    private readonly onWindowResize = () => this.updateAnchorPosition();

    constructor(public logging: Logging, public changeDetector: ChangeDetectorRef, private platform: Platform, private http: HttpClient, private events: Events, private elementRef: ElementRef<HTMLElement>) {
        this.searchKeyword = "";
        this.searchInProgress = false;

        this.mapService = new MapBoxMapProvider(events, logging, http);
    }

    async ngOnInit() {

        await this.platform.ready();

        this.mapService.initAPI();

        if (this.anchoredToInput) {
            this.setupAnchoredPortal();
        }
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    /*
      ion-toolbar renders its projected content inside a shadow-DOM container that is
      both overflow:hidden and CSS-contained (contain: content). That clips any
      absolutely or fixed positioned descendant regardless of z-index, so the results
      dropdown can never be made visible while it stays nested inside the toolbar.
      Re-parent it next to <ion-header> (which has no such containment) and track the
      search input's on-screen position so the dropdown still appears directly below it.
    */
    private setupAnchoredPortal() {
        const hostEl = this.elementRef.nativeElement;
        const header = hostEl.closest('ion-header') as HTMLElement | null;

        if (!header || !hostEl.parentElement) {
            return;
        }

        this.anchorParent = hostEl.parentElement;
        this.anchorHeader = header;

        header.appendChild(hostEl);

        this.updateAnchorPosition();
        window.addEventListener('resize', this.onWindowResize);
    }

    private updateAnchorPosition() {
        if (!this.anchorParent || !this.anchorHeader) {
            return;
        }

        const anchorRect = this.anchorParent.getBoundingClientRect();
        const headerRect = this.anchorHeader.getBoundingClientRect();
        const hostStyle = this.elementRef.nativeElement.style;

        hostStyle.setProperty('--place-search-anchor-top', `${anchorRect.bottom - headerRect.top}px`);
        hostStyle.setProperty('--place-search-anchor-left', `${anchorRect.left - headerRect.left}px`);
        hostStyle.setProperty('--place-search-anchor-width', `${anchorRect.width}px`);
    }

    onSearchFocus() {
        this.placeSearchFocused = true;
    }
    onSearchBlur() {
        this.placeSearchFocused = false;
    }

    onSearchCancel() {
        this.requestSequence++;
        this.placeSearchActive = false;
        this.activeResultIndex = -1;
    }

    public async getPlacesAutoComplete($event, searchType) {

        this.placeSearchType = searchType;
        const keywordForSearch = ($event?.detail?.value ?? $event?.target?.value ?? this.searchKeyword ?? '').trim();
        this.searchKeyword = keywordForSearch;
        const requestId = ++this.requestSequence;
        this.activeResultIndex = -1;

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

            if (this.anchoredToInput) {
                this.updateAnchorPosition();
            }

            this.placeSearchActive = true;
            this.searchInProgress = true;

            try {
                const placeList = await this.mapService.placeSearch(keywordForSearch) || [];

                if (requestId !== this.requestSequence) {
                    return;
                }

                const keywordToLatLngResult = await this.detectAlternativeSearchResultType(keywordForSearch);

                if (keywordToLatLngResult) {
                    placeList.unshift(keywordToLatLngResult);
                }

                this.placeList = placeList;
                this.placeAttribution = placeList.find(item => item.Attribution)?.Attribution || "";
            } catch (error) {
                if (requestId === this.requestSequence) {
                    this.placeList = [];
                    this.placeAttribution = "";
                    this.placeSearchActive = false;
                }
                this.logging.log(`Place lookup failed: ${error}`, LogLevel.ERROR);
            } finally {
                if (requestId === this.requestSequence) {
                    this.searchInProgress = false;
                }
            }
        } else {
            this.requestSequence++;
            this.placeList = [];
            this.placeAttribution = "";
            this.searchInProgress = false;
            this.placeSearchActive = false;
        }
    }

    public onSearchKeyDown(event: KeyboardEvent) {
        if (!this.placeSearchActive || this.placeList.length === 0) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.activeResultIndex = Math.min(this.activeResultIndex + 1, this.placeList.length - 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.activeResultIndex = Math.max(this.activeResultIndex - 1, 0);
        } else if (event.key === 'Enter' && this.activeResultIndex >= 0) {
            event.preventDefault();
            this.placeSelected(this.placeList[this.activeResultIndex]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.placeSearchActive = false;
            this.activeResultIndex = -1;
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
        this.activeResultIndex = -1;
    }

}
