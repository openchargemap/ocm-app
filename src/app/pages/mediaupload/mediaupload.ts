import { AppManager } from './../../services/AppManager';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController } from '@ionic/angular';
import { Logging, LogLevel } from '../../services/Logging';

type UploadStatus = 'ready' | 'uploading' | 'uploaded' | 'failed';
type ItemProcessState = 'idle' | 'processing' | 'rotating' | 'error';

interface UploadReviewItem {
    id: string;
    file: File;
    previewUrl: string;
    comment: string;
    rotationDeg: 0 | 90 | 180 | 270;
    uploadStatus: UploadStatus;
    processState: ItemProcessState;
    lastError?: string;
    sizeBytes: number;
    width?: number;
    height?: number;
}

@Component({
    templateUrl: 'mediaupload.html',
    styleUrls: ['./mediaupload.scss'],
    standalone: false
})
export class MediaUploadPage implements OnDestroy {

    readonly maxBatchFiles = 10;
    readonly maxFileSizeBytes = 12 * 1024 * 1024;
    readonly maxImageLongEdgePx = 1600;
    readonly uploadJpegQuality = 0.78;

    mode: string;
    chargePointId: number;
    poi: any;

    isBatchReviewOpen: boolean;
    batchItems: UploadReviewItem[];
    isBatchUploading: boolean;

    private processingQueue: Promise<unknown> = Promise.resolve();

    @ViewChild('inputFile', { static: true })
    inputFileRef!: ElementRef<HTMLInputElement>;

    @ViewChild('processingCanvas', { static: true })
    processingCanvasRef!: ElementRef<HTMLCanvasElement>;


    constructor(
        public navParams: NavParams,
        public appManager: AppManager,
        public nav: NavController,
        private modalController: ModalController,
        private alertController: AlertController,
        public logging: Logging
    ) {
        this.mode = appManager.platformMode;
        this.chargePointId = this.navParams.get('id');
        this.poi = this.navParams.get('poi');

        this.isBatchReviewOpen = false;
        this.batchItems = [];
        this.isBatchUploading = false;
    }

    ngOnDestroy(): void {
        this.cleanupBatchState();
    }

    onChoosePhoto(): void {
        if (this.isBatchUploading) {
            return;
        }

        this.inputFileRef?.nativeElement?.click();
    }

    async onFileSelectionChanged(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files || []);

        if (!files.length) {
            this.resetFileInput();
            return;
        }

        const { validFiles, messages } = this.validateSelection(files);
        for (const message of messages) {
            await this.appManager.showToastNotification(message);
        }

        if (!validFiles.length) {
            this.resetFileInput();
            return;
        }

        this.activateBatchFiles(validFiles);

