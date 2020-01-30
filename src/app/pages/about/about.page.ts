import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
})
export class AboutPage implements OnInit {

  constructor(public modalController: ModalController) { }

  get appVersion(): string {
    return environment.version;
  }

  get apiUrl(): string {
    return environment.apiBase;
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
