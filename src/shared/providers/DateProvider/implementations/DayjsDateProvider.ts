import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import locale from 'dayjs/locale/pt-br'

import { IDateProvider } from '../IDateProvider';

export class DayjsDateProvider implements IDateProvider {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  diffInMinutes(end_date: Date, start_date: Date): number {
    const normalizeEndDate = dayjs(end_date).utc().local().format();
    const normalizeStartDate = dayjs(start_date).utc().local().format();

    return dayjs(normalizeEndDate).diff(normalizeStartDate, 'minutes');
  }

  diffInHours(end_date: Date, start_date: Date): number {
    const normalizeEndDate = dayjs(end_date).utc().local().format();
    const normalizeStartDate = dayjs(start_date).utc().local().format();

    return dayjs(normalizeEndDate).diff(normalizeStartDate, 'hours');
  }

  diffInDays(end_date: Date, start_date: Date): number {
    const normalizeEndDate = dayjs(end_date).utc().local().format();
    const normalizeStartDate = dayjs(start_date).utc().local().format();

    return dayjs(normalizeEndDate).diff(normalizeStartDate, 'days');
  }

  addDays(date: Date | number, days: number): Date {
    return dayjs(date).add(days, 'days').toDate();
  }

  subtractDays(date: Date | number, days: number): Date {
    console.log('locale', dayjs.locale())
    return dayjs().subtract(days, 'days').toDate();
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, 'hours').toDate();
  }

  isBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  getWeekDays(date: Date) {
    const first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstWeekDay = new Date(date.setDate(first)).toUTCString();
    const lastWeekDay = new Date(date.setDate(last)).toUTCString();

    return { firstWeekDay, lastWeekDay}
  }

  getMonthDays(date: Date) {
    const firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return { firstMonthDay, lastMonthDay}
  }

  getDateByTimezone(timezone: string) {
    const offset = dayjs().tz(timezone).utcOffset();

    const MIN_IN_MILLSECONDS = 60 * 1000;

    const time = new Date().getTime() + (offset * MIN_IN_MILLSECONDS);

    return new Date(time);
  }
}
