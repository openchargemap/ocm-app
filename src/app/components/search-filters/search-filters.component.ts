import { Component, Input, OnInit } from '@angular/core';
import { AppManager } from '../../services/AppManager';
import { Events } from '../../services/Events';
import { SearchSettings, MAX_POWER } from '../../model/SearchSettings';
import { Utils } from '../../core/Utils';
import { OperatorInfo } from '../../model/CoreDataModel';

/**
 * Renders the map search filter controls (country, power range, operator, usage/status type,
 * connection type, media/comment/checkin). Shared between the Settings modal and the inline
 * "Filters" tab on the station list panel so both stay in sync with a single implementation.
 */
@Component({
    selector: 'app-search-filters',
    templateUrl: 'search-filters.component.html',
    styleUrls: ['search-filters.component.scss'],
    standalone: false
})
export class SearchFiltersComponent implements OnInit {

    /** Prefix applied to element ids so two instances (e.g. modal + inline tab) can co-exist without id clashes. */
    @Input() idPrefix = 'search-filters';

    /** When true, filter changes immediately refresh the map/list results. When false, the host is responsible for applying changes (e.g. on modal close). */
    @Input() liveRefresh = true;

    searchSettings: SearchSettings;
    maxPower = MAX_POWER;
    powerRange = { lower: 0, upper: this.maxPower ?? 500 };

    triStateFilterOptions = [
        { value: 'any', titleKey: 'ocm.search.any' },
        { value: 'true', titleKey: 'ocm.search.yes' },
        { value: 'false', titleKey: 'ocm.search.no' }
    ];

    private readonly applyChanges = Utils.debounce(() => this.commitAndRefresh(), 400, false);

    constructor(
        public appManager: AppManager,
        private events: Events
    ) {
        this.searchSettings = appManager.searchSettings;
    }

    async ngOnInit() {
        if (this.searchSettings.MinPowerKW != null) { this.powerRange.lower = this.searchSettings.MinPowerKW; }
        if (this.searchSettings.MaxPowerKW != null) { this.powerRange.upper = this.searchSettings.MaxPowerKW; }
        if (this.powerRange.upper == 0) { this.powerRange.upper = this.maxPower; }

        if (this.useFilteredOptions) {
            await this.onCountryChange();
        }
    }

    get useFilteredOptions(): boolean {
        return this.searchSettings.FilterOptionsByCountryId > 0;
    }

    get isCountryFilterFeatureEnabled(): boolean {
        return Utils.isFeatureEnabled('FILTER_OPTIONS_BY_COUNTRY');
    }

    get operators() {
        return this.appManager.referenceDataManager.getNetworkOperators(this.useFilteredOptions);
    }

    get connectionTypes() {
        return this.appManager.referenceDataManager.getConnectionTypes(this.useFilteredOptions);
    }

    get usageTypes() {
        return this.appManager.referenceDataManager.getUsageTypes(this.useFilteredOptions);
    }

    get statusTypes() {
        return this.appManager.referenceDataManager.getStatusTypes(this.useFilteredOptions);
    }

    get countries() {
        return this.appManager.referenceDataManager.getCountries(this.useFilteredOptions);
    }

    onTriStateFilterChange() {
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    onUsageTypeChange() {
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    onStatusTypeChange() {
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    onPowerRangeChange(event: CustomEvent<{ value: number | { lower: number; upper: number } }>) {
        const value = event.detail.value;
        // A dual-knob range emits an object, not the numeric form accessor's value.
        if (value && typeof value === 'object') {
            this.powerRange = value;
            this.commitPowerRange();
            this.applyChanges();
        }
    }

    onPowerInputChange() {
        this.commitPowerRange();
        this.applyChanges();
    }

    private commitPowerRange() {
        this.searchSettings.MinPowerKW = this.powerRange.lower;
        this.searchSettings.MaxPowerKW = this.powerRange.upper;

        if (this.searchSettings.MinPowerKW == 1) { this.searchSettings.MinPowerKW = null; }
        if (this.searchSettings.MaxPowerKW == this.maxPower) { this.searchSettings.MaxPowerKW = null; }

        this.searchSettings.CheckForActiveFilters();
    }

    clearFilters() {
        this.searchSettings.ClearActiveFilters();
        this.powerRange = { lower: 0, upper: this.maxPower };
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    async onCountryChange() {
        if (this.searchSettings.FilterOptionsByCountryId > 0) {
            this.appManager.referenceDataManager.refreshFilteredReferenceData(this.appManager.api, {
                CountryIds: [this.searchSettings.FilterOptionsByCountryId]
            });
        } else {
            this.searchSettings.FilterOptionsByCountryId = null;
            this.appManager.referenceDataManager.resetFilteredReferenceData();
        }
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    async onOperatorSelected(operatorInfo: OperatorInfo = null) {
        if (operatorInfo != null) {
            if (!this.searchSettings.OperatorList.find(f => f == operatorInfo.ID)) {
                this.searchSettings.OperatorList.push(operatorInfo.ID);
            }
        }
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    async onOperatorRemoved(operatorId: number) {
        this.searchSettings.OperatorList = this.searchSettings.OperatorList.filter(f => f != operatorId);
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    onConnectionTypeSelected(connectionTypeId: number) {
        if (connectionTypeId != null && !this.searchSettings.ConnectionTypeList.find(connectionType => connectionType == connectionTypeId)) {
            this.searchSettings.ConnectionTypeList.push(connectionTypeId);
        }
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    onConnectionTypeRemoved(connectionTypeId: number) {
        this.searchSettings.ConnectionTypeList = this.searchSettings.ConnectionTypeList.filter(connectionType => connectionType != connectionTypeId);
        this.searchSettings.CheckForActiveFilters();
        this.applyChanges();
    }

    private commitAndRefresh() {
        this.appManager.searchSettings = this.searchSettings;
        this.appManager.saveSearchSettings();

        if (this.liveRefresh) {
            // publish event to refresh results based on new criteria
            this.events.publish('ocm:poiList:cleared');
        }
    }
}
