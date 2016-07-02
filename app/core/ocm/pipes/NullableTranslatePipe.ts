import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

@Pipe({name: 'nullableTranslate'})
export class NullableTranslatePipe extends TranslatePipe {
    constructor(translate: TranslateService,  _ref: ChangeDetectorRef) {
        super(translate,_ref);

    }
  transform(query: string, ...args: any[]): any {
      return super.transform(query, ...args);
  // if (result==null) return "..no value..";
  }
}