import { SubmissionType } from './SubmissionType';

/**
 * Queue item for user submissions.
 */
export class SubmissionQueueItem {
    ID: string;
    SubmissionType: SubmissionType;
    Data: any;
    Attempts: number;
    DateQueued: Date;
    IsSubmitted: boolean;
    IsInProgress: boolean;
    IsCancelled: boolean;
    IsFailure: boolean;
    FailureReason: string;

    constructor(type: SubmissionType, data: any) {
        this.SubmissionType = type;
        this.Data = data;
        this.DateQueued = new Date();
        this.IsSubmitted = false;
        this.IsInProgress = false;
        this.IsCancelled = false;
        this.IsFailure = false;
        this.Attempts = 0;
        this.ID = new Date() + '_' + (Math.random() * 100); // simple id string
    }
}

