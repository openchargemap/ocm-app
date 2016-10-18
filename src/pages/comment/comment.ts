import { Logging } from './../../providers/Logging';
import { AppManager } from './../../providers/AppManager';
import { UserComment } from './../../model/UserComment';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';


@Component({
    templateUrl: 'comment.html'
})

export class CommentPage {

    commentModel: UserComment;
    poi: any;

    commentTypes: any;
    checkinTypes: any;
    
    constructor(
        public navParams: NavParams,
        public appManager: AppManager,
        public nav: NavController,
        public view: ViewController,
        public zone: NgZone,
        public loadingController: LoadingController,
        public logging: Logging
    ) {

        this.commentModel = <UserComment>{
            ChargePointID: this.navParams.get('id'),
            Comment: "",
            CheckinStatusTypeID: 10,
            UserCommentTypeID: 10,
            Rating: null
        };

        this.poi = this.navParams.get('poi');

        this.commentTypes = appManager.referenceDataManager.getCommentTypes(true, true);
        this.checkinTypes = appManager.referenceDataManager.getCheckinStatusTypes(true, true);
    }

    onPageWillEnter() {

    }

    cancel() {

        //this.nav.pop();
        this.view.dismiss();
    }

    add() {
        let loading = this.loadingController.create({
            content: "Sending ..",
            dismissOnPageChange: true
        });

        loading.present();

        this.appManager.submitComment(this.commentModel).then((response) => {
            this.logging.log("Comment submitted");
            loading.dismiss().then(() => {
                this.view.dismiss();
            }
            );

        }, (rejection) => {

            this.appManager.showToastNotification(this.nav, "There was a problem submitting your comment.");

            loading.dismiss();

        });

    }
}
