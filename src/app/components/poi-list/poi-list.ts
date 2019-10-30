import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { POIDetails, ExtendedPOIDetails } from '../../model/CoreDataModel';

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
}
