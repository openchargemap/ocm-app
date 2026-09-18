import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular/lazy';

@Component({
    templateUrl: 'route-planner.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
