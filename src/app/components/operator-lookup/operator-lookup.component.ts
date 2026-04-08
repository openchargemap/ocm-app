import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { OperatorInfo } from '../../model/CoreDataModel';
import { ReferenceDataManager } from '../../services/ReferenceDataManager';

@Component({
    selector: 'app-operator-lookup',
    templateUrl: './operator-lookup.component.html',
    styleUrls: ['./operator-lookup.component.css'],
    standalone: false
})
export class OperatorLookupComponent implements OnInit {

  @Input()
  operatorId: number = null;

  @Input()
  operatorList: number[] = null;

  @Input()
  mode: string = "single";

  @Input()
  useFilteredOperators: boolean = null;

  @Output() operatorChanged = new EventEmitter();
  @Output() operatorRemoved = new EventEmitter();

  operatorCache: OperatorInfo[] = [];
  operatorSearchResults: OperatorInfo[] = [];
  operatorSearchKeyword = "";
  selectedOperator: OperatorInfo = null;
  isSearchFocused = false;
  private searchBlurTimeoutId: number = null;

  get operators(): Array<OperatorInfo> {
    return this.referenceDataManager.getNetworkOperators(this.useFilteredOperators);
  }

  get suggestedOperators(): Array<OperatorInfo> {
    const filteredOperators = this.referenceDataManager.getNetworkOperators(true) || [];
    return this.filterSuggestionOperators(filteredOperators.length > 0 ? filteredOperators : this.operatorCache);
  }

  constructor(private referenceDataManager: ReferenceDataManager, public changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.operatorCache = this.referenceDataManager.getNetworkOperators(false);

    if (this.operatorId != null) {
      this.selectedOperator = this.operatorCache.find(o => o.ID == this.operatorId);
    }
  }

  searchOperators() {
    const keyword = this.operatorSearchKeyword.trim().toLowerCase();
    if (keyword.length == 0) {
      if (this.isSearchFocused) {
        this.operatorSearchResults = this.getSelectableOperators(this.suggestedOperators).slice(0, 10);
      } else {
        this.operatorSearchResults = [];
      }
      return;
    }

    if (this.operatorCache) {
      this.operatorSearchResults = this.getSelectableOperators(this.operatorCache).filter(o =>
        o.Title.toLowerCase().startsWith(keyword)
        ||
        o.Title.toLowerCase().startsWith("(" + keyword)
      ).slice(0, 10);


    } else {
      this.operatorSearchResults = [];
    }
  }

  onSearchFocus() {
    this.clearSearchBlurTimeout();
    this.isSearchFocused = true;
    this.searchOperators();
  }

  onSearchBlur() {
    this.clearSearchBlurTimeout();
    this.searchBlurTimeoutId = window.setTimeout(() => {
      this.isSearchFocused = false;
      this.operatorSearchResults = [];
      this.searchBlurTimeoutId = null;
    }, 150);
  }

  onSearchCancel() {
    this.clearSearchBlurTimeout();
    this.isSearchFocused = false;
    this.operatorSearchKeyword = '';
    this.operatorSearchResults = [];
    this.selectedOperator = null;
  }

  getOperatorInfo(operatorId: number): OperatorInfo {
    if (this.operatorCache) {
      return this.operatorCache.find(o => o.ID == operatorId);
    }
  }

  async onOperatorChange(operatorInfo: OperatorInfo = null) {

    if (operatorInfo == null && this.operatorId) {
      operatorInfo = this.operatorCache.find(o => o.ID == this.operatorId);
    }

    if (operatorInfo != null) {
      this.operatorSearchResults = [];
      this.selectedOperator = operatorInfo;
      this.operatorId = operatorInfo.ID;
      this.isSearchFocused = false;
      this.clearSearchBlurTimeout();
    }

    if (!this.operatorId) {
      // use full list of operators
      this.useFilteredOperators = false;
    } else {

      this.operatorChanged.emit(this.selectedOperator);

      if (this.mode != 'single') {
        this.selectedOperator = null;
        this.operatorSearchKeyword = '';
      }
    }
  }

  async removeOperator(operatorId: number) {
    this.operatorId = null;
    this.operatorRemoved.emit(operatorId);
  }

  cancelOperatorLookup() {
    this.onSearchCancel();
  }

  private getSelectableOperators(operators: Array<OperatorInfo>): Array<OperatorInfo> {
    const selectedIds = new Set<number>(
      this.mode === 'multi'
        ? (this.operatorList || [])
        : (this.operatorId != null ? [this.operatorId] : [])
    );

    return (operators || []).filter(operator => !selectedIds.has(operator.ID));
  }

  private filterSuggestionOperators(operators: Array<OperatorInfo>): Array<OperatorInfo> {
    return (operators || []).filter(operator => !(operator.Title || '').trim().startsWith('('));
  }

  private clearSearchBlurTimeout() {
    if (this.searchBlurTimeoutId != null) {
      window.clearTimeout(this.searchBlurTimeoutId);
      this.searchBlurTimeoutId = null;
    }
  }
}
