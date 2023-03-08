import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReferenceDataManager } from '../../services/ReferenceDataManager';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.page.html',
  styleUrls: ['./layer-editor.page.css'],
})
export class LayerEditorPage implements OnInit {

  fileData: any[];

  constructor(private modalController: ModalController, private refData: ReferenceDataManager) { }

  ngOnInit() {
  }

  async previewFile() {
    await this.loadFile(false);
  }

  async cancel() {

    await this.modalController.dismiss(this.fileData);
  }

  async loadFile(dismissOnLoad: boolean = true) {
    const reader = new FileReader();

    reader.onload = () => {
      let dat = reader.result as string;

      let parsedList = JSON.parse(dat);

      // make ID's unique to this layer
      let surrogateID = 5000000;
      for (let p of parsedList) {

        if (p.ID == null || p.ID == "") p.ID = surrogateID.toString();

        p.ID = "imp_" + p.ID;

        surrogateID++;
      }

      this.fileData = this.refData.hydrateCompactPOIList(<Array<any>>parsedList);

      if (dismissOnLoad) {
        this.modalController.dismiss(this.fileData);
      }
    };

    reader.onerror = () => {
      // alert('reader error');
    };

    // read data from file input, this will then fire the onload event
    reader.readAsText((<any>document.getElementById('file-upload')).files[0]);
  }

  async add() {

    this.modalController.dismiss(this.fileData);

  }
}
