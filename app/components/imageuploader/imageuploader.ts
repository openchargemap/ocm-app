import {Component} from 'angular2/core';
import {Camera} from 'ionic-native';
import {AppManager} from '../../core/ocm/services/AppManager';

@Component({
    selector: 'img-uploader',
    templateUrl: 'build/components/imageuploader/imageuploader.html'
})
export class ImageUploader {

    mode: string;
    processingQuality: number;
    private imgData: any;
    targetWidth: number;
    targetHeight: number;

    constructor(private appManager: AppManager) {
      

        this.processingQuality = 0.8;
        this.targetWidth = 1024;
        this.targetHeight = 800;
    }

    loadCameraOrLibraryImage() {

        var _context = this;
        if (this.mode == "cordova") {
            Camera.getPicture({ targetWidth: this.targetWidth }).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                let base64Image = "data:image/jpeg;base64," + imageData;
                _context.imgData = imageData;

                _context.processImage();
            }, (err) => {
            });
        }

        if (this.mode == "web") {
            var reader = new FileReader();

            reader.onload = function() {

                _context.imgData = reader.result;

                _context.processImage();

            };

            reader.onerror = function() {
                alert("reader error");

            };

            reader.readAsDataURL((<any>document.getElementById("img-upload-media")).files[0]);
        }

    }

    processImage() {
        var _appContext = this;
        if (this.imgData != null) {
            // create an off-screen canvas
            var canvas = <HTMLCanvasElement>document.getElementById('img-upload-canvas');
            var ctx = canvas.getContext('2d');

            // set its dimension to target size


            // draw source image into the off-screen canvas:
            //ctx.drawImage(this.img, 0, 0, this.targetWidth, this.targetHeight);

            var img = new Image();

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // encode image to data-uri with base64 version of compressed image
                _appContext.imgData = canvas.toDataURL('image/png');

                //now ready to upload      
                (<HTMLImageElement>document.getElementById("test")).src = _appContext.imgData;
            }

            img.src = this.imgData;

        }
    }

    rotateImage() {
        //inspired by:http://jsfiddle.net/gfcarv/t4YX4/
        var canvas = <HTMLCanvasElement>document.getElementById('img-upload-canvas');

        // store current data to an image
        var rotatedImage = new Image();
        rotatedImage.src = canvas.toDataURL();

        rotatedImage.onload = function() {
            // reset the canvas with new dimensions
            var origHeight = canvas.height;
            var origWidth = canvas.width;
            canvas.width = origHeight;
            canvas.height = origWidth;

            origHeight = canvas.height;
            origWidth = canvas.width;

            var ctx = canvas.getContext('2d');
            ctx.save();

            ctx.translate(origWidth, origHeight / origWidth);
            ctx.rotate(Math.PI / 2);

            ctx.drawImage(rotatedImage, 0, 0);
            ctx.restore();

            rotatedImage = null;
        }
    }

    performUpload() {
        //var canvas = <HTMLCanvasElement>document.getElementById('img-upload-canvas');
        //this.imgData = canvas.toDataURL('image/jpeg', this.processingQuality);
        let submission = {
            chargePointID: 30798,
            comment: "test",
            imageDataBase64: this.imgData
        };
        this.appManager.submitMediaItem(submission);
    }
}
