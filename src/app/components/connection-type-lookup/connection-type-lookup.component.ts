import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConnectionType } from '../../model/CoreDataModel';
import { ReferenceDataManager } from '../../services/ReferenceDataManager';

@Component({
    selector: 'app-connection-type-lookup',
    templateUrl: './connection-type-lookup.component.html',
    styleUrls: ['./connection-type-lookup.component.css'],
    standalone: false
})
export class ConnectionTypeLookupComponent implements OnInit, OnChanges {

  @Input()
  connectionTypeId: number = null;

  @Input()
  connectionTypeList: number[] = null;

  @Input()
  mode: string = 'single';

  @Input()
  useFilteredConnectionTypes: boolean = true;

  @Input()
  showUnknownOption: boolean = false;

  @Output() connectionTypeChanged = new EventEmitter<number>();
  @Output() connectionTypeRemoved = new EventEmitter<number>();

  connectionTypeCache: ConnectionType[] = [];
  connectionTypeSearchResults: ConnectionType[] = [];
  connectionTypeSearchKeyword = '';
  selectedConnectionType: ConnectionType = null;
  suggestedConnectionTypeId: number = null;
  isSearchFocused = false;
  private searchBlurTimeoutId: number = null;

  constructor(private referenceDataManager: ReferenceDataManager) { }

  ngOnInit() {
    this.refreshConnectionTypeCache();
    this.syncSelection();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshConnectionTypeCache();
    this.syncSelection();
  }

  get shortlistLabel(): string {
    return this.useFilteredConnectionTypes ? 'Suggested Connection Types' : 'Connection Type';
  }

  get suggestedConnectionTypes(): Array<ConnectionType> {
    const suggested = this.referenceDataManager.getConnectionTypes(this.useFilteredConnectionTypes) || [];
    return this.filterSuggestionConnectionTypes(suggested.length > 0 ? suggested : this.connectionTypeCache);
  }

  get showSearchUI(): boolean {
    return this.mode !== 'single' || this.selectedConnectionType == null;
  }

  private refreshConnectionTypeCache() {
    this.connectionTypeCache = this.referenceDataManager.getConnectionTypes(false) || [];
  }

  private syncSelection() {
    if (this.mode !== 'single') {
      this.selectedConnectionType = null;
      return;
    }

    if (this.connectionTypeId != null && this.connectionTypeId > 0) {
      this.selectedConnectionType = this.getConnectionTypeInfo(this.connectionTypeId);
    } else {
      this.selectedConnectionType = null;
    }
  }

  searchConnectionTypes() {
    const keyword = this.connectionTypeSearchKeyword.trim().toLowerCase();
    if (keyword.length === 0) {
      if (this.isSearchFocused) {
        this.connectionTypeSearchResults = this.getSelectableConnectionTypes(this.suggestedConnectionTypes);
      } else {
        this.connectionTypeSearchResults = [];
      }
      return;
    }

    this.connectionTypeSearchResults = this.getSelectableConnectionTypes(this.connectionTypeCache).filter(connectionType => {

      const title = connectionType.Title?.toLowerCase() || '';
      const formalName = connectionType.FormalName?.toLowerCase() || '';
      return title.includes(keyword) || formalName.includes(keyword);
    }).slice(0, 10);
  }

  onSearchFocus() {
    this.clearSearchBlurTimeout();
    this.isSearchFocused = true;
    this.searchConnectionTypes();
  }

  onSearchBlur() {
    this.clearSearchBlurTimeout();
    this.searchBlurTimeoutId = window.setTimeout(() => {
      this.isSearchFocused = false;
      this.connectionTypeSearchResults = [];
      this.searchBlurTimeoutId = null;
    }, 150);
  }

  onSearchCancel() {
    this.clearSearchBlurTimeout();
    this.isSearchFocused = false;
    this.connectionTypeSearchKeyword = '';
    this.connectionTypeSearchResults = [];
  }

  onSuggestedConnectionTypeChange() {
    if (this.mode === 'single') {
      this.selectConnectionType(this.connectionTypeId);
      return;
    }

    this.selectConnectionType(this.suggestedConnectionTypeId);
    this.suggestedConnectionTypeId = null;
  }

  onSearchResultSelected(connectionType: ConnectionType) {
    if (connectionType == null) {
      return;
    }

    this.selectConnectionType(connectionType.ID);
  }

  clearSelectedConnectionType() {
    this.connectionTypeId = null;
    this.selectedConnectionType = null;
    this.connectionTypeSearchKeyword = '';
    this.connectionTypeSearchResults = [];
  }

  removeConnectionType(connectionTypeId: number) {
    this.connectionTypeRemoved.emit(connectionTypeId);
  }

  getConnectionTypeInfo(connectionTypeId: number): ConnectionType {
    if (this.connectionTypeCache) {
      return this.connectionTypeCache.find(connectionType => connectionType.ID == connectionTypeId);
    }

    return null;
  }

  private selectConnectionType(connectionTypeId: number) {
    if (connectionTypeId == null) {
      return;
    }

    this.connectionTypeId = connectionTypeId;

    if (this.mode === 'single') {
      this.selectedConnectionType = this.getConnectionTypeInfo(connectionTypeId);
    }

    this.connectionTypeSearchKeyword = '';
    this.connectionTypeSearchResults = [];
    this.isSearchFocused = false;
    this.clearSearchBlurTimeout();
    this.connectionTypeChanged.emit(connectionTypeId);

    if (this.mode !== 'single') {
      this.connectionTypeId = null;
      this.selectedConnectionType = null;
    }
  }

  private getSelectableConnectionTypes(connectionTypes: Array<ConnectionType>): Array<ConnectionType> {
    const selectedIds = new Set<number>(
      this.mode === 'multi'
        ? (this.connectionTypeList || [])
        : (this.connectionTypeId != null && this.connectionTypeId > 0 ? [this.connectionTypeId] : [])
    );

    return (connectionTypes || []).filter(connectionType => !selectedIds.has(connectionType.ID));
  }

  private filterSuggestionConnectionTypes(connectionTypes: Array<ConnectionType>): Array<ConnectionType> {
    return (connectionTypes || []).filter(connectionType => !(connectionType.Title || '').trim().startsWith('('));
  }

  private clearSearchBlurTimeout() {
    if (this.searchBlurTimeoutId != null) {
      window.clearTimeout(this.searchBlurTimeoutId);
      this.searchBlurTimeoutId = null;
    }
  }
}