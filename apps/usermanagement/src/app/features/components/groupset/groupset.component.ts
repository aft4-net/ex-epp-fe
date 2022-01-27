import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, of, observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { ColumnItem } from '../../Models/ColumnItem';
import { FormValidator } from '../../../utils/validator';
import { GroupParams } from '../../Models/User/GroupParams';
import { GroupSetModel } from '../../Models/group-set.model';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { PaginationResult } from '../../Models/PaginationResult';
import { UserParams } from '../../Models/User/UserParams';
import { listtToFilter } from '../../Models/listToFilter';
import { AuthenticationService } from './../../../../../../../libs/common-services/Authentication.service';
import { GroupSetService } from '../../Services/group-set.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-groupset',
  templateUrl: './groupset.component.html',
  styleUrls: ['./groupset.component.scss']
})
export class GroupsetComponent implements OnInit {

  isVisible = false;
  groupSet = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70),
                              Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_ ]+$')]),
    Description: new FormControl('', [Validators.maxLength(250)])
  });

  size: NzButtonSize = 'small';
  groupDashboardForm !: FormGroup;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  groupList$ : Observable<GroupSetModel[]>= new Observable<GroupSetModel[]>();
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  groupList : GroupSetModel[] = [];
  paginatedResult !: PaginationResult<GroupSetModel[]>;
  groupParams = new GroupParams();
  searchStateFound !: boolean;
  pageSize = 10;
  pageIndex = 1;
  totalRows !:number;
  totalRecord !: number;
  beginingRow !: number;
  lastRow !: number;
  groupName!: string;
  isLogin=false;
  listOfColumns!: ColumnItem<GroupSetModel>[];

  listOfColumnsFullName: ColumnItem<GroupSetModel>[] = [
    {
      name: 'Group',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: GroupSetModel, b: GroupSetModel) => a.Name.length - b.Name.length,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    }
  ]

  @ViewChild('searchInput', { static: true })
  input!: ElementRef;


  constructor(
    //private _intialdataService: IntialdataService,
    private _authenticationService:AuthenticationService,
    private _permissionService:PermissionListService,
    private groupSetService: GroupSetService,
    private router: Router,
    private notification: NotificationBar,
    private validator: FormValidator,
    private fb: FormBuilder
  ) {
  this.isLogin=_authenticationService.loginStatus();
}
authorize(key:string){

  return this._permissionService.authorizedPerson(key);
}
// getPermission(): void {
 // this._intialdataService.getUserPermission().subscribe((res:any)=>{
   // this.permissionList=res.Data;
 // })
//}
  onAddNewRecord(): void {
    this.resetForm();
    this.isVisible = true;
  }
  resetForm(){
    this.groupSet.reset();
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  onSaveGroup(): void{
    const dataToPost = this.groupSet.value;

    this.groupSetService.createGroup(dataToPost).subscribe(
      () => {
        this.notification.showNotification({
          type: 'success',
          content: 'Group added successfully',
          duration: 5000,
        });
        this.FeatchAllgroups();
        this.isVisible = false;
      },
      (err: any) => {
        this.notification.showNotification({
          type: 'error',
          content: err?.error.Message,
          duration: 5000,
        });
        console.log('error:' + err.error.Message);

      }
    );

    this.groupSet.reset();
  }
  ngOnInit(): void {
    this.creategroupDashboardControls();
    this.groupList as GroupSetModel[];
    this.FeatchAllgroups();
    this.notification.showNotification({
      type: 'success',
      content: 'Groups loaded successfully',
      duration: 1,
    });
  }
  creategroupDashboardControls() {
    this.groupDashboardForm = this.fb.group({
      groupName: [''],
      description: ['']
    })
  }

  FeatchAllgroups() {
    this.loading = true;
    this.groupParams.searchKey = this.groupDashboardForm.value.groupName;
    this.groupSetService.SearchUsers(this.groupParams).subscribe((response:PaginationResult<GroupSetModel[]>) => {
      if(response.Data) {

        this.groupList$=of(response.Data);
        this.groupList = response.Data;
        this.listOfCurrentPageData = response.Data;
        this.pageIndex=response.pagination.PageIndex;
        this.pageSize=response.pagination.PageSize;
        this.totalRecord=response.pagination.TotalRecord;
        this.totalRows=response.pagination.TotalRows;
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.groupList = [];
        this.groupList$=of([]);

      }

    },error => {
      this.loading = false;

     });
    this.searchStateFound=false;
  }

  SearchgroupsByName() {

    this.groupParams.searchKey = this.groupDashboardForm.value.groupName;
    this.groupSetService.SearchUsers(this.groupParams)
    .subscribe((response: PaginationResult<GroupSetModel[]>) => {
      if(response.Data) {
        this.loading = true;
        this.groupList$=of(response.Data);
        this.groupList = response.Data;
        this.listOfCurrentPageData = response.Data;
        this.pageIndex=response.pagination.PageIndex;
        this.pageSize=response.pagination.PageSize;
        this.totalRecord=response.pagination.TotalRecord;
        this.totalRows=response.pagination.TotalRows;
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.groupList = [];
        this.groupList$=of([]);

      }
      this.searchStateFound=true;
    },error => {
      this.loading = false;
     });
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap( async (search) => {this.groupDashboardForm.value.groupName = search,
      this.SearchgroupsByName()
      })
    ).subscribe();
  }

  PageIndexChange(index: any): void {

    this.groupParams.pageIndex = index;
    this.groupParams.searchKey = this.groupName ?? "";
    if(this.searchStateFound == true)
    {
      this.groupSetService.SearchUsers(this.groupParams).subscribe(
        (response:PaginationResult<GroupSetModel[]>)=>{
          this.loading =true;
          this.groupList$ = of(response.Data);
          this.groupList= response.Data;
          this.totalRows = response.pagination.TotalRows;
          this.pageIndex = response.pagination.PageIndex;
          if(this.totalRows === this.pageSize)
          {
            this.lastRow = this.pageSize * index;
            this.beginingRow = (this.totalRows * (index-1)) + 1;
          }
          else if((this.totalRows < this.pageSize))
          {
            this.lastRow = this.totalRecord;
            this.beginingRow = (this.totalRecord - this.totalRows) + 1;
          }
          this.loading =false;
        });
    } else {
      this.groupSetService.SearchUsers(this.groupParams)
      .subscribe((response:PaginationResult<GroupSetModel[]>)=>{
        this.groupList$=of(response.Data);
        this.groupList = response.Data;
        this.totalRows = response.pagination.TotalRows;
        this.pageIndex = response.pagination.PageIndex;
        if(this.totalRows === this.pageSize)
        {
          this.lastRow = this.pageSize * index;
          this.beginingRow = (this.totalRows * (index-1)) + 1;
        }
        else if((this.totalRows < this.pageSize))
        {
          this.lastRow = this.totalRecord;
          this.beginingRow = (this.totalRecord - this.totalRows) + 1;
        }
        this.loading =false;
      });
      this.searchStateFound=false;
      this.loading = false;
    }
  }

  AddToGroup(userId: string) {
 // to do
  }

  Remove(userId: string) {
// to do
  }

  ShowDetail(groupId : string) {
    this.router.navigateByUrl('usermanagement/group-detail/' + groupId);
  }
}
