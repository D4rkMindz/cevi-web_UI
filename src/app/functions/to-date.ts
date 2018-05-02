/**
 * Convert a string to Date
 * @param {string | Date} yyyyMmDd
 * @return {Date}
 */
export function toDate(yyyyMmDd: string | Date): Date {
  if (!yyyyMmDd) {
    return null;
  }
  if (yyyyMmDd instanceof Date) {
    return yyyyMmDd;
  }
  const [year, month, day] = yyyyMmDd.split('-');
  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
}
