import { injector } from '../services/injector';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

/**
 * Global translation function
 * https://github.com/ngx-translate/core#usage
 * @param {string} message
 * @return {Promise<string | any>}
 * @private
 */
export const __ = async (message: string) => {
  const injectr: Injector = injector();
  const Translate: TranslateService = injectr.get(TranslateService);
  const translation = await Translate.get(message).toPromise();
  return translation;
};

/**
 * Get message immediatly.
 * USE WITH CAUTION.
 * https://github.com/ngx-translate/core#usage
 * @param {string} message
 * @return {string}
 * @private
 */
export const _i = (message: string): string => {
  // use with CAUTION
  const injectr: Injector = injector();
  const Translate: TranslateService = injectr.get(TranslateService);
  const key = _(message);
  return Translate.instant(key);
};
