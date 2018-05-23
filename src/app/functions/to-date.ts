import * as moment from 'moment';

/**
 * @param {string | Date} yyyyMmDd
 * @returns {Moment}
 */
export function toDate(yyyyMmDd: string | Date): moment.Moment {
  if (!yyyyMmDd) {
    return null;
  }
  if (yyyyMmDd instanceof Date) {
    return moment(yyyyMmDd.toString());
  }
  return moment(yyyyMmDd);
}
