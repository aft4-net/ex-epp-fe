import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, fromEvent, of, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { AuthenticationService } from './../../../../../../../../libs/common-services/Authentication.service';
import { ColumnItem } from '../../../Models/EmployeeColumnItem';
import { Employee } from '../../../Models/Employee';
import { EmployeeParams } from '../../../Models/Employee/EmployeeParams';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { IEmployeeViewModel } from '../../../Models/Employee/EmployeeViewModel';
import { NotificationBar } from 'apps/resourcemanagement/src/app/utils/feedbacks/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { PaginationResult } from '../../../Models/PaginationResult';
import { PermissionListService } from 'libs/common-services/permission.service';
import { listtToFilter } from '../../../Models/listToFilter';
import { LoadingSpinnerService } from 'libs/common-services/loading-spinner.service';
import {AssignResourceService} from '../../../../../../../projectmanagement/src/app/core/services/assign-resource.service';
import {ClientDetailsService} from '../../../../../../../clientmanagement/src/app/core/services/client-details.service';

@Component({
  selector: 'exec-epp-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  input!: ElementRef;
  employeeByID!: Employee;
  uemail: any;
  theEmpguid: any;
  selectedJobType = '';
  selectedLocation = '';
  selectedStatus = '';
  holdflag = false;
  JobTypeList: string[] = [];

  clientlist: string[] = [];
  superVisorlist: string[] = [];
  statuslist: string[] = [];
  searchKey = '';
  id!: string;

  JobType: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  Location: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  statuses: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  assignmentStatus: any;
  salesPersonStatus: any;
  supervisorStatus: any;

  constructor(
    private _clientDetailsService:ClientDetailsService,
    private _employeeService: EmployeeService,
    private _form: FormGenerator,
    private _router: Router,
    private _permissionService: PermissionListService,
    private _authenticationService: AuthenticationService,
    private notification: NotificationBar,
    private _message: NzNotificationService,
    private modal: NzModalService,
    private route:ActivatedRoute,
    private _assignResourceService:AssignResourceService,
       //private loadingSpinnerService: LoadingSpinnerService
  ) {

    route.params.subscribe(val => {
      this.ngOnInit();
    });
  }

  isdefault = true;
  router = '';
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<string>();
  employeeViewModels$: Observable<IEmployeeViewModel[]> = new Observable<
    IEmployeeViewModel[]
  >();
  employeeViewModels2$: Observable<IEmployeeViewModel[]> = new Observable<
    IEmployeeViewModel[]
  >();
  employeeViewModel: IEmployeeViewModel[] = [];
  employeeViewModel2: IEmployeeViewModel[] = [];
  paginatedResult!: PaginationResult<IEmployeeViewModel[]>;
  employeeParams = new EmployeeParams();
  searchStateFound!: boolean;
  pageSize = 10;
  pageIndex = 1;
  SortColumn="";
  sortDirection="";
  totalRows !:number;
  totalRecord !: number;
  beginingRow !: number;
  lastRow !: number;
  fullname!: string;
  holdItCountry: listtToFilter[] = [];
  holdItJobTitle: listtToFilter[] = [];
  holdItStatus: listtToFilter[] = [];
  holdItJoinDate: listtToFilter[] = [];

  empListCountry: NzTableFilterList = [];
  empListStatus: NzTableFilterList = [];
  empListJobType: NzTableFilterList = [];

  empJoinDate: NzTableFilterList = [];

  //added by simbo just you remove

  isVisible = false;
  isConfirmLoading = false;
  listOfColumnsFullName: ColumnItem[] = [
    {
      name: 'Employee',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
        a.FullName.localeCompare(b.FullName),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: true,
    },
    {
      name: 'Joining Date',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
        a.JoiningDate.localeCompare(b.JoiningDate),
      filterMultiple: true,
      listOfFilter: this.empJoinDate,
      filterFn: (list: string[], item: IEmployeeViewModel) =>
        list.some((name) => item.JoiningDate.indexOf(name) !== -1),
    },
  ];

  listOfColumns!: ColumnItem[];

  ngOnInit(): void {

    //this.loadingSpinnerService.messageSource.next(true);

    this.getfilterDataMenu();

    if (this._authenticationService.isFromViewProfile() === 'true') {

   // this.loadingSpinnerService.messageSource.next(true);
      this.uemail = this._authenticationService.getEmail();
      this.getUser();
      // setTimeout(() => {
      //   this.loadingSpinnerService.messageSource.next(false);
      // }, 1500);
      return;

    }
    //  else{
    this.employeeViewModel as IEmployeeViewModel[];
    this.FeatchAllEmployees();
    //}
    this.notification.showNotification({
      type: 'success',
      content: '',
      duration: 1,
    });

    this.selectedJobType = '';
    this.selectedLocation = '';
    this.selectedStatus = '';

    // this._employeeService.SearchEmployeeDataforFilter(this.employeeParams);
  }
  ClientFilter(key: string[]) {
    this.clientlist = key;
    this.FilterData();
  }
  statusFilter(key: string[]) {
    this.statuslist = key;
    this.FilterData();
  }
  supervisorFilter(key: string[]) {
    this.superVisorlist = key;
    this.FilterData();
  }

  getfilterDataMenu(): void {

    this._employeeService.getFilterData().subscribe((data) => {


      this.JobType = data.jobtitleFilter;
      this.Location = data.locationFilter;
      this.statuses = data.StatusFilter;
    });
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }

  getUser() {
    this._employeeService.getUser(this.uemail).subscribe((response: any) => {
      this.theEmpguid = response.Guid;

      if (this.theEmpguid !== null) {

        this.Edit(this.theEmpguid);
      }

    });
  }

  EmployeeFilter(key: string[], name: any) {

    // this.getEmployees();
  }

  FillTheFilter() {
    this.holdItJobTitle.length = 0;
    this.holdItStatus.length = 0;
    this.holdItCountry.length = 0;
    this.employeeViewModels2$.subscribe((val) => {
      if (val.length > 0) {
        this.employeeViewModel2 = val;
        for (let i = 0; i < this.employeeViewModel2.length; i++) {
          if (
            this.holdItCountry.findIndex(
              (x) => x.text === this.employeeViewModel2[i].Location.trim()
            ) === -1
          ) {
            this.holdItCountry.push({
              text: this.employeeViewModel2.map((country) => country.Location)[
                i
              ],
              value: this.employeeViewModel2.map((country) => country.Location)[
                i
              ],
            });
          }
        }
        for (let i = 0; i < this.employeeViewModel2.length; i++) {
          if (
            this.holdItJobTitle.findIndex(
              (x) => x.text === this.employeeViewModel2[i].JobTitle.trim()
            ) === -1
          ) {
            this.holdItJobTitle.push({
              text: this.employeeViewModel2.map((title) => title.JobTitle)[i],
              value: this.employeeViewModel2.map((title) => title.JobTitle)[i],
            });
          }
        }
        for (let i = 0; i < this.employeeViewModel2.length; i++) {
          if (
            this.holdItStatus.findIndex(
              (x) => x.text === this.employeeViewModel2[i].Status.trim()
            ) === -1
          ) {
            this.holdItStatus.push({
              text: this.employeeViewModel2.map((status) => status.Status)[i],
              value: this.employeeViewModel2.map((status) => status.Status)[i],
            });
          }
        }
        (this.empListCountry = this.holdItCountry),
          (this.empListStatus = this.holdItStatus),
          (this.empListJobType = this.holdItJobTitle),
          (this.empJoinDate = this.holdItJoinDate);

        // if(this.holdflag){ return;}

        if (this.employeeViewModel2.length > 0) {
          this.listOfColumns = [
            {
              name: 'Job Title',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.JobTitle.localeCompare(b.JobTitle),
              filterMultiple: true,
              listOfFilter: this.empListJobType,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => {
                  //item.JobTitle.indexOf(name) !== -1,
                  this.selectedJobType = name;
                }),
            },
            {
              name: 'Location',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.Location.localeCompare(b.Location),
              filterMultiple: true,
              listOfFilter: this.empListCountry,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => {
                  // item.Location.indexOf(name) !== -1;
                  this.selectedLocation = name;
                }),
            },
            {
              name: 'Status',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.Status.localeCompare(b.Status),
              filterMultiple: true,
              listOfFilter: this.empListStatus,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => {
                  // item.Status.indexOf(name) !== -1
                  this.selectedStatus = name;
                }),
            },
          ];
        }
      } else {
        this.listOfColumns = [
          {
            name: 'Job Title',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.JobTitle.localeCompare(b.JobTitle),
            filterMultiple: true,
            listOfFilter: this.empListJobType,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.JobTitle.indexOf(name) !== -1),
          },
          {
            name: 'Location',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.Location.localeCompare(b.Location),
            filterMultiple: true,
            listOfFilter: this.empListCountry,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.Location.indexOf(name) !== -1),
          },
          {
            name: 'Status',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.Status.localeCompare(b.Status),
            filterMultiple: true,
            listOfFilter: this.empListStatus,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.Status.indexOf(name) !== -1),
          },
        ];
      }
    });
  }
  nzSortOrderChange(SortColumn: string, direction: string | null) {
    if (direction == 'ascend') {
      this.sortDirection = 'Ascending';
    }
    else if (direction == 'descend') {
      this.sortDirection = 'Descending';
    }
    else {
      this.sortDirection = "";
    }
    this.SortColumn = SortColumn;

    this.FilterData();
  }

  updateCheckedSet(employeeGuid: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(employeeGuid);
    } else {
      this.setOfCheckedId.delete(employeeGuid);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(employeeGuid: string, checked: boolean): void {
    this.updateCheckedSet(employeeGuid, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ EmployeeGUid }) =>
        this.updateCheckedSet(EmployeeGUid, checked)
      );
    this.refreshCheckedStatus();
  }

  FeatchAllEmployees() {
    this.selectedJobType = '';
    this.selectedLocation = '';
    this.selectedStatus = '';

    this.loading = true;
    this._employeeService.SearchEmployeeData(this.employeeParams).subscribe(
      (response: PaginationResult<IEmployeeViewModel[]>) => {
        if (response.Data) {
          this.loading = false;
          this.employeeViewModels$ = of(response.Data);
          this.employeeViewModel = response.Data;
          this.listOfCurrentPageData = response.Data;
          this.pageIndex = response.pagination.PageIndex;
          this.pageSize = response.pagination.PageSize;
          this.totalRecord = response.pagination.TotalRecord;
          this.totalRows = response.pagination.TotalRows;
          this.lastRow = this.totalRows;
          this.beginingRow = 1;
          //  this.FillTheFilter();
        } else {
          this.loading = false;
          this.employeeViewModel = [];
          this.employeeViewModels$ = of([]);
          //   this.FillTheFilter();
        }
      },
      (error) => {
        this.loading = false;
        this.listOfColumns = [
          {
            name: 'Job Title',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.JobTitle.localeCompare(b.JobTitle),
            filterMultiple: true,
            listOfFilter: this.empListJobType,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.JobTitle.indexOf(name) !== -1),
          },
          {
            name: 'Location',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.Location.localeCompare(b.Location),
            filterMultiple: true,
            listOfFilter: this.empListCountry,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.Location.indexOf(name) !== -1),
          },
          {
            name: 'Status',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
              a.Status.localeCompare(b.Status),
            filterMultiple: true,
            listOfFilter: this.empListStatus,
            filterFn: (list: string[], item: IEmployeeViewModel) =>
              list.some((name) => item.Status.indexOf(name) !== -1),
          },
        ];
      }
    );
    this.searchStateFound = false;

  }

  searchEmployees() {
    if (this.fullname.length > 1 || this.fullname == '') {
      this.employeeParams.searchKey = this.fullname;
      this._employeeService.SearchEmployeeData(this.employeeParams).subscribe(
        (response: PaginationResult<IEmployeeViewModel[]>) => {
          if (response.Data) {
            this.employeeViewModels$ = of(response.Data);
            this.employeeViewModel = response.Data;
            this.listOfCurrentPageData = response.Data;
            this.pageIndex = response.pagination.PageIndex;
            this.pageSize = response.pagination.PageSize;
            this.totalRecord = response.pagination.TotalRecord;
            this.totalRows = response.pagination.TotalRows;
            this.lastRow = this.totalRows;
            this.beginingRow = 1;
            this.FillTheFilter();
            this.loading = false;
          } else {
            this.loading = false;
            this.employeeViewModel = [];
            this.employeeViewModels$ = of([]);
            this.FillTheFilter();
          }
        },
        (error) => {
          this.loading = false;
          this.listOfColumns = [
            {
              name: 'Job Title',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.JobTitle.localeCompare(b.JobTitle),
              filterMultiple: true,
              listOfFilter: this.empListJobType,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => item.JobTitle.indexOf(name) !== -1),
            },
            {
              name: 'Location',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.Location.localeCompare(b.Location),
              filterMultiple: true,
              listOfFilter: this.empListCountry,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => item.Location.indexOf(name) !== -1),
            },
            {
              name: 'Status',
              sortOrder: null,
              sortDirections: ['ascend', 'descend', null],
              sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) =>
                a.Status.localeCompare(b.Status),
              filterMultiple: true,
              listOfFilter: this.empListStatus,
              filterFn: (list: string[], item: IEmployeeViewModel) =>
                list.some((name) => item.Status.indexOf(name) !== -1),
            },
          ];
        }
      );
      this.searchStateFound = true;
    }
  }

