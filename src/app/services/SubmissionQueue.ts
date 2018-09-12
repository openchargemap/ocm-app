/**
* @author Christopher Cook
* @copyright Webprofusion Pty Ltd https://webprofusion.com
*/
import { AppManager } from './AppManager';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { SubmissionQueueItem, SubmissionType } from '../model/AppModels';

@Injectable({
    providedIn: 'root',
  })

export class SubmissionQueue {

    public isQueueProcessing: boolean;
    public appManager: AppManager;
    constructor(public events: Events) {
        this.isQueueProcessing = false;
    }
    public setAppManager(appMgr: AppManager) {
        this.appManager = appMgr;
    }

    /** Add item to submission queue */
    add(type: SubmissionType, data: any) {
        var q = this.getQueueItems();
        q.push(new SubmissionQueueItem(type, data));
        this.saveQueueItems(q);
    }

    update(item: SubmissionQueueItem) {
        var q = this.getQueueItems();
        var newQueue = new Array<SubmissionQueueItem>();
        q.forEach(element => {
            if (element.ID == item.ID) {
                newQueue.push(item);
            } else {
                newQueue.push(element);
            }
        });
        return newQueue;
    }

    /**
     * Begin/continue processing items from the submission queue
     */
    processNextQueueItem() {
        var queueItem: SubmissionQueueItem = this.getNextQueueItem();

        if (queueItem != null) {
            if (this.appManager != null) {
                this.appManager.api.performSubmission(queueItem.SubmissionType, queueItem.Data).then(() => {

                    queueItem.IsSubmitted = true;
                    queueItem.Attempts++;
                    this.update(queueItem);
                    this.clear();
                });
            }
        }
    }

    getNextQueueItem(): SubmissionQueueItem {
        var q = this.getQueueItems();
        var nextItem: SubmissionQueueItem = null;
        q.forEach(element => {
            if (nextItem == null) {
                if (!element.IsCancelled && !element.IsInProgress && !element.IsSubmitted) {
                    nextItem = element;
                }
            }
        });

        return nextItem;
    }

    hasPendingItems() {
        var pendingItems = false;
        var q = this.getQueueItems();
        q.forEach(element => {
            if (!element.IsFailure && !element.IsCancelled && !element.IsSubmitted) {
                pendingItems = true;
            }
        });

        return pendingItems;
    }
    /**
     * Check all jobs are done (or no longer required)
     */
    isCompleted(): boolean {
        var q = this.getQueueItems();
        var allItemsCompleted = true;
        q.forEach(element => {
            if (element.IsInProgress || element.IsFailure) {
                allItemsCompleted = false;
            }
        });
        return allItemsCompleted;
    }

    /**
     * Clear completed items from queue
     *  */
    clear(clearAll: boolean = false) {
        var q = this.getQueueItems();
        //if any queue items are still pending, keep them
        var newQueue = new Array<SubmissionQueueItem>();
        if (!clearAll) {
            q.forEach(element => {
                if (element.IsInProgress || element.IsFailure) {
                    newQueue.push(element);
                }
            });
        }

        this.saveQueueItems(newQueue);
    }

    private saveQueueItems(queueItems: Array<SubmissionQueueItem>) {
        localStorage.setItem("submissionQueue", JSON.stringify(queueItems));
    }

    private getQueueItems(): Array<SubmissionQueueItem> {
        var q = localStorage.getItem("submissionQueue");
        if (q != null) {
            return <Array<SubmissionQueueItem>>JSON.parse(q);
        } else {
            return new Array<SubmissionQueueItem>();
        }
    }
}
