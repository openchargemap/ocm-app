import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ExtendedPOIDetails, ConnectionInfo } from '../../model/CoreDataModel';
import { Utils } from '../../core/Utils';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.html',
  styleUrls: ['./equipment-details.css'],
})
export class EquipmentDetailsComponent implements OnInit {

  @Input()
  public item: ExtendedPOIDetails;

  @Input()
  public enableEdit = false;

  @Output()
  public onEdit = new EventEmitter<any>();

  @Output()
  public onDelete = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  editConnection(editItem: ConnectionInfo) {
    this.onEdit.emit(editItem);
  }

  deleteConnection(editItem: ConnectionInfo) {
    this.onDelete.emit(editItem);
  }

  getConnectorTypeIcon(id: number): string {
    return Utils.getIconForConnector(id);
  }
}
