import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DaydateModel} from "../../models/daydate.model";

@Injectable({
  providedIn: 'root'
})
export class DayAndDateService {
  currentItem = 'Television';
  date = new Date();
  maxDate = 7;
  dates? = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  myWeek: DaydateModel[] = [];
  public weekDays: DaydateModel[] = [];

  constructor(private http: HttpClient) {
  }


  curr = new Date;
  curr1 = new Date;
  firstday: any;
  lastday: any;
  firstday1: any;
  lastday1: any;
  parentCount = null;
  nextWeeks = null;
  lastWeeks = null;

  nextWeekDates(cuur1: any, increamt: any): any[] {
    this.weekDays = [];
    this.lastday = '';
    this.firstday = '';
    this.lastday1 = '';
    this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
    this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
    // this.firstday1 = null;
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
    // return this.myFunctionWeek1(cuur1, increamt);
  }

  lastWeekDates(cuur1: any, decreament: any): any[] {
    if (cuur1 != null) {
      this.weekDays = [];
      this.lastday = '';
      this.firstday = '';
      this.lastday1 = '';
      this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
      this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - 6));
      // this.firstday1 = null;
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
            // if (this.firstday1 == null) {
            //   this.firstday1 = this.lastday;
            // }
          }
        }
      }
    }
    return this.weekDays;
    // this.weekDays = this.myFunctionWeek0(cuur1, decreament);
    // return this.weekDays;
  }

  getWeekend(): any {
    return this.lastday1;
  }

  getWeekendFirstDay(): any {
    return this.firstday1;
  }

  
  weekByDate(cuur1: any): any[] {
    if (cuur1 != null) {
      this.weekDays = [];
      this.lastday = '';
      this.firstday = '';
      this.lastday1 = '';
      this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
      this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
      // this.firstday1 = null;
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
    } else {
      // this.myFunction2(this.curr1);
      // this.ngOnInit();
      window.location.reload();
    }
    return this.weekDays;
  }


}
