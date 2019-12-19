import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
})
export class AboutPage implements OnInit {

  constructor(  public modalController: ModalController) { }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss();
}
}
