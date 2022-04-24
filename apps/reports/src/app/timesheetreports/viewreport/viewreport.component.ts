import { filter } from 'rxjs/operators';
import { ResponseDTO } from './../../Models/ResponseDTO';
import { Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import en from '@angular/common/locales/en';

import { registerLocaleData } from '@angular/common';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { GetClient } from '../../Models/get-client';
import { GetProject } from '../../Models/get-project';
import { ViewReportService } from '../../services/view-report.service';
import { Report,projects } from '../../Models/getReport';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'exec-epp-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

  //Data = null;
  clientId:any;
  today:any; 
  isEnglish = false;
  //disabledDate = false;
  clientList: GetClient[] = [];
  projectList: GetProject[] =[];
  reportList: Report[] = [];
  //data : any []=[];
  filtered : any []=[];
  employee : any []=[];
  list : any []=[];
  sumBillableHours=0;
  sumNonBillableHours=0;
  public listOfClients: [GetClient] | [] =[];
  public listOfProjects: [GetProject] | [] =[];
  constructor(
    private reportService:ViewReportService
  ) { 
   
  }
  ngOnInit(): void {
  this.map();
  
  this.getReport();
  registerLocaleData(en); 
  this.getAllClientList();
  this.getAllProjectList();
  this.today = new Date();
  const timeDefaultValue = setHours(new Date(), 0);
  this.reportService.getProjectsListByClient(this.clientId)
      .subscribe(async (response:any) => {
         this.listOfProjects= response.Data;
         //console.log("projects"+this.listOfProjects);
    });
    //this.filterProjects();   
  }
  
  //size: NzButtonSize = 'large';
  //size: 'small' | 'middle' | 'large' | number = 'small';
  getAllClientList(){
    this.reportService.getClientList().subscribe(
    (async (res:any) => {
      this.listOfClients = res.Data;
    })
  );

}
getAllProjectList(){
  this.reportService.getProjectList().subscribe(
  (async (res:any) => {
    this.listOfProjects = res.Data;
  })
);
}
getClientName(value: any) { 
  const result = this.listOfClients.find((obj) => {
    
    return obj.Guid === value;
  });
  //debugger;
  return result?.Name;
}
getReport(){
 // clientId= "d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f";
  this.reportService.getReports().subscribe((res:Report[])=>{
  this.reportList=res;
console.log("res===>",  this.reportList);
this.filterProjects();
this.sumHours();
  });
  return this.reportList;
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
  
    data :any []= [
      {
        ProjectId: "4fc4c039-a216-40b1-af26-4ed35b19a046",
        ProjectName: "AAA",
        ClientGuid: "e177648b-3cf7-42ce-a047-e47f450416fc",
        ClientName: "Ingrem Barge",
        ClientManagerName: null,
        EmployeeGuid: "0cf7169d-5c7c-4ed1-b43e-ddf5d5f46f6e",
        FirstName: "Meba",
        LastName: "Feyissa",
        FullName: "Meba Feyissa",
        EmployeeRoleName: "Product Owner I",
        BillableHours: 18,
        NonBillableHours: 0
      },
      {
        ProjectId: "61849171-acd6-4dd2-8f71-bf2d1f7d5687",
        ProjectName: "AAA",
        ClientGuid: "d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f",
        ClientName: "Engage2Excel",
        ClientManagerName: "Patrick Elalouf",
        EmployeeGuid: "a7d3695b-2cfd-4907-9390-c87c66511081",
        FirstName: "Brook   ",
        LastName: " ",
        FullName: "Brook     ",
        EmployeeRoleName: "Senior Developer II",
        BillableHours: 0,
        NonBillableHours: 80
      },
      {
        ProjectId: "21923ea8-6ac5-463f-a715-c042cd0c363c",
        ProjectName: "BBB",
        ClientGuid: "d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f",
        ClientName: "Engage2Excel",
        ClientManagerName: "Patrick Elalouf",
        EmployeeGuid: "562f820e-6414-438e-a02e-edafa76e6beb",
        FirstName: "Ashenafi ",
        LastName: " ",
        FullName: "Ashenafi   ",
        EmployeeRoleName: "Senior Developer I",
        BillableHours: 0,
        NonBillableHours: 64
      },
      {
        ProjectId: "31feded5-ad32-4cc0-90e5-7c49d4ea57fa",
        ProjectName: "BBB",
        ClientGuid: "d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f",
        ClientName: "Engage2Excel",
        ClientManagerName: "Patrick Elalouf",
        EmployeeGuid: "716e6ff1-f9f9-43b3-b21c-92403d07b5d7",
        FirstName: "Esayas   ",
        LastName: " ",
        FullName: "Esayas     ",
        EmployeeRoleName: "Technical Lead",
        BillableHours: 0,
        NonBillableHours: 76
      },];
      
map (){
 for (let i = 0; i<= this.data.length;i++){
  this.data.forEach(function(value){
  //console.log("Aman"+value);
    

  });
 }
}

reports: any[]=[
    
  {
    projectName: '',
    employees: [ ]
  }
  

]
filterProjects(){
  let project = this.reportList.map (i => i.ProjectName)
  .filter((value, index, self) => self.indexOf(value) === index)
  //const list: any[] = [];
  project.forEach(p => {
    this.list.push({
      ProjectName: p,
      Employee: this.reportList.filter(t => t.ProjectName === p)
    });
  })
  //console.log(project);
  //console.log(this.list)
  //console.log("AA"+this.reportList);
  for (let i = 0; i< project.length;i++){
    var push=  this.filtered.push(project[i]);
    //this.reports.em
    //this.filtered.push("Aman")
    let x = this.reportList.length;
    console.log(x);
    console.log(project[0]);
    console.log(this.reportList[0].ProjectName);
    for (let j = 0; j<x;j++){
      if (project[i] == this.reportList[j].ProjectName){
        this.employee.push(this.reportList[j]);
        
    }
    
    }
    this.filtered.push(this.employee);
  }
  //.log(this.filtered)
  

}
sumHours(){
  this.reportList.forEach((i)=>{
    this.sumBillableHours+=i.BillableHours;
  });
  this.reportList.forEach((i)=>{
    this.sumNonBillableHours+=i.NonBillableHours;
  });
  console.log("Billable Hours"+this.sumBillableHours);
  console.log("Non Billable Hours"+this.sumNonBillableHours);
}


  

  // reports: any[]=[
    
  //   {
  //     projectName: "Epp",
  //     employees: [
  //       {
  //         no: "1",
  //         employeeName: "Amanuel Zewdu",
  //         role : "Developer",
  //         billableHours: "8",
  //         nonBillableHours:"0",
  //         projectName : "Epp",
  //         clientName:"Excellerent ",
    
  //       },
  //       {
  //         no: "2",
  //         employeeName: "Ashenafi Fisseha",
  //         role : "Developer",
  //         billableHours: "8",
  //         nonBillableHours:"0",
  //         projectName : "Epp",
  //         clientName:"Excellerent ",
    
  //       },
  //       {
  //         no: "3",
  //         employeeName: "Yossef Assefa",
  //         role : "Developer",
  //         billableHours: "40",
  //         nonBillableHours:"0",
  //         projectName : "Epp",
  //         clientName:"Excellerent ",
    
  //       },
        
  //     ]
  //   },
  //   {
  //     projectName: "EDC_DB",
  //     employees: [
  //       {
  //         no: "4",
  //         employeeName: "Engdawork Berhane",
  //         role : "Developer",
  //         billableHours: "0",
  //         nonBillableHours:"40",
  //         projectName : "EDC_DB",
  //         clientName:"E2E ",
    
  //       },
  //       {
  //         no: "5",
  //         employeeName: "Hailu Debebe",
  //         role : "Developer",
  //         billableHours: "0",
  //         nonBillableHours:"40",
  //         projectName : "EDC_DB",
  //         clientName:"E2E ",
    
  //       },
  //       {
  //         no: "6",
  //         employeeName: "Abel Asrat",
  //         role : "Developer",
  //         billableHours: "0",
  //         nonBillableHours:"40",
  //         projectName : "EDC_DB",
  //         clientName:"E2E ",
    
  //       }
  //     ]
  //   }

  // ]
    
}