FilterData(){
   const subsc = this._employeeService.getWithPagnationResut(
    this.pageIndex,
      this.pageSize,
      this.SortColumn,
      this.sortDirection,
      this.id,
      this.clientlist,
      this.superVisorlist,
      this.statuslist,
      this.searchKey
  )
  .subscribe((response: PaginationResult<IEmployeeViewModel[]>) => {
    if(response.Data) {
      this.employeeViewModels$=of(response.Data);
      this.employeeViewModel = response.Data;
      this.listOfCurrentPageData = response.Data;
      this.pageIndex=response.pagination.PageIndex;
      this.pageSize=response.pagination.PageSize;
      this.totalRecord=response.pagination.TotalRecord;
      this.totalRows=response.pagination.TotalRows;
      this.lastRow = this.totalRows;
      this.beginingRow = 1;
      this.holdflag = true;
      if (this.totalRows === this.pageSize) {
        this.lastRow = this.pageSize * this.pageIndex;
        this.beginingRow = this.totalRows * (this.pageIndex - 1) + 1;
      } else if (this.totalRows < this.pageSize) {
        this.lastRow = this.totalRecord;
        this.beginingRow = this.totalRecord - this.totalRows + 1;
      }
     // this.FillTheFilter();
      this.loading = false;
    }
    else
    {
      this.loading = false;
      this.employeeViewModel = [];
      this.employeeViewModels$=of([]);
    //  this.FillTheFilter();
    }
  },error => {
    this.loading = false;
    this.listOfColumns = [
      {
        name: 'Job Title',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.JobTitle.localeCompare(b.JobTitle),
        filterMultiple: true,
        listOfFilter:this.empListJobType,
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.JobTitle.indexOf(name) !== -1),

      },
      {
        name: 'Location',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Location.localeCompare(b.Location),
        filterMultiple: true,
        listOfFilter: this.empListCountry,
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Location.indexOf(name) !== -1),

      },
      {
        name: 'Status',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: IEmployeeViewModel, b: IEmployeeViewModel) => a.Status.localeCompare(b.Status),
        filterMultiple: true,
        listOfFilter: this.empListStatus,
        filterFn: (list: string[], item: IEmployeeViewModel) => list.some(name => item.Status.indexOf(name) !== -1),

      }
    ];
   },(()=>{
      //
    })
  );

  //setTimeout(()=>{
  //  subsc.unsubscribe();
