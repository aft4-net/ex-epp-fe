import {Component, OnInit} from '@angular/core';
import {DatePipe, WeekDay} from "@angular/common";
import {DaydateModel} from "../models/daydate.model";
import {DayAndDateService} from "./services/day-and-date.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  drawerVisible = false;
  currentItem = 'Television';
  date = new Date();
  maxDate = 7;
  dates? = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  myWeek: DaydateModel[] = [];

  constructor(public datepipe: DatePipe, private dayAndDateService: DayAndDateService) {
    // this.myWeek = this.dayAndDateService.getWeekTimesheet();
  }


  public weekDays: any[] = [];
  curr = new Date;
  curr1 = new Date;
  firstday: any;
  lastday: any;
  firstday1: any;
  lastday1: any;
  parentCount = null;
  nextWeeks = null;
  lastWeeks = null;

  ngOnInit(): void {
    this.weekDays = this.dayAndDateService.myFunction1(this.curr);
  }

  displayCounter(count: any) {
    this.parentCount = count;
    if (count != null) {
      this.weekDays = this.dayAndDateService.myFunction1(count);
    } else {
      window.location.reload();
    }
  }

  myFunction2(curr: any) {
    if (curr != null) {
      this.weekDays = this.dayAndDateService.myFunction1(curr);
    } else {
      window.location.reload();
    }
  }

  displayCounterForNextWeek(count: any) {
    this.nextWeeks = count;
    console.log(this.nextWeeks);
    let ss = this.dayAndDateService.getWeekend();
    this.weekDays = this.dayAndDateService.myFunction10(ss, count);
  }

  displayCounterForLastWeek(count: any) {
    this.lastWeeks = count;
    console.log(this.lastWeeks);
    let ss = this.dayAndDateService.getWeekendFirstDay();
    this.weekDays = this.dayAndDateService.myFunction11(ss, count);
  }

  // myFunction10(cuur1: any, increamt: any) {
  //   if (cuur1 != null) {
  //     this.weekDays = this.dayAndDateService.myFunctionWeek1(cuur1, increamt);
  //   } else {
  //     window.location.reload();
  //   }
  // }
  //
  // myFunction11(cuur1: any, decreament: any) {
  //   this.weekDays = this.dayAndDateService.myFunctionWeek0(cuur1, decreament);
  // }

  // myFunctionWeek0(cuur1: any, decrease: any) {
  //   if (cuur1 != null) {
  //     this.weekDays = [];
  //     this.lastday = '';
  //     this.firstday = '';
  //     this.lastday1 = '';
  //     this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
  //     this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - 6));
  //     // this.firstday1 = null;
  //     for (let i = 0; i >= -8; i--) {
  //       if (this.weekDays.length === 7) {
  //         break
  //       } else {
  //         if (i === 0) {
  //           continue;
  //         } else {
  //           this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() - i));
  //           this.weekDays.push(this.lastday);
  //           this.lastday1 = this.lastday;
  //           // if (this.firstday1 == null) {
  //           //   this.firstday1 = this.lastday;
  //           // }
  //         }
  //       }
  //     }
  //   } else {
  //     // this.myFunction2(this.curr1);
  //     // this.ngOnInit();
  //     window.location.reload();
  //   }
  //   return this.weekDays;
  // }

  // myFunctionWeek1(cuur1: any, inc: any) {
  //   if (cuur1 != null) {
  //     this.weekDays = [];
  //     this.lastday = '';
  //     this.firstday = '';
  //     this.lastday1 = '';
  //     this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
  //     this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
  //     // this.firstday1 = null;
  //     for (let i = 0; i <= 8; i++) {
  //       if (this.weekDays.length === 7) {
  //         break
  //       } else {
  //         if (i === 0) {
  //           continue;
  //         } else {
  //           this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
  //           this.weekDays.push(this.lastday);
  //           this.lastday1 = this.lastday;
  //           // if (this.firstday1 == null) {
  //           //   this.firstday1 = this.lastday;
  //           // }
  //         }
  //       }
  //     }
  //   } else {
  //     // this.myFunction2(this.curr1);
  //     // this.ngOnInit();
  //     window.location.reload();
  //   }
  //   return this.weekDays;
  // }

  // myFunction1(cuur1: any) {
  //   if (cuur1 != null) {
  //     this.weekDays = [];
  //     this.lastday = '';
  //     this.firstday = '';
  //     this.lastday1 = '';
  //     this.firstday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay()))
  //     this.firstday1 = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + 1));
  //     // this.firstday1 = null;
  //     for (let i = 0; i <= 8; i++) {
  //       if (this.weekDays.length === 7) {
  //         break
  //       } else {
  //         if (i === 0) {
  //           continue;
  //         } else {
  //           this.lastday = new Date(cuur1.setDate(cuur1.getDate() - cuur1.getDay() + i));
  //           this.weekDays.push(this.lastday);
  //           this.lastday1 = this.lastday;
  //           // if (this.firstday1 == null) {
  //           //   this.firstday1 = this.lastday;
  //           // }
  //         }
  //       }
  //     }
  //   } else {
  //     // this.myFunction2(this.curr1);
  //     // this.ngOnInit();
  //     window.location.reload();
  //   }
  //   return this.weekDays;
  // }

  // get myFunction() {
  //   this.lastday = '';
  //   this.firstday = '';
  //   // this.lastday1 = '';
  //   this.firstday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay()));
  //   // this.firstday1 = null;
  //   for (let i = 0; i <= 8; i++) {
  //     if (this.weekDays.length === 7) {
  //       break
  //     } else {
  //       if (i === 0) {
  //         continue;
  //       } else {
  //         this.lastday = new Date(this.curr.setDate(this.curr.getDate() - this.curr.getDay() + i));
  //         this.weekDays.push(this.lastday);
  //         this.lastday1 = this.lastday;
  //         if (this.firstday1 == null) {
  //           this.firstday1 = this.lastday;
  //         }
  //       }
  //     }
  //   }
  //   return this.weekDays;
  // }

  dateColumnClicked() {
    this.drawerVisible = true;
  }

  closeTimesheetDrawer() {
    this.drawerVisible = false;
  }

}
