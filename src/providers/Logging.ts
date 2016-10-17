
import {Injectable} from '@angular/core';

export enum LogLevel {
    VERBOSE,
    INFO,
    WARNING,
    ERROR
}

@Injectable()
export class Logging {
    public logLevel: LogLevel;
    constructor() {
        this.logLevel = LogLevel.VERBOSE;
    }
    public log(msg: string, level: LogLevel = LogLevel.VERBOSE) {
        if (console && console.log && this.logLevel >= level) {
            console.log("[" + LogLevel[level] + "] {" + (new Date().toLocaleTimeString()) + "} " + msg);
        }
    }
}