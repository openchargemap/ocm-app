/**
 * Used for messsaging in general async calls where the result may have an error
 */
export class AsyncResult {
    Result: any;
    HasError: boolean = false;
    ErrorType: string = null;
    Data: any;

    constructor(result?: any, hasError?: boolean, errorType?: string, data?: any) {
        if (hasError != null) {
            this.HasError = hasError;
        }

        this.Result = result;
        this.ErrorType = errorType;
        this.Data = data;
    }
}
