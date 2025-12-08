import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'route-planner.html',
    standalone: false
})
export class RoutePlannerPage {

  hasNavbar: boolean = false;

  constructor(public modalController: ModalController) {

  }

  close() {
    this.modalController.dismiss();
  }
}
