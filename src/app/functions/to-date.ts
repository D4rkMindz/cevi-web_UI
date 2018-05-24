import * as moment from 'moment';
import { Moment } from 'moment';

/**
 * @param {string | Date} yyyyMmDd
 * @returns {Moment}
 */
export function toDate(yyyyMmDd: string | Date): Moment {
  if (!yyyyMmDd) {
    return null;
  }
  return moment(yyyyMmDd);
}
