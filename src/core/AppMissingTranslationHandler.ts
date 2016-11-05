import { MissingTranslationHandlerParams } from 'ng2-translate/ng2-translate';
import {MissingTranslationHandler} from 'ng2-translate/ng2-translate';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
      return params.key;
  }
}