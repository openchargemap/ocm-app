import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular/lazy';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
