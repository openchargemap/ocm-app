import { Pipe, ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Injectable()
@Pipe({ name: 'nullableTranslate' })
export class NullableTranslatePipe extends TranslatePipe {
    constructor(translate: TranslateService, _ref: ChangeDetectorRef) {
        super(translate, _ref);
    }

    transform(query: string, ...args: any[]): any {

        let result = super.transform(query, ...args);
        if (result == query) {
            if (args != null && args[0].default) {
                return args[0].default;
            } else {
                if (args[0].Title) {
                    return args[0].Title;
                } else {
                    return result;
                }
                // return "..no value..";
            }

        } else {
            return result;
        }
    }
}
