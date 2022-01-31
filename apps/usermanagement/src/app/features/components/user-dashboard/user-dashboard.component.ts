import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Data, Router, RouterLink } from '@angular/router';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, timeInterval } from 'rxjs/operators';
import { ColumnItem } from '../../Models/ColumnItem';
import { listtToFilter } from '../../Models/listToFilter';
import { PaginationResult } from '../../Models/PaginationResult';
import { IUserModel } from '../../Models/User/UserList';
import { UserParams } from '../../Models/User/UserParams';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NotificationType, NotifierService } from '../../../shared/services/notifier.service';
import { ResponseDTO, ResponseStatus } from '../../Models/ResponseDTO';
import { IEmployeeModel } from '../../Models/employee.model';
import { IUserPostModel } from '../../Models/User/user-post.model';
import { GroupSetModel } from '../../Models/group-set.model';
import {AuthenticationService} from './../../../../../../../libs/common-services/Authentication.service'
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../Services/user.service';
import { AddUserService } from '../../services/add-user.service';

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
  beginingRow !: number;
  lastRow !: number;
  userName!: string;
  holdItDepartment: listtToFilter[] = [];
  holdItJobTitle: listtToFilter[] = [];
  holdItStatus: listtToFilter[] = [];

  userListJobTitle : NzTableFilterList=[];
  userListStatus: NzTableFilterList=[];
  userListDepartment: NzTableFilterList=[];
  userListLastActivityDate: NzTableFilterList=[];
  userListFullName : NzTableFilterList=[];
  fullName = '';
  loadingOnSave = false;
  listOfColumns!: ColumnItem<IUserModel>[];
  confirmModal?: NzModalRef;
  listOfColumnsUser: ColumnItem<IUserModel>[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IUserModel, b: IUserModel) => a.FullName.length - b.FullName.length,
      filterMultiple: false,
      listOfFilter: this.userListFullName,
      filterFn: null
    }
  ];
  listOfColumnsLastActivityDate: ColumnItem<IUserModel>[] = [
  {
      name: 'Last Activity',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IUserModel, b: IUserModel) => a.LastActivityDate.length - b.LastActivityDate.length,
      filterMultiple: true,
      listOfFilter:this.userListLastActivityDate,
      filterFn: (list: string[], item: IUserModel) => list.some(name => item.LastActivityDate.indexOf(name) !== -1)
    }
  ];

  @ViewChild('userNameInput', { static: true }) element: ElementRef | undefined;
  input!: ElementRef;
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
  ngAfterContentInit() {
    setTimeout(() => {
    if(!this.authorize('View_User')&&this.isLogin)
    this._router.navigateByUrl('usermanagement/unauthorize')
    }, 100);
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
    this.userParams.userName = this.userDashboardForm.value.userName;
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
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
        this.FillTheFilter();
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.userList = [];
        this.userList$=of([]);
        this.FillTheFilter();
      }

    },error => {
      this.loading = false;
      this.PopulateFilterColumns();
     });
    this.searchStateFound=false;
  }

  PopulateFilterColumns() : ColumnItem<IUserModel>[] {
    return this.listOfColumns = [
          {
            name: 'Department',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IUserModel, b: IUserModel) => a.Department.localeCompare(b.Department),
            filterMultiple: true,
            listOfFilter:this.userListDepartment,
            filterFn: (list: string[], item: IUserModel) => list.some(name => item.Department.indexOf(name) !== -1)
          },
          {
            name: 'Role',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IUserModel, b: IUserModel) => a.JobTitle.localeCompare(b.JobTitle),
            filterMultiple: true,
            listOfFilter: this.userListJobTitle,
            filterFn: (list: string[], item: IUserModel) => list.some(name => item.JobTitle.indexOf(name) !== -1)
          },
          {
            name: 'Status',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: IUserModel, b: IUserModel) => a.Status.localeCompare(b.Status),
            filterMultiple: true,
            listOfFilter: this.userListStatus,
            filterFn: (list: string[], item: IUserModel) => list.some(name => item.Status.indexOf(name) !== -1)
          }
      ];
  }

  FillTheFilter() {
    this.holdItJobTitle.length = 0;
    this.holdItStatus.length = 0;
    this.holdItDepartment.length = 0;
    this.userList$.subscribe(
       val => {
        if(val.length > 0){
          this.userList = val
          for(let i=0; i < this.userList.length;i++){
            if(this.holdItDepartment.findIndex(x=>x.text === this.userList[i].Department.trim()) === -1 ){
                this.holdItDepartment.push(
                {
                  text: this.userList.map(x=>x.Department)[i],
                  value:this.userList.map(x=>x.Department)[i]
                })
              }
          }
          for(let i=0; i < this.userList.length;i++){
            if(this.holdItJobTitle.findIndex(x=>x.text === this.userList[i].JobTitle.trim()) === -1){
              this.holdItJobTitle.push(
                {
                  text:this.userList.map(x=>x.JobTitle)[i],
                  value:this.userList.map(x=>x.JobTitle)[i]
                }
              )
            }

          }
          for(let i=0; i < this.userList.length;i++){
              if(this.holdItStatus.findIndex(x=>x.text === this.userList[i].Status.trim()) === -1){
              this.holdItStatus.push(
                {
                  text:this.userList.map(x=>x.Status)[i],
                  value:this.userList.map(x=>x.Status)[i]
                }
              )

            }
          }

          this.userListDepartment= this.holdItDepartment,
          this.userListStatus=this.holdItStatus,
          this.userListJobTitle =this.holdItJobTitle
          this.PopulateFilterColumns();
        }
        else{
          this.PopulateFilterColumns();
      }
    });
  }

  SearchUsersByUserName() {
    this.loading = true;
    this.userParams.userName = this.userDashboardForm.value.userName;
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
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
        this.FillTheFilter();
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.userList = [];
        this.userList$=of([]);
        this.FillTheFilter();
      }
      this.searchStateFound=true;
    },error => {
      this.loading = false;
      this.PopulateFilterColumns();
     });
  }

  ngAfterViewInit() {
    if(!this.input?.nativeElement){
      return;
    }
    fromEvent<any>(this.input.nativeElement,'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap( async (search) => {this.userDashboardForm.value.userName = search,
      this.SearchUsersByUserName()
      })
    ).subscribe();
  
    
  }

  PageIndexChange(index: any): void {
    this.loading =true;
    this.userParams.pageIndex = index;
    this.userParams.userName = this.userName ?? "";
    if(this.searchStateFound == true)
    {
      this.userService.SearchUsers(this.userParams).subscribe(
        (response:PaginationResult<IUserModel[]>)=>{
          this.userList$ = of(response.Data);
          this.userList= response.Data;
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
          this.FillTheFilter();
        });
    } else {
      this.userService.SearchUsers(this.userParams)
      .subscribe((response:PaginationResult<IUserModel[]>)=>{
        this.userList$=of(response.Data);
        this.userList = response.Data;
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
        this.FillTheFilter();
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
    this.loadingOnSave = true;
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
                    this.loadingOnSave = false;
                },
                (error: any) => {
                    console.log(error);
                }
            );
            this.loadingOnSave = false;
        },
        (error: any) => {
            console.log(error);
            this.onShowError(error.Error);
        }
    );
}
onSaveGroups() {

  this.selectedGroups = [];
  this.loadingOnSave = true;
      const x = this.groupfrm.get('Groups').value;
      
      x.forEach((el: string) => {
          this.selectedGroups.push(el as string);
      });

  this.addUserService.addGroups(this.selectedUserId, this.selectedGroups).subscribe(
      (r: ResponseDTO<any>) => {
        if( r.ResponseStatus == ResponseStatus.error)
       {
         this.onShowError('Some error has occured. Review your inputs and try again');
         this.loadingOnSave = false;
         return;
       }
          this.notifier.notify(
              NotificationType.success,
              'User has added to group successfully'
          );
          this.loadingOnSave = false;
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
          FirstName : res.Data.FirstName,
          MiddleName : res.Data.FatherName,
          LastName : res.Data.GrandFatherName,
          Tel:res.Data.MobilePhone,
          Email: res.Data.PersonalEmail,
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
              'User is created successfully'
            );
            this.loadingOnSave = false;
            this.isUserModalVisible = false;
            this.selectedUserValue = '';
            this.userfrm.reset();
            this.FeatchAllUsers();
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
    console.log('Button ok clicked!');
    this.isUserModalVisible = false;
  }

  handleCancel(): void {
    this.userfrm.reset();
  }

  createNotification(title: string,type: string, message : string): void {
    this.notify.create(type, title, message);
  }

  showConfirm(userGuid : string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete the user?',
      nzContent: 'Once you delete the user you can not undo the deletion',
      nzOkText: 'Delete User',
      nzOkType: 'default',
      nzOkDanger: true,
      nzOnOk: () =>
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
            }
          })
      });
    }
}
