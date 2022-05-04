import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Data, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationType, NotifierService } from '../../../shared/services/notifier.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, fromEvent, of } from 'rxjs';
import { ResponseDTO, ResponseStatus } from '../../Models/ResponseDTO';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AddUserService } from '../../Services/add-user.service';
import {AuthenticationService} from './../../../../../../../libs/common-services/Authentication.service'
import { ColumnItem } from '../../Models/ColumnItem';
import { GroupSetModel } from '../../Models/group-set.model';
import { IEmployeeModel } from '../../Models/employee.model';
import { IUserModel } from '../../Models/User/UserList';
import { IUserPostModel } from '../../Models/User/user-post.model';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';

import { NzTableFilterList } from 'ng-zorro-antd/table';
import { PaginationResult } from '../../Models/PaginationResult';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { UserParams } from '../../Models/User/UserParams';
import { UserService } from '../../Services/user.service';
import { listtToFilter } from '../../Models/listToFilter';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit, OnInit  {

  userfrm: any;
  employeeList: IEmployeeModel [] = []
  selectedUserValue = '';
  isUserModalVisible=false;

  isGroupModalVisible = false;
  groupfrm: any;
  selectedUserId = '00be94a8-09fe-41c8-8151-7d9cc771996b';
  groupList: GroupSetModel[] = [];
  selectedGroups: string[] = [];

  size: NzButtonSize = 'small';
  userDashboardForm !: FormGroup;
  loading = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  userList$ : Observable<IUserModel[]>= new Observable<IUserModel[]>();
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  userList : IUserModel[] = [];
  paginatedResult !: PaginationResult<IUserModel[]>;
  userParams = new UserParams();
  searchStateFound !: boolean;
  pageSize = 10;
  pageIndex = 1;
  totalRows !:number;
  totalRecord !: number;
  userName!: string;
  departmentList: listtToFilter[] = [];
  jobTitleList: listtToFilter[] = [];
  statusList: listtToFilter[] = [];

  userListJobTitle : NzTableFilterList=[];
  userListStatus: NzTableFilterList=[];
  userListDepartment: NzTableFilterList=[];
  userListLastActivityDate: NzTableFilterList=[];
  userListFullName : NzTableFilterList=[];
  fullName = '';
  loadingOnSave = false;
  loadingOnSaveGroup = false;
  listOfColumns!: ColumnItem<IUserModel>[];
  confirmModal?: NzModalRef;
  sortBy!: string;
  sortOrder!: string;

  @ViewChild('userNameInput') public input!: ElementRef;

  isLogin=false;
  constructor(private userService : UserService,
    private notification: NotificationBar,
    private _router: Router,
    private fb: FormBuilder,
    private addUserService: AddUserService,
    private _permissionService:PermissionListService,private notify: NzNotificationService,
    private notifier: NotifierService, private _authenticationService:AuthenticationService,
    private modal: NzModalService) {
      this.isLogin=_authenticationService.loginStatus();
  }
  authorize(key:string){

    return this._permissionService.authorizedPerson(key);
  }


  ngAfterViewInit() {


    fromEvent<any>(this.input.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap( async (search) => {this.userDashboardForm.value.userName = search,
      this.SearchUsersByUserName()
      })
    ).subscribe();

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method

  ngOnInit(): void {

    this.userfrm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      GroupsOnUser: new FormControl([]),
    });
    this.groupfrm = new FormGroup({
      Groups: new FormControl([], Validators.required),
    });
    this.FillTheFilter();

    this.createUserDashboardControls();
    this.userList as IUserModel[];
    this.FeatchAllUsers();
    this.notification.showNotification({
      type: 'success',
      content: 'User dashboard loaded successfully',
      duration: 1,
    });

    this.notification.showNotification({
      type: 'success',
      content: 'User dashboad loaded successfully',
      duration: 1,
    });
  }

  createUserDashboardControls() {
    this.userDashboardForm = this.fb.group({
      userName: [''],
      department: [''],
      role: ['']
    })
  }

  FeatchAllUsers() {
    this.loading = true;
    this.userParams.searchKey = this.userDashboardForm.value.userName;
    this.userService.SearchUsers(this.userParams).subscribe((response:PaginationResult<IUserModel[]>) => {
      if(response.Data)
      {
        this.userList$=of(response.Data);
        this.userList = response.Data;
        this.listOfCurrentPageData = response.Data;
        this.pageIndex=response.pagination.PageIndex;
        this.pageSize=response.pagination.PageSize;
        this.totalRecord=response.pagination.TotalRecord
        this.totalRows=response.pagination.TotalRows;
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.userList = [];
        this.userList$=of([]);
      }

    },error => {
      this.loading = false;
     });
    this.searchStateFound=false;
  }

  FillTheFilter() {
    this.userService.GetDistinctDepartments().subscribe(res => {
      this.departmentList = [];
      for(let i = 0; i< res.Data.length; i++) {
        this.departmentList.push(
          {
            text: res.Data[i]['Name'],
            value:res.Data[i]['Name'],
          });
          this.userListDepartment = this.departmentList;
      }
    });
    this.userService.GetDistinctJobTitles().subscribe(res => {
      this.jobTitleList = [];
      for(let i = 0; i< res.Data.length; i++) {
        this.jobTitleList.push(
          {
            text: res.Data[i]['Name'],
            value:res.Data[i]['Name'],
          });
          this.userListJobTitle = this.jobTitleList;
      }
    });
    this.statusList.push({text: "Active", value: "Active"});
    this.statusList.push({text: "In-Active", value: "In-Active"});
    this.userListStatus = this.statusList;
  }

  SearchUsersByUserName() {
    this.loading = true;
    this.userParams.searchKey = this.userDashboardForm.value.userName;
    this.userParams.pageIndex = 1;
      this.userService.SearchUsers(this.userParams)
      .subscribe((response: PaginationResult<IUserModel[]>) => {
        if(response.Data) {
          this.userList$=of(response.Data);
          this.userList = response.Data;
          this.listOfCurrentPageData = response.Data;
          this.pageIndex=response.pagination.PageIndex;
          this.pageSize=response.pagination.PageSize;
          this.totalRecord=response.pagination.TotalRecord
          this.totalRows=response.pagination.TotalRows;
          // this.FillTheFilter();
          this.loading = false;
        }
        else
        {
          this.loading = false;
          this.userList = [];
          this.userList$=of([]);
          // this.FillTheFilter();
        }
        this.searchStateFound=true;
      },error => {
        this.loading = false;
        // this.PopulateFilterColumns();
      });
  }


  PageIndexChange(index: any): void {
    this.loading =true;
    this.userParams.pageIndex = index;
    this.userParams.searchKey = this.userName ?? "";
    if(this.searchStateFound == true)
    {
      this.userService.SearchUsers(this.userParams).subscribe(
        (response:PaginationResult<IUserModel[]>)=>{
          this.userList$ = of(response.Data);
          this.userList= response.Data;
          this.totalRows = response.pagination.TotalRows;
          this.pageIndex = response.pagination.PageIndex;
          this.loading =false;
          // this.FillTheFilter();
        });
    } else {
      this.userService.SearchUsers(this.userParams)
      .subscribe((response:PaginationResult<IUserModel[]>)=>{
        this.userList$=of(response.Data);
        this.userList = response.Data;
        this.totalRows = response.pagination.TotalRows;
        this.pageIndex = response.pagination.PageIndex;
        this.loading =false;
        // this.FillTheFilter();
      });
      this.searchStateFound=false;
      this.loading = false;
    }
  }
  
  onAddUser()
  {
    this.isUserModalVisible = true;
    this.addUserService.getEmployeesNotInUsers().subscribe(
      (r:ResponseDTO<[IEmployeeModel]>) => {
        this.employeeList= r.Data;
        this.FeatchAllUsers();
        this.addUserService.getGroups().subscribe(
          (r:  GroupSetModel[]) => {
              this.groupList = r;
          });
      },
      (error: any)=>{
        console.log(error);
        this.onShowError(error);
      }
    )
  }
  AddToGroup(userId: string, fullName: string)  {
    this.selectedUserId = userId;
    this.fullName = fullName;
    this.selectedGroups = [];
    this.isGroupModalVisible = true;
    this.loadingOnSaveGroup = true;
    this.addUserService.getGroups().subscribe(
        (r:  GroupSetModel[]) => {
            this.groupList = r;
            if(userId === '')
            return;

            this.addUserService.getUserGroups(userId).subscribe(
                (r: ResponseDTO<GroupSetModel[]>) => {
                    r.Data.forEach(el => {
                        this.selectedGroups.push(el.Guid);
                    });
                    this.groupfrm.setValue({'Groups': this.selectedGroups});
                    this.loadingOnSaveGroup = false;
                },
                (error: any) => {
                    console.log(error);
                }
            );
            this.loadingOnSaveGroup = false;
        },
        (error: any) => {
            console.log(error);
            this.onShowError(error.Error);
        }
    );
}
onSaveGroups() {

  this.selectedGroups = [];
  this.loadingOnSaveGroup = true;
      const x = this.groupfrm.get('Groups').value;

      x.forEach((el: string) => {
          this.selectedGroups.push(el as string);
      });

  this.addUserService.addGroups(this.selectedUserId, this.selectedGroups).subscribe(
      (r: ResponseDTO<any>) => {
        if( r.ResponseStatus == ResponseStatus.error)
       {
         this.onShowError('Some error has occured. Review your inputs and try again');
         this.loadingOnSaveGroup = false;
         return;
       }
          this.notifier.notify(
              NotificationType.success,
              'User has added to group successfully'
          );
          this.loadingOnSaveGroup = false;
          this.isGroupModalVisible = false;
          this.selectedGroups = [];
          this.groupfrm.reset();
      },
      (err: any) => this.onShowError(err)
  );



}

