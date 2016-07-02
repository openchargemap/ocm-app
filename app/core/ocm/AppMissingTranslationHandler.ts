import {MissingTranslationHandler} from 'ng2-translate/ng2-translate';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(key: string) {
      return 'some value';
  }
}