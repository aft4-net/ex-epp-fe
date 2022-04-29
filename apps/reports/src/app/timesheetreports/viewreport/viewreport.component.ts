import { filter } from 'rxjs/operators';
import { ResponseDTO } from './../../Models/ResponseDTO';
import { Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import en from '@angular/common/locales/en';

import {DatePipe, registerLocaleData } from '@angular/common';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { GetClient } from '../../Models/get-client';
import { GetProject } from '../../Models/get-project';
import { ViewReportService } from '../../services/view-report.service';
import { Report,projects } from '../../Models/getReport';
import { ConstantPool } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportWithCriteria } from '../../Models/reportWithCriteria';

@Component({
  selector: 'exec-epp-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

  clientId = "";
  projectId: string[] = [];
  startDate:any;
  endDate:any;
  defualtMonth: Date;
  monthm: any;
  month:any;
  monthyear:any;
  today = new Date();
  firstDay = new Date();
  lastDay = new Date();
  isEnglish = false;
  loading = false;
  reportForm = new FormGroup({
    clientIds: new FormControl(''),
    ProjectIds: new FormControl([]),
    months: new FormControl('')
  });
  selectedproject = [];
  clientList: GetClient[] = [];
  projectList: GetProject[] =[];
  reportList: Report[] = [];
  filtered : any []=[];
  employee : any []=[];
  list : any []=[];
  sumBillableHours=0;
  sumNonBillableHours=0;
  public listOfClients: [GetClient] | [] =[];
  public listOfProjects = [];
  constructor(
    private reportService:ViewReportService,
    public datepipe: DatePipe
  ) {
    this.defualtMonth = new Date();
    this.defualtMonth.setDate(-1 * (this.defualtMonth.getDate() + 1));
  }
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  ngOnInit(): void {
    
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
    //this.clientId="d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f";
    this.month = new Date().getMonth();
 
   this.monthm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
const d = new Date();
const namem = this.monthm[d.getMonth()- 1];
  //console.log(namem);
// this.defualtMonth = this.monthm[d.getMonth()- 1]

  this.disabledDate;
  //this.getReport();
  registerLocaleData(en); 
  this.getAllClientList();
  
  //this.getProjectListByClientId(this.clientId);

  }
  getAllClientList(){
    this.reportService.getClientList().subscribe(
    (async (res:any) => {
      this.clientList = res;
     this.clientId =this.clientList[0].Guid;
     this.getProjectListByClientId(this.clientId);
     this.firstDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth(), 1);
     this.lastDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth() + 1, 0);
     
    
     this.getReport(this.clientId,this.firstDay,this.lastDay,this.projectId);  
    })
  );
}
  getProjectListByClientId(clientId:any)
  {
    this.reportService.getProjectByClientId(clientId).subscribe(res => {
      this.projectList = res.Data;
      this.projectId = [];
      this.projectList.forEach(project => {
        this.projectId.push(project.Guid);
      });
    });
  }
   
  disabledDate = (current: Date): any =>
    // Can not select days before today and today
      differenceInCalendarDays(current, this.today) > 0;
      
    

  onChangesFilterReport(event: string) {
    this.loading = true;
   
    //this.clientId = event;
    if (this.clientId==event) {
      this.getProjectListByClientId(this.clientId);
     
    }
  }


getAllClientLisddt(){
  this.reportService.getClientList().subscribe(
  (async (res:any) => {
    this.clientList = res;
    this.clientList[0].Guid;
    this.clientId=this.clientList[0].Guid;;
  for(let i=0;i<res.count();i++)
  {
    this.reportService.getProjectByClientId(this.clientId).subscribe(res => {
      this.projectList = res.Data;
    });
  }
   
  })
);
}
getAllProjectList(){
  this.reportService.getProjectList().subscribe(
  (async (res:any) => {
    this.projectId = res.Data;
  })
);
}
getClientName(value: any) { 
  const result = this.listOfClients.find((obj) => {
    
    return obj.Guid === value;
  });
  //debugger;
  return result?.ClientName;
}
getClientDetail(){
  this.reportService.getAllClientLists().subscribe((response: any) => {
    this.clientList = response;
  });
  
}

FilterClients(cId:any)
{
  this.clientId = cId;
  console.log(cId);
 
}
onGenerateReports()
{
  this.loading = true;
this.firstDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth(), 1);
this.lastDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth() + 1, 0);

this.getReport(this.clientId,this.firstDay,this.lastDay,this.projectId);
}
getReport(cID:string,sDate:Date,eDate:Date,pID?:string[]){
 // clientId= "d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f";
 const sDatestring = this.datepipe.transform(sDate, 'yyyy-MM-dd');
 const eDatestring = this.datepipe.transform(eDate, 'yyyy-MM-dd');
 const data: ReportWithCriteria = {
   ClientGuid: cID,
   SelectedProjects: pID ?? [],
   StarDate: sDatestring ?? "",
   EndDate: eDatestring ?? ""
 }

 this.loading = true;
 this.reportService.getReports(cID,sDatestring,eDatestring,pID).subscribe((res:Report[])=>{

  //this.reportService.getReportsByCriteria(data).subscribe((res:Report[])=>{
  this.reportList=res;
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

    onChange(): void {
      ;
    }

    onMonthChange(monthDate: Date){
      //TODO: on Month Change
    }
  
    getWeek(result: Date): void {
     // console.log('week: ', getISOWeek(result));
    }
    
    
      
// map (){
//  for (let i = 0; i<= this.data.length;i++){
//   this.data.forEach(function(value){
//   //console.log("Aman"+value);
    

//   });
//  }
// }


filterProjects(){
  let project = this.reportList.map (i => i.ProjectName)
  .filter((value, index, self) => self.indexOf(value) === index)
  //const list: any[] = [];
  this.list = [];
  project.forEach(p => {
    this.list.push({
      ProjectName: p,
      Employee: this.reportList.filter(t => t.ProjectName === p)
    });
  })
  for (let i = 0; i< project.length;i++){
    var push=  this.filtered.push(project[i]);
    //this.reports.em
    //this.filtered.push("Aman")
    let x = this.reportList.length;
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
  this.sumNonBillableHours=0;
  this.sumBillableHours=0;
  this.reportList.forEach((i)=>{
    this.sumBillableHours+=i.BillableHours;
  });
  this.reportList.forEach((i)=>{
    this.sumNonBillableHours+=i.NonBillableHours;
  });
  console.log("Billable Hours"+this.sumBillableHours);
  console.log("Non Billable Hours"+this.sumNonBillableHours);
}
}