export interface IDateProvider {
  diffInHours(start_date: Date, end_date: Date): number;
  diffInDays(start_date: Date, end_date: Date): number;
  addDays(date: Date, days: number): Date;
  subtractDays(date: Date, days: number): Date;
  addHours(date: Date, hours: number): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
}