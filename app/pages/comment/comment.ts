import {Page, NavController, NavParams, Modal, Alert} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {UserComment} from '../../core/ocm/model/AppModels';


@Page({
    templateUrl: 'build/pages/comment/comment.html',

    directives: []
})

export class CommentPage {

    commentModel;
    refData: any;
    constructor(private navParams: NavParams, public appManager: AppManager, public nav: NavController) {
       
        this.commentModel = <UserComment>{ 
            ChargePointID: this.navParams.get('id'), 
            Comment:"", 
            CheckinStatusTypeID:0,
            UserCommentTypeID:10,
            Rating: null
        };
        
        this.refData = appManager.api.referenceData;
    }

    onPageWillEnter() {
       
    }

    cancel() {

        this.nav.pop();
    }

    addComment() {
        this.appManager.submitComment(this.commentModel);
        this.nav.pop();
    }
}
