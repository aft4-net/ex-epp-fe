import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';



@Component({
  selector: 'exec-epp-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

  date = null;
  isEnglish = false;

  constructor() { }

  ngOnInit(): void {
    registerLocaleData(zh);
  }
  size: NzButtonSize = 'large';
 

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
      
    }
  
    getWeek(result: Date): void {
      console.log('week: ', getISOWeek(result));
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