//}, 5000);
  this.searchStateFound=true;
}




  Edit(employeeId: string): void {
    this._form.employeId = employeeId;

    this._employeeService.getEmployeeData(employeeId).subscribe((data: any) => {


      this._employeeService.empNum = data.EmployeeNumber;

      this._employeeService.setEmployeeDataForEdit(data);

      if (this._employeeService.employeeById) {
        this._employeeService.isEdit = true;

        this._employeeService.save = 'Update';

        this._form.generateForms;

        this._form.generateForms(this._employeeService.employeeById);

        this._form.allAddresses = this._employeeService.employeeById
          ?.EmployeeAddress
          ? this._employeeService.employeeById?.EmployeeAddress
          : [];

        this._form.allFamilyDetails = this._employeeService.employeeById
          ?.FamilyDetails
          ? this._employeeService.employeeById?.FamilyDetails
          : [];

        this._employeeService.isdefault = false;
        this._router.navigate([
          'resourcemanagement/employee/add-employee/personal-info',
        ]);
      }
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        startWith(''),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap(async (search) => {
          (this.fullname = search), this.searchEmployees();
        })
      )
      .subscribe();
  }

  PageIndexChange(index: any): void {
    this.pageIndex=index;
    this.FilterData();
    /*this.loading = true;

    this.employeeParams.pageIndex = index;
    this.employeeParams.searchKey = this.fullname ?? '';
    if (this.searchStateFound == true) {
      this._employeeService
        .SearchEmployeeData(this.employeeParams)
        .subscribe((response: PaginationResult<IEmployeeViewModel[]>) => {
          this.employeeViewModels$ = of(response.Data);
          this.employeeViewModel = response.Data;
          this.totalRows = response.pagination.TotalRows;
          this.pageIndex = response.pagination.PageIndex;
          if (this.totalRows === this.pageSize) {
            this.lastRow = this.pageSize * index;
            this.beginingRow = this.totalRows * (index - 1) + 1;
          } else if (this.totalRows < this.pageSize) {
            this.lastRow = this.totalRecord;
            this.beginingRow = this.totalRecord - this.totalRows + 1;
          }
          this.loading = false;
          //  this.FillTheFilter();
        });
    } else {
      this._employeeService
        .SearchEmployeeData(this.employeeParams)
        .subscribe((response: PaginationResult<IEmployeeViewModel[]>) => {
          this.employeeViewModels$ = of(response.Data);
          this.employeeViewModel = response.Data;
          this.totalRows = response.pagination.TotalRows;
          this.pageIndex = response.pagination.PageIndex;
          if (this.totalRows === this.pageSize) {
            this.lastRow = this.pageSize * index;
            this.beginingRow = this.totalRows * (index - 1) + 1;
          } else if (this.totalRows < this.pageSize) {
            this.lastRow = this.totalRecord;
            this.beginingRow = this.totalRecord - this.totalRows + 1;
          }
          this.loading = false;
          //this.FillTheFilter();
        });
      this.searchStateFound = false;
      this.loading = false;
    }*/
  }

  createGroupDeleteModal(employeeId: string): void {
    const modal: NzModalRef = this.modal.confirm({
      nzIconType: '',
      nzTitle: 'Deleting Employee?',
      nzContent: 'Are you sure you want to delete this employee?\nThis action cannot be undone!',
      nzOkText: 'Yes, Delete',
      nzOkType: 'default',
      nzOkDanger: true,
      nzModalType: 'default',
      nzOnOk: () => {
        this.DeleteEmployee(employeeId);
        modal.destroy();
      },
    });
  }

  createNotification(title: string, type: string, message: string): void {
    this._message.create(type, title, message);
  }

  DeleteEmployee(employeeId: string): void {debugger;

    this._employeeService.DeleteEmployee(employeeId)
      .subscribe((result: any) => {
        this.createNotification(
          'Deleting Employee',
          result.ResponseStatus.toString().toLocaleLowerCase(),
          result.Message
        );
        if (this.searchStateFound) {
          this.searchEmployees();
        } else {
          this.FeatchAllEmployees();
        }
      });
    }
    OnDelete(employeeId: string): void {
      this._assignResourceService.checkAssignmentStatus(employeeId).subscribe((res)=>{
        this.assignmentStatus=res;
             console.log(this.assignmentStatus)
          this._clientDetailsService.checkSalesPersonStatus(employeeId).subscribe((res)=>{
            this.salesPersonStatus=res;
             console.log(this.salesPersonStatus);
          this._employeeService.IsEmployeeSupervisor(employeeId).subscribe((res)=>{
            this.supervisorStatus=res;
            console.log(this.supervisorStatus);
     if(this.assignmentStatus==true || this.salesPersonStatus==true || this.supervisorStatus==true){
        this.createNotification("","warning","Cannot delete a Sales person or an employee assigned to a project");
      }
      else{debugger;
        this.createGroupDeleteModal(employeeId);
    }
          });
           
        }
    );
  });
 }
}