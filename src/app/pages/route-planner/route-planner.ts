import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { RoutePlanner } from '../../components/route-planner/route-planner';

@Component({
  templateUrl: 'route-planner.html'
})
export class RoutePlannerPage {

  hasNavbar: boolean = false;
  
  constructor(public modalController: ModalController) {

  }

  close() {
    this.modalController.dismiss();
  }
}
