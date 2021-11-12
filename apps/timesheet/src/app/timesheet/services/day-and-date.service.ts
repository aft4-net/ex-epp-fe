import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DaydateModel} from "../../models/daydate.model";

@Injectable({
  providedIn: 'root'
})
export class DayAndDateService {
  date = new Date();
  public weekDays: DaydateModel[] = [];
  firstday: any;
  lastday: any;
  firstday1: any;
  lastday1: any;

  constructor(private http: HttpClient) {
  }

  nextWeekDates(cuur1: any, increamt: any): any[] {
    this.clearData();
    this.computeFirstDay(cuur1);
    for (let i = 0; i <= 8; i++) {
      if (this.weekDays.length === 7) {
        break
      } else {
        if (i === 0) {
          continue;
        } else {
          this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
          let bb: DaydateModel;
          // eslint-disable-next-line prefer-const
          bb = this.lastday;
          this.weekDays.push(bb);
          this.lastday1 = bb;
        }
      }
    }
    return this.weekDays;
  }

  lastWeekDates(cuur1: any, decreament: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDayForPreviosWeek(cuur1);
      for (let i = 0; i >= -8; i--) {
        if (this.weekDays.length === 7) {
          break
        } else {
          if (i === 0) {
            continue;
          } else {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - i));
            let bb: DaydateModel;
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

  getWeekByDate(cuur1: any): any[] {
    if (cuur1 != null) {
      this.clearData();
      this.computeFirstDay(cuur1);
      for (let i = 0; i <= 8; i++) {
        if (this.weekDays.length === 7) {
          break
        } else {
          if (i === 0) {
            continue;
          } else {
            this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
            let bb: DaydateModel;
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

  computeFirstDayForPreviosWeek(cuur1: any) {
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - 6));
  }

  computeFirstDay(cuur1: any) {
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
  }

}
