import {Page, NavController, NavParams, Modal, Alert} from 'ionic-angular';
import {AppManager} from '../../core/ocm/services/AppManager';
import {ImageUploader} from '../../components/imageuploader/imageuploader';


@Page({
    templateUrl: 'build/pages/mediaupload/mediaupload.html',

    directives: [ImageUploader]
})
export class MediaUploadPage {



    constructor(navParams: NavParams,public appManager: AppManager, public nav: NavController) {
      

    }

    onPageWillEnter() {



    }



}
