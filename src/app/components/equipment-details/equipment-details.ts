import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ExtendedPOIDetails } from '../../model/CoreDataModel';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.html',
  styleUrls: ['./equipment-details.css'],
})
export class EquipmentDetailsComponent implements OnInit {

  @Input()
  public item: ExtendedPOIDetails;

  @Input()
  public enableEdit: boolean = false;

  @Output()
  public onEdit = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  editConnection(id: number) {
    this.onEdit.emit(id);
  }
}
