import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { RoutePlanner} from '../../components/route-planner/route-planner';
/*
  Generated class for the RoutePlannerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/route-planner/route-planner.html',
  directives:[RoutePlanner]
})
export class RoutePlannerPage {

  constructor(private nav: NavController, private view: ViewController) {

  }


    close() {
        this.view.dismiss();
    }


}
