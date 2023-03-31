import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHandlingProvider {
  isAfter(date: Date, dateToBeCompared: Date) {
    return date.getTime() > dateToBeCompared.getTime();
  }

  addHours(date: Date, numberOfHours: number): Date {
    const hoursInMilliseconds = numberOfHours * 3600000;
    return new Date(date.getTime() + hoursInMilliseconds);
  }
}