        this.resetFileInput();
    }

    isBrowserMode(): boolean {
        return (this.appManager.isPlatform('desktop') || this.appManager.isPlatform('hybrid'));
    }

    async uploadBatchItems(retryOnlyFailed: boolean): Promise<void> {
        const targetItems = this.batchItems.filter((item) => {
            if (retryOnlyFailed) {
                return item.uploadStatus === 'failed';
            }
            return item.uploadStatus === 'ready' || item.uploadStatus === 'failed';
        });

        if (!targetItems.length) {
            await this.appManager.showToastNotification('No photos pending upload.');
            return;
        }

        this.isBatchUploading = true;

        for (const item of targetItems) {
            item.uploadStatus = 'uploading';
            item.processState = 'processing';
            item.lastError = undefined;

            try {
                const base64Image = await this.generateUploadDataForItem(item);
                await this.appManager.submitMediaItem({
                    chargePointID: this.chargePointId,
                    comment: item.comment,
                    imageDataBase64: base64Image
                });

                item.uploadStatus = 'uploaded';
                item.processState = 'idle';
            } catch (error: any) {
                item.uploadStatus = 'failed';
                item.processState = 'error';
                item.lastError = error?.message || 'Upload failed';
                this.logging.log(`Batch upload failed for ${item.file.name}: ${item.lastError}`, LogLevel.ERROR);
            }
        }

        this.isBatchUploading = false;

        if (this.failedCount > 0) {
            await this.appManager.showToastNotification(`Upload finished with ${this.failedCount} failed photo(s).`);
            return;
        }

        await this.appManager.showToastNotification('Upload completed');
        await this.modalController.dismiss();
    }

    async rotateBatchItem(item: UploadReviewItem): Promise<void> {
        if (this.isBatchUploading || item.uploadStatus === 'uploading') {
            return;
        }

        const previousRotation = item.rotationDeg;
        item.rotationDeg = this.nextRotation(item.rotationDeg);
        item.processState = 'rotating';
        item.lastError = undefined;

        try {
            const nextPreviewUrl = await this.generatePreviewUrlForItem(item);
            const oldPreviewUrl = item.previewUrl;
            item.previewUrl = nextPreviewUrl;
            URL.revokeObjectURL(oldPreviewUrl);

            item.processState = 'idle';
        } catch (error: any) {
            item.rotationDeg = previousRotation;
            item.processState = 'error';
            item.lastError = error?.message || 'Failed to rotate preview';
        }
    }

    removeBatchItem(itemId: string): void {
        if (this.isBatchUploading) {
            return;
        }

        const idx = this.batchItems.findIndex((item) => item.id === itemId);
        if (idx < 0) {
            return;
        }

        URL.revokeObjectURL(this.batchItems[idx].previewUrl);
        this.batchItems.splice(idx, 1);

        if (this.batchItems.length === 0) {
            this.isBatchReviewOpen = false;
        }
    }

    async requestBatchReviewClose(): Promise<void> {
        if (this.isBatchUploading) {
            return;
        }

        await this.confirmAndCloseBatchReview();
    }

    async cancel() {
        this.cleanupBatchState();
        await this.modalController.dismiss();
    }

    get failedCount(): number {
        return this.batchItems.filter((item) => item.uploadStatus === 'failed').length;
    }

    get hasBatchPendingUploads(): boolean {
        return this.batchItems.some((item) => item.uploadStatus === 'ready' || item.uploadStatus === 'failed');
    }

    trackByItemId(index: number, item: UploadReviewItem): string {
        return item.id;
    }

    private validateSelection(files: File[]): { validFiles: File[], messages: string[] } {
        const messages: string[] = [];
        const validFiles: File[] = [];

        if (files.length > this.maxBatchFiles) {
            messages.push(`You can upload up to ${this.maxBatchFiles} photos at once. Extra files were ignored.`);
        }

        const candidateFiles = files.slice(0, this.maxBatchFiles);

        let rejectedTypeCount = 0;
        let rejectedSizeCount = 0;

        for (const file of candidateFiles) {
            if (!this.isSupportedImageFile(file)) {
                rejectedTypeCount++;
                continue;
            }

            if (file.size > this.maxFileSizeBytes) {
                rejectedSizeCount++;
                continue;
            }

            validFiles.push(file);
        }

        if (rejectedTypeCount > 0) {
            messages.push(`${rejectedTypeCount} file(s) were rejected because they are not valid image types.`);
        }

        if (rejectedSizeCount > 0) {
            messages.push(`${rejectedSizeCount} file(s) were rejected because they exceed 12 MB.`);
        }

        return { validFiles, messages };
    }

    private isSupportedImageFile(file: File): boolean {
        return !!file?.type && file.type.startsWith('image/');
    }

    private activateBatchFiles(files: File[]): void {
        this.cleanupBatchState();

        this.batchItems = files.map((file, index) => ({
            id: `${Date.now()}-${index}-${file.name}`,
            file,
            previewUrl: URL.createObjectURL(file),
            comment: '',
            rotationDeg: 0,
            uploadStatus: 'ready',
            processState: 'idle',
            sizeBytes: file.size
        }));

        this.isBatchReviewOpen = true;
    }

    private async generateUploadDataForItem(item: UploadReviewItem): Promise<string> {
        return this.enqueueImageProcessing(async () => {
            const data = await this.processFileToJpegBase64(
                item.file,
                item.rotationDeg,
                this.maxImageLongEdgePx,
                this.uploadJpegQuality
            );
            return data;
        });
    }

    private async generatePreviewUrlForItem(item: UploadReviewItem): Promise<string> {
        const previewBlob = await this.enqueueImageProcessing(() =>
            this.processFileToJpegBlob(item.file, item.rotationDeg, this.maxImageLongEdgePx, this.uploadJpegQuality)
        );

        return URL.createObjectURL(previewBlob);
    }

    private enqueueImageProcessing<T>(task: () => Promise<T>): Promise<T> {
        const nextTask = this.processingQueue.then(task, task);
        this.processingQueue = nextTask.then(() => undefined, () => undefined);
        return nextTask;
    }

    private async processFileToJpegBase64(file: File, rotationDeg: 0 | 90 | 180 | 270, maxLongEdge: number, quality: number): Promise<string> {
        const canvas = await this.renderFileToCanvas(file, rotationDeg, maxLongEdge);
        return canvas.toDataURL('image/jpeg', quality);
    }

    private async processFileToJpegBlob(file: File, rotationDeg: 0 | 90 | 180 | 270, maxLongEdge: number, quality: number): Promise<Blob> {
        const canvas = await this.renderFileToCanvas(file, rotationDeg, maxLongEdge);

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Could not generate preview blob'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg', quality);
        });
    }

    private async renderFileToCanvas(file: File, rotationDeg: 0 | 90 | 180 | 270, maxLongEdge: number): Promise<HTMLCanvasElement> {
        const image = await this.loadImageFromFile(file);
        const canvas = this.processingCanvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Image canvas unavailable');
        }

        const sourceWidth = image.naturalWidth || image.width;
        const sourceHeight = image.naturalHeight || image.height;
        const rotated = rotationDeg === 90 || rotationDeg === 270;
        const rotatedWidth = rotated ? sourceHeight : sourceWidth;
        const rotatedHeight = rotated ? sourceWidth : sourceHeight;
        const scale = Math.min(1, maxLongEdge / Math.max(rotatedWidth, rotatedHeight));

        canvas.width = Math.max(1, Math.round(rotatedWidth * scale));
        canvas.height = Math.max(1, Math.round(rotatedHeight * scale));

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        switch (rotationDeg) {
            case 90:
                ctx.translate(canvas.width, 0);
                ctx.rotate(Math.PI / 2);
                break;
            case 180:
                ctx.translate(canvas.width, canvas.height);
                ctx.rotate(Math.PI);
                break;
            case 270:
                ctx.translate(0, canvas.height);
                ctx.rotate(-Math.PI / 2);
                break;
            default:
                break;
        }

        const drawWidth = rotated ? canvas.height : canvas.width;
        const drawHeight = rotated ? canvas.width : canvas.height;
        ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
        ctx.restore();

        return canvas;
    }

    private loadImageFromFile(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();

            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Could not decode image'));
            };

            img.src = url;
        });
    }

    private nextRotation(rotationDeg: 0 | 90 | 180 | 270): 0 | 90 | 180 | 270 {
        const next = (rotationDeg + 90) % 360;
        return next as 0 | 90 | 180 | 270;
    }

    private cleanupBatchState(revokeUrls: boolean = true): void {
        if (revokeUrls) {
            for (const item of this.batchItems) {
                URL.revokeObjectURL(item.previewUrl);
            }
        }
        this.batchItems = [];
        this.isBatchReviewOpen = false;
        this.isBatchUploading = false;
    }

    private async confirmAndCloseBatchReview(): Promise<void> {
        if (!this.batchItems.length) {
            this.cleanupBatchState();
            return;
        }

        const alert = await this.alertController.create({
            header: 'Discard selected photos?',
            message: 'Closing the review will remove the selected photos and any comments you added.',
            buttons: [
                {
                    text: 'Keep Reviewing',
                    role: 'cancel'
                },
                {
                    text: 'Discard',
                    role: 'destructive'
                }
            ]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === 'destructive') {
            this.cleanupBatchState();
        }
    }

    private resetFileInput(): void {
        const input = this.inputFileRef?.nativeElement;
        if (input) {
            input.value = '';
        }
    }
}
