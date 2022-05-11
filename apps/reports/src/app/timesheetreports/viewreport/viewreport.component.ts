import { Component, OnDestroy, OnInit } from '@angular/core';
import en from '@angular/common/locales/en';

import { DatePipe, registerLocaleData } from '@angular/common';
import { differenceInCalendarDays } from 'date-fns';

import { GetClient } from '../../Models/get-client';
import { GetProject } from '../../Models/get-project';
import { ViewReportService } from '../../services/view-report.service';
import { Report } from '../../Models/getReport';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportWithCriteria } from '../../Models/reportWithCriteria';

import * as XLSX from "xlsx";
import { Observable, Subscription } from 'rxjs';
import { TimesheetConfiguration } from '../../Models/timesheetModels';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit, OnDestroy {
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheetConfig: TimesheetConfiguration = this.timesheetConfigStateService.defaultTimesheetConfig;
  timesheetConfigSubscription: Subscription = new Subscription();
  clientId = "";
  projectId: string[] = [];
  startDate: any;
  endDate: any;
  defualtMonth: any;
  monthm = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  month: any;
  monthyear: any;
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
  projectList: GetProject[] = [];
  reportList: Report[] = [];
  filtered: any[] = [];
  employee: any[] = [];
  list: any[] = [];
  sumBillableHours = 0;
  sumNonBillableHours = 0;

  public listOfClients: [GetClient] | [] = [];
  public listOfProjects = [];
  constructor(
    private reportService: ViewReportService,
    public datepipe: DatePipe,
    private timesheetConfigStateService: TimesheetConfigurationStateService,
    private permissionService: PermissionListService
  ) {
    // const mm = new Date();
    this.defualtMonth = new Date();
    this.defualtMonth.setDate(-1 * (this.defualtMonth.getDate() + 1));
    // this.defualtMonth.setMonth(this.monthm[mm.getMonth() -1]);
  }

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  reportsForExport: any[] = [];

  ngOnInit(): void {

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
    //this.clientId="d1f25a6c-3e2e-4d69-882b-9f67f65a6b7f";
    this.month = new Date().getMonth();

    this.monthm = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    const namem = this.monthm[d.getMonth() - 1];
    this.month = this.monthm[this.defualtMonth.getMonth() - 1]

    //console.log(namem);
    // this.defualtMonth = this.monthm[d.getMonth()- 1]

    this.disabledDate;
    //this.getReport();
    registerLocaleData(en);
    this.getAllClientList();

    this.timesheetConfig$ = this.timesheetConfigStateService.timesheetConfiguration$;

    this.timesheetConfigSubscription = this.timesheetConfig$.subscribe(tsc => {
      this.timesheetConfig = tsc ?? this.timesheetConfigStateService.defaultTimesheetConfig;
    });

  }
  ngOnDestroy(): void {
    this.timesheetConfigSubscription.unsubscribe();
  }
  getAllClientList() {
    this.reportService.getClientList().subscribe(
      (async (res: any) => {
        this.clientList = res;
        this.clientId = this.clientList[0].Guid;
        this.getProjectListByClientId(this.clientId);
        this.firstDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth(), 1);
        this.lastDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth() + 1, 0);


        this.getReport(this.clientId, this.firstDay, this.lastDay, this.projectId);
      })
    );
  }
  getProjectListByClientId(clientId: any) {
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
    // this.monthm[d.getMonth() - 1]
    differenceInCalendarDays(current, this.today) > 0;
  // differenceInCalendarMonths(current: any,this: any.today: any: any);



  onChangesFilterReport(event: string) {
    this.loading = true;

    //this.clientId = event;
    if (this.clientId == event) {
      this.getProjectListByClientId(this.clientId);

    }
  }


  getAllClientLisddt() {
    this.reportService.getClientList().subscribe(
      (async (res: any) => {
        this.clientList = res;
        this.clientList[0].Guid;
        this.clientId = this.clientList[0].Guid;;
        for (let i = 0; i < res.count(); i++) {
          this.reportService.getProjectByClientId(this.clientId).subscribe(res => {
            this.projectList = res.Data;
          });
        }

      })
    );
  }
  getAllProjectList() {
    this.reportService.getProjectList().subscribe(
      (async (res: any) => {
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
  getClientDetail() {
    this.reportService.getAllClientLists().subscribe((response: any) => {
      this.clientList = response;
    });

  }

  FilterClients(cId: any) {
    this.clientId = cId;
    console.log(cId);

  }
  onGenerateReports() {
    this.loading = true;
    this.firstDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth(), 1);
    this.lastDay = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth() + 1, 0);

    this.getReport(this.clientId, this.firstDay, this.lastDay, this.projectId);
  }
  getReport(cID: string, sDate: Date, eDate: Date, pID?: string[]) {
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
    this.reportService.getReports(cID, sDatestring, eDatestring, pID).subscribe((res: Report[]) => {

      //this.reportService.getReportsByCriteria(data).subscribe((res:Report[])=>{
      this.reportList = res;
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

  onMonthChange(monthDate: Date) {
    //TODO: on Month Change
  }

  getWeek(result: Date): void {
    // console.log('week: ', getISOWeek(result));
  }

  filterProjects() {
    const project = this.reportList.map(i => i.ProjectName)
      .filter((value, index, self) => self.indexOf(value) === index)
    this.list = [];
    project.forEach(p => {
      this.list.push({
        ProjectName: p,
        Employee: this.reportList.filter(t => t.ProjectName === p)
      });
    })
    for (let i = 0; i < project.length; i++) {
      let x = this.reportList.length;
      for (let j = 0; j < x; j++) {
        if (project[i] == this.reportList[j].ProjectName) {
          this.employee.push(this.reportList[j]);

        }

      }
      this.filtered.push(this.employee);
    }
  }
  sumHours() {
    this.sumNonBillableHours = 0;
    this.sumBillableHours = 0;
    this.reportList.forEach((i) => {
      this.sumBillableHours += i.BillableHours;
    });
    this.reportList.forEach((i) => {
      this.sumNonBillableHours += i.NonBillableHours;
    });
    console.log("Billable Hours" + this.sumBillableHours);
    console.log("Non Billable Hours" + this.sumNonBillableHours);
  }

  onExportClicked() {
    const fromDate = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth(), 1);
    const toDate = new Date(this.defualtMonth.getFullYear(), this.defualtMonth.getMonth() + 1, 0);
    const clientId = this.clientId;
    const projectIds = [...this.projectId];

    this.reportService.getTimesheetReportForExport(fromDate, toDate, clientId, projectIds).subscribe(res => {
      this.reportsForExport = res ?? [];

      this.exportToExcel();
    }, error => {
      console.log(error);
    });
  }

  private exportToExcel() {
    const summaryReport = this.prepareTimesheetSummaryReportTable();
    const detailReport = this.prepareTimesheetDetailReportTable();
    const workBook = XLSX.utils.table_to_book(summaryReport);
    const tmpWorkBook = XLSX.utils.table_to_book(detailReport);
    XLSX.utils.book_append_sheet(workBook, tmpWorkBook.Sheets["Sheet1"]);
    return XLSX.writeFile(workBook, ('MySheetName.' + ('xlsx')));
  }

  private prepareTimesheetSummaryReportTable() {
    const table = document.createElement("table");

    const forDetail = false;
    const clients = this.getClients(forDetail);
    for (const client of clients) {
      const clientIndex = clients.indexOf(client);

      let sNo = 0;
      const projects = this.getClientProjects(client.Client);
      for (const project of projects) {
        const projectIndex = projects.indexOf(project);
        const assignedResources = this.getAssignedResources(project.ProjectName, sNo, forDetail);
        sNo += assignedResources.length;
        projects[projectIndex]["assignedResources"] = assignedResources;
      }
      clients[clientIndex]["projects"] = projects;
    }

    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    const tableHeaderCol = document.createElement("th");
    tableHeaderCol.colSpan = Object.keys(clients[0].projects[0].assignedResources[0]).length;
    tableHeaderCol.textContent = "Monthly Timesheet - Summary";
    tableHeaderRow.appendChild(tableHeaderCol);
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    for (const client of clients) {
      //Client row
      const clientKeys1 = Object.keys(client).filter(ck => ck.toUpperCase() === "Client".toUpperCase() || ck.toUpperCase() === "Month".toUpperCase());
      const clientHeader1 = document.createElement("tr");
      for (const clientKey of clientKeys1) {
        if (clientKey.toUpperCase() === "projects".toUpperCase()) {
          continue;
        }
        const header = document.createElement("th");
        if (clientKey === "Client") {
          header.colSpan = 2;
        }
        header.textContent = this.addSpaceInBetween(clientKey);
        clientHeader1.appendChild(header);

        const detail = document.createElement("td");
        detail.textContent = client[clientKey];
        clientHeader1.appendChild(detail);

        if (clientKeys1.indexOf(clientKey) != clientKeys1.length - 1) {
          clientHeader1.appendChild(document.createElement("td"));
        }
      }
      table.appendChild(clientHeader1);

      const clientKeys2 = Object.keys(client).filter(ck => ck.toUpperCase() === "ClientManager".toUpperCase() || ck.toUpperCase() === "ReportDate".toUpperCase());
      const clientHeader2 = document.createElement("tr");
      for (const clientKey of clientKeys2) {
        if (clientKey.toUpperCase() === "projects".toUpperCase()) {
          continue;
        }
        const header = document.createElement("th");
        if (clientKey === "ClientManager") {
          header.colSpan = 2;
        }
        header.textContent = this.addSpaceInBetween(clientKey);
        clientHeader2.appendChild(header);

        const detail = document.createElement("td");
        detail.textContent = client[clientKey];
        clientHeader2.appendChild(detail);

        if (clientKeys1.indexOf(clientKey) != clientKeys1.length - 1) {
          clientHeader2.appendChild(document.createElement("td"));
        }
      }
      table.appendChild(clientHeader2);

      //project row;
      const projects = client.projects;
      //Assigned Recouce header row
      const assignedResource = projects[0].assignedResources[0];
      const assignedResourceHeaderRow = document.createElement("tr");
      for (const assigendresourceKey in assignedResource) {
        const header = document.createElement("th");
        header.textContent = this.addSpaceInBetween(assigendresourceKey);
        assignedResourceHeaderRow.appendChild(header);
      }
      table.appendChild(assignedResourceHeaderRow);
      for (const project of projects) {
        const projectDetail = document.createElement("tr");
        for (const projectKey in project) {
          if (projectKey.toUpperCase() === "assignedResources".toUpperCase()) {
            continue;
          }
          const detail = document.createElement('td');
          detail.colSpan = Object.keys(assignedResource).length;
          detail.textContent = `${this.addSpaceInBetween(projectKey)} : ${project[projectKey as keyof typeof project]}`
          projectDetail.appendChild(detail);
        }
        table.appendChild(projectDetail);

        //Assigned Resouce
        const assignedResources = project.assignedResources;
        for (const assignedResource of assignedResources) {
          const assignedResourceRow = document.createElement("tr");
          for (const assignedResourceKey in assignedResource) {
            const column = document.createElement("td");
            column.textContent = assignedResource[assignedResourceKey as keyof typeof assignedResource];
            assignedResourceRow.appendChild(column);
          }
          table.appendChild(assignedResourceRow);
        }
      }
    }

    const totalRow = document.createElement("tr");
    for (const assignedResourceKey in clients[0].projects[0].assignedResources[0]) {
      const col = document.createElement("td");
      if (assignedResourceKey === "SNo") {
        col.textContent = "Total";
      }
      else if (assignedResourceKey === "TotalBillable") {
        let totalBillable = 0;
        for (const client of clients) {
          for (const project of client.projects) {
            for (const assignedResource of project.assignedResources) {
              totalBillable += assignedResource["TotalBillable"];
            }
          }
        }
        col.textContent = totalBillable.toString();
      }
      else if (assignedResourceKey === "TotalNonBillable") {
        let totalNonBillable = 0;
        for (const client of clients) {
          for (const project of client.projects) {
            for (const assignedResource of project.assignedResources) {
              totalNonBillable += assignedResource["TotalNonBillable"];
            }
          }
        }

        col.textContent = totalNonBillable.toString();
      }

      totalRow.appendChild(col);
    }
    table.appendChild(totalRow);

    return table;
  }

  private prepareTimesheetDetailReportTable() {
    const table = document.createElement("table");

    const forDetail = true;
    const clients = this.getClients(forDetail);
    for (const client of clients) {
      const groupedReportIndex = clients.indexOf(client);

      let sNo = 0;
      const projects = this.getClientProjects(client.Client);
      for (const project of projects) {
        const projectIndex = projects.indexOf(project);
        const assignedResources = this.getAssignedResources(project.ProjectName, sNo, forDetail);
        sNo += assignedResources.length;
        projects[projectIndex]["assignedResources"] = assignedResources;
      }
      clients[groupedReportIndex]["projects"] = projects;
    }

    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    const tableHeaderCol = document.createElement("th");
    tableHeaderCol.colSpan = Object.keys(clients[0].projects[0].assignedResources[0]).length;
    tableHeaderCol.textContent = "Monthly Timesheet - Detail";
    tableHeaderRow.appendChild(tableHeaderCol);
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    for (const client of clients) {
      //Client
      const clientHeaderRow = document.createElement("tr");
      for (const clientKey in client) {
        if (clientKey.toUpperCase() === "projects".toUpperCase()) {
          continue;
        }
        const header = document.createElement("th");
        if (clientKey === "Client") {
          header.colSpan = 2;
        }
        else if (clientKey === "Legend") {
          header.colSpan = this.getTimeEntryDateCount() + 2;
        }
        header["textContent"] = this.addSpaceInBetween(clientKey);
        clientHeaderRow.appendChild(header);
      }
      table.appendChild(clientHeaderRow);

      const clientDetailRow = document.createElement("tr");
      for (const clientKey in client) {
        if (clientKey.toUpperCase() === "projects".toUpperCase()) {
          continue;
        }
        const column = document.createElement("td");
        if (clientKey === "Client") {
          column.colSpan = 2;
        }
        else if (clientKey === "Legend") {
          column.colSpan = this.getTimeEntryDateCount() + 2;
        }
        column["textContent"] = client[clientKey as keyof typeof client];
        clientDetailRow.appendChild(column);
      }
      table.appendChild(clientDetailRow);

      //project row;
      const projects = client.projects;
      //Assigned Recouce header row
      const assignedResource = projects[0].assignedResources[0];
      const assignedResourceHeaderRow = document.createElement("tr");
      for (const assigenedresourceKey in assignedResource) {
        const header = document.createElement("th");
        if (assigenedresourceKey === "Name") {
          header.colSpan = 2;
        }
        header.textContent = this.addSpaceInBetween(assigenedresourceKey);
        assignedResourceHeaderRow.appendChild(header);
      }
      table.appendChild(assignedResourceHeaderRow);
      for (const project of projects) {
        const projectDetailRow = document.createElement("tr");
        for (const projectKey in project) {
          if (projectKey.toUpperCase() === "assignedResources".toUpperCase()) {
            continue;
          }
          const column = document.createElement('td');
          column.colSpan = Object.keys(assignedResource).length + 1;
          column["textContent"] = `${this.addSpaceInBetween(projectKey)} : ${project[projectKey as keyof typeof project]}`
          projectDetailRow.appendChild(column);
        }
        table.appendChild(projectDetailRow);

        //Assigned Resouce
        const assignedResources = project.assignedResources;
        for (const assignedResource of assignedResources) {
          const assignedResourceDetailRow = document.createElement("tr");
          for (const assignedResourceKey in assignedResource) {
            const column = document.createElement("td");
            if (assignedResourceKey === "Name") {
              column.colSpan = 2;
            }
            column["textContent"] = assignedResource[assignedResourceKey as keyof typeof assignedResource];
            assignedResourceDetailRow.appendChild(column);
          }
          table.appendChild(assignedResourceDetailRow);
        }
      }
    }

    const totalRow = document.createElement("tr");
    for (const assignedResourceKey in clients[0].projects[0].assignedResources[0]) {
      const col = document.createElement("td");
      if (assignedResourceKey === "SNo") {
        col.textContent = "Total";
      }
      else if(assignedResourceKey === "Name") {
        col.colSpan = 2;
      }
      else if (assignedResourceKey === "TotalBillable") {
        let totalBillable = 0;
        for (const client of clients) {
          for (const project of client.projects) {
            for (const assignedResource of project.assignedResources) {
              totalBillable += assignedResource["TotalBillable"];
            }
          }
        }
        col.textContent = totalBillable.toString();
      }
      else if (assignedResourceKey === "TotalNonBillable") {
        let totalNonBillable = 0;
        for (const client of clients) {
          for (const project of client.projects) {
            for (const assignedResource of project.assignedResources) {
              totalNonBillable += assignedResource["TotalNonBillable"];
            }
          }
        }

        col.textContent = totalNonBillable.toString();
      }

      totalRow.appendChild(col);
    }
    table.appendChild(totalRow);

    return table;
  }

  private getClients(forDetail = true) {
    const clients = this.reportsForExport.reduce((clients: Record<string, any>[], report) => {
      const date = new Date(report.ReportDate);
      const client: Record<string, any> = {
        Client: report.Client,
        ClientManager: report.ClientManager,
        Month: "_" + report.Month,
        ReportDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      }

      if (forDetail) {
        client["Legend"] = report.Legend
      }

      const index = clients.findIndex(c => {
        if (
          c.Client === client.Client &&
          c.ClientManager === client.ClientManager &&
          c.Month === client.Month &&
          c.ReportDate === client.ReportDate
        ) {
          if (!forDetail) return true;
          else if (c.Legend === client.Legend) return true;
        }

        return false;
      });

      if (index >= 0) return clients;

      clients.push(client);

      return clients;
    }, []);

    return clients;
  }

  private getClientProjects(client: string) {
    const projects = this.reportsForExport.reduce((projects: Record<string, any>[], report) => {
      if (report.Client != client) return projects;

      const index = projects.findIndex(p => p.ProjectName === report.ProjectName);

      if (index >= 0) return projects;

      projects.push({
        ProjectName: report.ProjectName
      });

      return projects;
    }, [])

    return projects;
  }

  private getAssignedResources(projectName: string, sNo: number, forDetail = true) {
    const assignedResources = this.reportsForExport.reduce((assignedResources: Record<string, any>[], report) => {
      if (projectName != report.ProjectName) return assignedResources;

      const index = assignedResources.findIndex(ar => {
        if (
          ar.Name === report.Name &&
          ar.Role === report.Role
        ) {
          if (forDetail && (ar.Billable === "Y") != report.Billable) return false
          else return true;
        }

        return false;
      });

      if (index >= 0) return assignedResources;

      const assigendResource: Record<string, any> = {}
      assigendResource["SNo"] = (assignedResources.length + sNo + 1);
      assigendResource["Name"] = report.Name;
      if (!forDetail) {
        assigendResource[" "] = " ";
      }
      assigendResource["Role"] = report.Role;
      if (forDetail) {
        assigendResource["Billable"] = report.Billable ? "Y" : "N";
      }

      const timeEntryData = this.getProjectTimeEntryData(projectName, report.Name, report.Billable, forDetail);

      for (const timeEntryDataKey in timeEntryData) {
        assigendResource[timeEntryDataKey] = timeEntryData[timeEntryDataKey];
      }

      assignedResources.push(assigendResource);

      return assignedResources;
    }, []);

    return assignedResources;
  }

  private getProjectTimeEntryData(projectName: string, name: string, billable: boolean, forDetail = true) {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeEntryDatas = this.reportsForExport.reduce((timeEntryDatas: Record<string, any>[], report) => {
      if (report.ProjectName != projectName) return timeEntryDatas;
      if (report.Name != name) return timeEntryDatas;

      const index = timeEntryDatas.findIndex(ted => {
        if (
          ted.Date === report.Date &&
          ted.Hour === report.Hours
        ) return true;

        return false;
      });

      if (index >= 0) return timeEntryDatas;

      timeEntryDatas.push({
        Date: new Date(report.Date),
        Hour: report.Hours
      })

      return timeEntryDatas;
    }, []);

    const months = [...(new Set(this.reportsForExport.map(rep => new Date(rep.Date).getMonth())))];

    for (const month of months) {
      const date = new Date(this.defualtMonth);
      let fromDate = new Date(date.getFullYear(), month, 1);
      const toDate = new Date(date.getFullYear(), month + 1, 0);

      while (fromDate <= toDate) {
        const index = timeEntryDatas.findIndex(ted => new Date(ted.Date).valueOf() === fromDate.valueOf());

        if (index < 0) {
          timeEntryDatas.push({
            Date: new Date(fromDate),
            Hour: "0"
          });
        }

        fromDate = new Date(fromDate.setDate(fromDate.getDate() + 1));
      }
    }

    timeEntryDatas.sort((prev, next) => {
      if (prev.Date < next.Date) {
        return -1;
      }
      else if (prev.Date > next.Date) {
        return 1;
      }

      return 0;
    })

    for (let i = 0; i < timeEntryDatas.length; i++) {
      const day = timeEntryDatas[i].Date.getDay();
      const index = this.timesheetConfig.WorkingDays.findIndex(d => d.toUpperCase() === weekDays[day].toUpperCase());
      if (index >= 0) {
        continue;
      }

      if (timeEntryDatas[i].Hour === "0") {
        timeEntryDatas[i].Hour = "";
      }
    }

    const timeEntryData: Record<string, any> = {};
    let totalTimeEntryHours = 0;
    if (forDetail) {
      timeEntryDatas.forEach(ted => {
        timeEntryData[`'${ted.Date.getDate()}/${ted.Date.getMonth() + 1}`] = ted.Hour;
        totalTimeEntryHours += isNaN(parseInt(ted.Hour)) ? 0 : parseInt(ted.Hour);
      });
    }
    else {
      timeEntryDatas.forEach(ted => {
        totalTimeEntryHours += isNaN(parseInt(ted.Hour)) ? 0 : parseInt(ted.Hour);
      });
    }

    if (billable) {
      timeEntryData["TotalBillable"] = totalTimeEntryHours;
      timeEntryData["TotalNonBillable"] = 0;
    }
    else {
      timeEntryData["TotalBillable"] = 0;
      timeEntryData["TotalNonBillable"] = totalTimeEntryHours;
    }

    return timeEntryData;
  }

  private addSpaceInBetween(val: string) {
    return val.replace(/[a-z]/gi, (m, o) => (m < "[" && o) ? ` ${m}` : (o) ? m : m.toUpperCase())
  }

  private getTimeEntryDateCount() {
    const date = new Date(this.defualtMonth);
    const months = [...(new Set(this.reportsForExport.map(rep => new Date(rep.Date).getMonth())))];

    let totalDate = 0;

    for (const month of months) {
      const tmpDate = new Date(date.getFullYear(), month + 1, 0);
      totalDate += tmpDate.getDate();
    }

    return totalDate;
  }

  authorize(key:string){
    return this.permissionService.authorizedPerson(key);
  }
}