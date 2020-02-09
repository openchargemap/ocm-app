import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExtendedPOIDetails } from '../../model/CoreDataModel';
import { Utils } from '../../core/Utils';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.html',
  styleUrls: ['./poi-list.scss'],
})
export class PoiListComponent implements OnInit {

  @Input()
  enableCopyOption: boolean = false;

  @Input()
  enableEditOption: boolean = false;

  @Input()
  poiList: Array<ExtendedPOIDetails> = [];

  @Output()
  public onCopy = new EventEmitter<ExtendedPOIDetails>();

  @Output()
  public onEdit = new EventEmitter<ExtendedPOIDetails>();

  constructor() { }

  ngOnInit() { }

  onCopyCommand(poi) {
    // emit copy command
    this.onCopy.emit(poi);
  }

  onEditCommand(poi) {
    // emit edit command
    this.onEdit.emit(poi);
  }

  getFormattedAddress(poi: ExtendedPOIDetails): string {
    let address = "";
    if (poi.AddressInfo.Title != poi.AddressInfo.AddressLine1) {
      address += poi.AddressInfo.Title;
    } else {
      address += poi.AddressInfo.Town;
    }
    return address;
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
