import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ExtendedPOIDetails } from '../../model/CoreDataModel';
import { Utils } from '../../core/Utils';

@Component({
    selector: 'app-poi-list',
    templateUrl: './poi-list.html',
    styleUrls: ['./poi-list.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PoiListComponent implements OnInit {

  @Input()
  enableCopyOption: boolean = false;

  @Input()
  enableEditOption: boolean = false;

  @Input()
  enableSelection = false;

  @Output()
  public onSelect = new EventEmitter<ExtendedPOIDetails>();

  @Input()
  poiList: Array<ExtendedPOIDetails> = [];

  @Output()
  public onCopy = new EventEmitter<ExtendedPOIDetails>();

  @Output()
  public onEdit = new EventEmitter<ExtendedPOIDetails>();

  constructor() { }

  ngOnInit() { }

  selectPOI(poi: ExtendedPOIDetails) {
    if (this.enableSelection) { this.onSelect.emit(poi); }
  }

  getMaxPower(poi: ExtendedPOIDetails): number {
    return Math.max(0, ...(poi.Connections || []).map(c => c.PowerKW || 0));
  }

  onCopyCommand(poi) {
    // emit copy command
    this.onCopy.emit(poi);
  }

  onEditCommand(poi) {
    // emit edit command
    this.onEdit.emit(poi);
  }

  getFormattedAddress(poi: ExtendedPOIDetails): string {
    return [poi.AddressInfo.AddressLine1, poi.AddressInfo.Town].filter(Boolean).join(', ');
  }

  getFormattedConnectorList(poi: ExtendedPOIDetails): string {

    if (!poi.Connections) {
      return;
    }
    let list = [];
    for (let c of poi.Connections) {
      if (c.ConnectionType != null) {
        if (!list.find(l => l == c.ConnectionType.Title)) {
          list.push(c.ConnectionType.Title);
        }
      }
    }

    return list.join(", ");
  }

  getIconForPOI(poi): string {
    return Utils.getIconForPOI(poi);
  }

  getFormattedDistance(poi): string {
    return Utils.getFormattedDistance(poi);
  }
}
