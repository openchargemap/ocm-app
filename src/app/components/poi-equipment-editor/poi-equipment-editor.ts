import { Component, OnInit } from '@angular/core';
import { ConnectionInfo } from '../../model/AppModels';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { ReferenceDataManager } from '../../services/ReferenceDataManager';
import { ConnectionType, StatusType, CurrentType } from '../../model/CoreDataModel';

@Component({
  selector: 'app-poi-equipment-editor',
  templateUrl: './poi-equipment-editor.html',
  styleUrls: ['./poi-equipment-editor.css'],
})
export class PoiEquipmentEditorComponent implements OnInit {

  conn: ConnectionInfo;

  useFilteredConnectionTypes: boolean = true;
  useFilteredOperators: boolean = true;

  constructor(private modalController: ModalController,
    private referenceDataManager: ReferenceDataManager) { }

  get isAddMode(): boolean {
    return (this.conn != null && this.conn.ID > 0 ? false : true);
  }

  get connectionTypes(): Array<ConnectionType> {
    return this.referenceDataManager.getConnectionTypes(this.useFilteredConnectionTypes);
  }

  get currentTypes(): Array<CurrentType> {
    return this.referenceDataManager.getOutputCurrentTypes();
  }

  get statusTypes(): Array<StatusType> {
    return this.referenceDataManager.getStatusTypes().filter(s => s.IsUserSelectable == true);
  }

  ngOnInit() { }

  save() {
    this.modalController.dismiss({ item: this.conn });
  }

  cancel() {
    this.modalController.dismiss();
  }

}
