import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

@Pipe({
  name: 'dynamicMoment'
})
export class MomentPipe implements PipeTransform {
  /**
   * MomentPipe constructor
   * @param {TranslateService} translate
   */
  constructor(private translate: TranslateService) {
  }

  /**
   * Make moment dynamic
   * @param {string} value
   * @param {string} format
   * @returns {any}
   */
  transform(value: string, format?: string): any {
    format = format ? format : 'Do MMMM  YYYY';
    const initVal = moment(value).locale(moment.locale()).format(format);
    const momentObs = new BehaviorSubject<string>(initVal);
    this.translate.onLangChange.subscribe(() => {
      const val = moment(value).locale(moment.locale()).format(format);
      momentObs.next(val);
    });
    return momentObs;
  }
}
