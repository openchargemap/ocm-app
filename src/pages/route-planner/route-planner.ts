import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RoutePlanner } from '../../components/route-planner/route-planner';

@Component({
  templateUrl: 'route-planner.html'
})
export class RoutePlannerPage {

  hasNavbar: boolean = false;
  constructor(public nav: NavController, public view: ViewController) {

  }

  close() {
    this.view.dismiss();
  }
}
