import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { GetClient } from '../../Models/get-client';
import { GetProject } from '../../Models/get-project';
import { ViewReportService } from '../../services/view-report.service';


@Component({
  selector: 'exec-epp-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

 // date = null;
 today:any; 
  isEnglish = false;
  //disabledDate = false;
  clientList: GetClient[] = [];
  projectList: GetProject[] =[];
  public listOfClients: [GetClient] | [] =[];
  public listOfProjects: [GetProject] | [] =[];
  constructor(
    private reportService:ViewReportService
  ) { 
   
  }

  ngOnInit(): void {
    registerLocaleData(en);
    this.today = new Date();
  const timeDefaultValue = setHours(new Date(), 0);
  }
 // size: NzButtonSize = 'large';
  //size: 'small' | 'middle' | 'large' | number = 'small';
  getAllClientList(){
    this.reportService.getClientList().subscribe(
    (res) => {
      this.listOfClients = res;
    }
  );
}


getAllProjectList(){
  this.reportService.getProjectList().subscribe(
  (res) => {
    this.listOfProjects = res;
  }
);
}

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;
 
  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(0, 24).splice(4, 20),
    nzDisabledMinutes: () => this.range(30, 60),
    nzDisabledSeconds: () => [55, 56]
  });

  disabledRangeTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => this.range(0, 60).splice(4, 20),
        nzDisabledMinutes: () => this.range(30, 60),
        nzDisabledSeconds: () => [55, 56]
      };
    }
    return {
      nzDisabledHours: () => this.range(0, 60).splice(20, 4),
      nzDisabledMinutes: () => this.range(0, 31),
      nzDisabledSeconds: () => [55, 56]
    };
  };

    // interface reports {
    //   no:number;
    //   employeeName:string;
    //   role:string;
    //   billableHours:string ;
    //   nonBillableHours:string;
    //   projectName:string;
    //   clientName:string;
          
    // }
    onChange(): void {
      ;
    }
  
    getWeek(result: Date): void {
     // console.log('week: ', getISOWeek(result));
    }
  
    


  reports: any[]=[
    {
      projectName: "Epp",
      employees: [
        {
          no: "1",
          employeeName: "Amanuel Zewdu",
          role : "Developer",
          billableHours: "8",
          nonBillableHours:"0",
          projectName : "Epp",
          clientName:"Excellerent ",
    
        },
        {
          no: "2",
          employeeName: "Ashenafi Fisseha",
          role : "Developer",
          billableHours: "8",
          nonBillableHours:"0",
          projectName : "Epp",
          clientName:"Excellerent ",
    
        },
        {
          no: "3",
          employeeName: "Yossef Assefa",
          role : "Developer",
          billableHours: "40",
          nonBillableHours:"0",
          projectName : "Epp",
          clientName:"Excellerent ",
    
        },
        
      ]
    },
    {
      projectName: "EDC_DB",
      employees: [
        {
          no: "4",
          employeeName: "Engdawork Berhane",
          role : "Developer",
          billableHours: "0",
          nonBillableHours:"40",
          projectName : "EDC_DB",
          clientName:"E2E ",
    
        },
        {
          no: "5",
          employeeName: "Hailu Debebe",
          role : "Developer",
          billableHours: "0",
          nonBillableHours:"40",
          projectName : "EDC_DB",
          clientName:"E2E ",
    
        },
        {
          no: "6",
          employeeName: "Abel Asrat",
          role : "Developer",
          billableHours: "0",
          nonBillableHours:"40",
          projectName : "EDC_DB",
          clientName:"E2E ",
    
        }
      ]
    }
  ] 
}

