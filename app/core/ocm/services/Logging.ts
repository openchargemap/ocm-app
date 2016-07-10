
import {Injectable} from '@angular/core';
import {LogLevel} from '../Base';

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