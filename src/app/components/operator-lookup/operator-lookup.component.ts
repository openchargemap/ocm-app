import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperatorInfo } from '../../model/CoreDataModel';
import { ReferenceDataManager } from '../../services/ReferenceDataManager';

@Component({
  selector: 'app-operator-lookup',
  templateUrl: './operator-lookup.component.html',
  styleUrls: ['./operator-lookup.component.css'],
})
export class OperatorLookupComponent implements OnInit {

  @Input()
  operatorId: number = null;

  @Input()
  useFilteredOperators: boolean = null;

  @Output() operatorChanged = new EventEmitter();

  operatorCache: OperatorInfo[] = [];
  operatorSearchResults: OperatorInfo[] = [];
  operatorSearchKeyword = "";
  selectedOperator: OperatorInfo = null;

  get operators(): Array<OperatorInfo> {
    return this.referenceDataManager.getNetworkOperators(this.useFilteredOperators);
  }

  constructor(private referenceDataManager: ReferenceDataManager) { }

  ngOnInit() {
    this.operatorCache = this.referenceDataManager.getNetworkOperators(false);

    if (this.operatorId != null) {
      this.selectedOperator = this.operatorCache.find(o => o.ID == this.operatorId);
    }
  }

  searchOperators() {
    this.operatorSearchResults = [];

    if (this.operatorSearchKeyword.length == 0) {
      return;
    }

    if (this.operatorCache) {
      this.operatorSearchResults = this.operatorCache.filter(o =>
        o.Title.toLowerCase().startsWith(this.operatorSearchKeyword.toLowerCase())
        ||
        o.Title.toLowerCase().startsWith("(" + this.operatorSearchKeyword.toLowerCase())
      ).slice(0, 10);
    } else {
      this.operatorSearchResults = [];
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
    }

    if (!this.operatorId) {
      // use full list of operators
      this.useFilteredOperators = false;
    } else {

      this.operatorChanged.emit(this.selectedOperator);
      // await this.refreshTemplateSites();
    }
  }

  cancelOperatorLookup() {
    this.selectedOperator = null;
  }
}
