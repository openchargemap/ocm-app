
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export enum LogLevel {
    VERBOSE,
    INFO,
    WARNING,
    ERROR
}

@Injectable({
    providedIn: 'root',
})
export class Logging {
    public logLevel: LogLevel;
    constructor() {
        this.logLevel = LogLevel.VERBOSE;

        if (environment.production){
            this.logLevel = LogLevel.ERROR;
        }
    }
    public log(msg: string, level: LogLevel = LogLevel.VERBOSE) {
        if (console && console.log && this.logLevel >= level) {
            console.log("[" + LogLevel[level] + "] {" + (new Date().toLocaleTimeString()) + "} " + msg);
        }
    }
}