handleGroupCancel() {
  this.groupfrm.reset();
}
  onShowError(err: any) {
    const errMsg = 'Some error occured. Please review your input and try again. ';
    console.log(err);
    this.notifier.notify(NotificationType.error, errMsg);
    this.loadingOnSave = false;
    this.loadingOnSaveGroup = false;
  }
  onSaveUser()
  {

    if(this.selectedUserValue == null || '')
      this.onShowError('Select employee');
    this.loadingOnSave = true;
    const empId = this.selectedUserValue;
    this.addUserService.getEmployeeById(empId).subscribe(
      (res: ResponseDTO<IEmployeeModel>) => {
        const selectedGroups = this.userfrm.get('GroupsOnUser').value;
        const user: IUserPostModel =   {

          EmployeeId : res.Data.Guid,
          // FirstName : res.Data.FirstName,
          // MiddleName : res.Data.FatherName?res.Data.FatherName:'',
          // LastName : res.Data.GrandFatherName,
          FullName: res.Data.FullName,
          Tel:res.Data.MobilePhone,
          Email: res.Data.EmployeeOrganization?.CompaynEmail,
          UserName: res.Data.EmployeeOrganization?.CompaynEmail,
          GroupIds: selectedGroups?selectedGroups:[]
        };


        this.addUserService.add(user).subscribe(
          (r: ResponseDTO<any>) => {
            if( r.ResponseStatus == ResponseStatus.error)
            {
              this.onShowError('Some error has occured. Review your inputs and try again');
              this.loadingOnSave = false;
              return;
            }
            this.notifier.notify(
              NotificationType.success,
              'User is Added successfully'
            );
            this.loadingOnSave = false;
            this.isUserModalVisible = false;
            this.selectedUserValue = '';
            this.userfrm.reset();
            this.FeatchAllUsers();
            this.FillTheFilter();
          },
          (err: any) => this.onShowError(err)
        )
      }
    )
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Remove(userId: string) {

  }

  ShowDetail(userId: string) {
    this._router.navigateByUrl('/usermanagement/userdetails/'+ userId);
  }

  handleOk(): void {
    this.isUserModalVisible = false;
  }

  handleCancel(): void {
    this.userfrm.reset();
  }

  createNotification(title: string,type: string, message : string): void {
    this.notify.create(type, title, message);
  }

  sortOrderChange(event: any, sortBy: string) {
    // this.sortBy = "Name";
    this.userParams.sortBy = sortBy;
    if (event === 'ascend')
      this.userParams.sortOrder = "Ascending";
    else if (event === 'descend')
      this.userParams.sortOrder = "Descending";
    else {
      this.userParams.sortOrder = "";
      this.userParams.sortBy = "";
    }
    this.FeatchAllUsers();
  }

  filterChange(event: any, filterBy: string) {
    if (filterBy === "Department") {
      this.userParams.departmentFilter = event;
    } else if (filterBy === "JobTitle") {
      this.userParams.jobTitleFilter = event;
    } else if (filterBy === "Status") {
      this.userParams.statusFilter = event;
    }
    this.FeatchAllUsers();
    
  }

  showConfirm(userGuid : string): void {
    this.userService.isSuperAdmin(userGuid).subscribe((res)=>{
    
      if(res === true){
        this.modal.confirm({
          nzTitle: 'Super Admin Can Not Be Deleted !',
          nzContent: '',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false,
        //  nzOnOk: () => this.deleteHandler(id),
        //  nzCancelText: 'No'
        });
      }
      else{
    const modal: NzModalRef = this.modal.create({
      nzWidth:'350px',
      nzTitle: 'Delete user?',
      nzAutofocus : null,
      nzContent: 'Are you sure you want to delete user?This action can not be undone',
      nzFooter: [
        {
          label: 'Yes, Delete',
          type: 'primary',
          danger: false,
          onClick: () => {
            this.userService.RemoveUser(userGuid).subscribe(
              (result) => {
                this.createNotification("Deleting User",result.ResponseStatus.toString().toLocaleLowerCase(), result.Message);
                if(this.userDashboardForm.value.userName != '')
                {
                  this.SearchUsersByUserName();
                }
                else
                {
                  this.FeatchAllUsers();
                  this.FillTheFilter();
                }
              })
            modal.destroy()
          }
        },
        {
          label: 'cancel',
          type: 'default',
          onClick: () => modal.destroy(),

        }]        
      });
    }
  });
    }
  }
