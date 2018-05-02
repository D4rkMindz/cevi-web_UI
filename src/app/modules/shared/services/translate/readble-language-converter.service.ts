import { Injectable } from '@angular/core';
import { config } from '../../../../config/config';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../../functions/translation';

@Injectable()
export class ReadableLanguageConverterService {

  /**
   * Get human readable language
   * @param {string} lang
   * @return {Promise<string>}
   */
  public async getReadbleLanguage(lang: string) {
    if (!config.defaults.language.availableLanguages.includes(lang)) {
      return 'N/A';
    }

    let readableLang = 'n/a';
    let key = 'n/a';

    switch (lang) {
      case 'de': {
        key = <string>_('German');
        break;
      }
      case 'en': {
        key = <string>_('English');
        break;
      }
      case 'fr': {
        key = <string>_('French');
        break;
      }
      case 'it': {
        key = <string>_('Italian');
        break;
      }
      default: {
        key = <string>_('N/A');
        break;
      }
    }

    readableLang = await __(key);


    return readableLang;
  }
}
