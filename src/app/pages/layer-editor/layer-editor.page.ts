import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-layer-editor',
  templateUrl: './layer-editor.page.html',
  styleUrls: ['./layer-editor.page.css'],
})
export class LayerEditorPage implements OnInit {

  fileData: [];

  constructor(private modalController: ModalController) { }

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
      // populate POI markers

      this.fileData = JSON.parse(dat);

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

  async add(){
   
      this.modalController.dismiss(this.fileData);
    
  }
}
