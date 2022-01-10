import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DaydateModel} from "../../models/daydate.model";

@Injectable({
  providedIn: 'root'
})
export class DayAndDateService {
  date = new Date();
  weekDays: Date[] = [];
  firstday: any;
  lastday: any;
  firstday1: any;
  lastday1: any;
  fs = 1;

  constructor(private http: HttpClient) {
  }

  getWeeksFirstDate(date: Date) {
    let firstDayOfTheWeek;
    const weekDays = 7;
    const startOfWeek = this.setFirstWeeksFirstDay()

    if (date.getDay() === 0) {
      firstDayOfTheWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startOfWeek - weekDays);
    }
    else {
      firstDayOfTheWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + startOfWeek);
    }

    return firstDayOfTheWeek;
  }

  getWeeksLastDate(date: Date) {
    let lastDate = this.getWeeksFirstDate(date);

    return new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 6);
  }

  getRangeOfDates(fromDate: Date, toDate: Date) {
    let dates = [];
    let startDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    let endDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    while (startDate <= endDate) {
      dates.push(startDate);
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
    }
    return dates;
  }

  nextWeekDates(cuur1: any, increamt: any): any[] {
    this.clearData();
    this.computeFirstDay(cuur1);
    let y = 0;
    y = this.getIterationSizeForWeeks('future', this.getWeekendFirstDay());
    for (let i = 0; i <= y; i++) {
      if (this.weekDays.length === 7) {
        break
      } else {
        if (i < this.fs) {
          continue;
        } else {

          if (i == 8) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else if (i == 9) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 2));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else if (i == 10) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 3));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else if (i == 11) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 4));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else if (i == 12) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 5));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else if (i == 13) {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 6));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          } else {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
            let bb: Date;
            // eslint-disable-next-line prefer-const
            bb = this.lastday;
            this.weekDays.push(bb);
            this.lastday1 = bb;
          }
        }
      }
    }
    return this.weekDays;
  }

  getWeekByDate(cuur1: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDay(cuur1);
      let weekLen = 7;
      let date = new Date(this.firstday1);
      for (let i = 0; i < weekLen; i++) {
        this.weekDays.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
      }
      this.lastday1 = new Date(this.weekDays[weekLen - 1]);
    }
    return this.weekDays;
  }

  lastWeekDates(cuur1: any, decreament: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDayForPreviosWeek(cuur1);
      let y = 0;
      y = this.getIterationSizeForWeeks('prev', this.getWeekendFirstDay());
      for (let i = 0; i >= y; i--) {
        if (this.weekDays.length === 7) {
          break
        } else {
          if (i > -this.setFirstWeeksFirstDay()) {
            continue;
          } else {
            if (i == -8) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else if (i == -9) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 2));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else if (i == -10) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 3));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else if (i == -11) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 4));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else if (i == -12) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 5));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else if (i == -13) {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 6));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            } else {
              this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - i));
              let bb: Date;
              // eslint-disable-next-line prefer-const
              bb = this.lastday;
              this.weekDays.push(bb);
              this.lastday1 = bb;
            }
          }
        }
      }
    }
    this.getWeekendFirstDay();

    return this.weekDays;
  }

  getIterationSizeForWeeks(methodss: string, firstWFirstD: number): any {
    let y = 8;
    let y1 = -8;
    if (methodss === 'initial' || methodss === 'future') {

      if (firstWFirstD == 2) {
        y = 9;
      } else if (firstWFirstD == 3) {
        y = 10;
      } else if (firstWFirstD == 4) {
        y = 11;
      } else if (firstWFirstD == 5) {
        y = 12;
      } else if (firstWFirstD == 6) {
        y = 13;
      }
      return y;
    } else if (methodss === 'prev') {
      if (firstWFirstD == 2) {
        y1 = -9;
      } else if (firstWFirstD == 3) {
        y1 = -10;
      } else if (firstWFirstD == 4) {
        y1 = -11;
      } else if (firstWFirstD == 5) {
        y1 = -12;
      } else if (firstWFirstD == 6) {
        y1 = -13;
      }
      return y1;
    }

  }

  getWeekendLastDay(): any {
    return this.lastday1;
  }

  getWeekendFirstDay(): any {
    return this.firstday1;
  }

  clearData() {
    this.weekDays = [];
    this.lastday = '';
    this.firstday = '';
    this.lastday1 = '';
  }

  setFirstWeeksFirstDay() {
    if (this.fs > 1 && this.fs <= 6)
      return this.fs;
    else
      return 1;
  }

  computeFirstDayForPreviosWeek(cuur1: any) {
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - this.setFirstWeeksFirstDay()));
  }

  computeFirstDay(cuur1: any) {
    this.firstday1 = this.getWeeksFirstDate(cuur1);
    
  }

}
