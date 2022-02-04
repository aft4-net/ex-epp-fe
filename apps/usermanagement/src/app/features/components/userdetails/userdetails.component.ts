import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormValidator } from '../../../utils/validator';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { UserDetail, GroupData } from '../../Models/User/UserDetail';
import { CustomFormModule } from '../../../shared/modules/forms/custom-form.module';
import { AuthenticationService } from './../../../../../../../libs/common-services/Authentication.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { IUserModel } from '../../Models/User/UserList';
import { AddUserService } from './../../services/add-user.service';
import { ResponseDTO, ResponseStatus } from '../../Models/ResponseDTO';
import { NotificationType, NotifierService } from '../../../shared/services/notifier.service';
import { GroupSetModel } from '../../Models/group-set.model';
import { UserDetailService } from './../../services/user-detail.service';




@Component({
  selector: 'exec-epp-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  isModalVisible = false;
  isUpdateMode = false;
  switchValue = false;
  loading = false;
  nzSwitch=true;
  isLogin=false;
  //userList : IUserModel[] = [];
 // userListJobTitle : NzTableFilterList=[];
  public userDetals: [UserDetail] | [] = [];
  isRecordUpdated = false;
  //selectedRecord: string | undefined;
 // cgm=CustomFormModule;
  userId:any;
  thePosition : any;
  userdetailInfo:any 
  //GName = '';
  groupfrm: any;
  userdetail = new FormGroup({
    UserId: new FormControl(''),
    FullName: new FormControl(''),
    JobTitle: new FormControl(''),
    Email: new FormControl(''),
    PhoneNo: new FormControl(''),
    Status: new FormControl(''),
    GroupIDArray: new FormControl([], Validators.required),
    //UserGuid: new FormControl('1399365f-ac3f-4cbe-a026-a3860954a8d0'),
    UserGuid: new FormControl([]),
  });

  public validation = new FormGroup({
    isMultitpleEntry: new FormControl(false, [Validators.required]),
  });
  
  public fetchedGroupName: [GroupData] | [] = [];

  userGroup = new FormGroup({
    GroupIDArray: new FormControl([], Validators.required),
    UserGuid: new FormControl()
 });
 groupList: GroupData[] = [];
 selectedGroups: string[] = [];
  public listOfTypes: [UserDetail] | [] = [];
  public listOfGroups: [GroupData] | [] =[];
  selectedSoFar = [];
  listUserGroups: Array<any> = [];
  public membershipList: [GroupData] | [] =[];
 // isGroupModalVisible: boolean;


  getAllGroupSetsByUserId() {
    this.userDetailService.getGroupSetByUserId(this.userId).subscribe((res) => {
      this.fetchedGroupName = res.Data;
    });
  }
  getAllUserGroups() {
    this.userDetailService.getAllUserGroupsByUserId(this.userId).subscribe((res) => {
      this.listUserGroups = res.Data;
      console.log(this.listUserGroups)
    });
  }
  getAllGroupList(){
      this.userDetailService.get().subscribe(
      (res) => {
        this.listOfGroups = res.Data;
      }
      // (err) => this.onShowError(err)
    );
  }

  getUsers() {
    this.userDetailService.getUserInfo(this.userId).subscribe((res) => {
      this.userDetals = res.Data;
      console.log(this.userDetals);
    });
  }

  constructor(
    private userDetailService: UserDetailService,
    private router: Router,
    private modal: NzModalService,
    private notification: NotificationBar,
    private _authenticationService:AuthenticationService,
    private _permissionService:PermissionListService,
    private validator: FormValidator,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private authPermission:PermissionListService,
    private addUserService: AddUserService,
    private notifier: NotifierService
  ) {
   
    this.isLogin=_authenticationService.loginStatus();
    
  }
  authorize(key:string){
     return this.authPermission.authorizedPerson(key);
   }
  hasDataEntry(value: boolean) {
    this.userDetailService.hasData(value);
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    //this.getAllGroupSetsByUserId();
    //this.getUsers();
    this.getAllGroupList();
    this.getAllUserGroups();
    this.groupfrm = new FormGroup({
      Groups: new FormControl([], Validators.required),
  });
    this.userDetailService.getUserById(this.userId)
      .subscribe(async (response:any) => {
        this.userdetailInfo = response.Data;
        //this.thePosition = response.Data.userListJobTitle; 
    this.userDetailService.getUser(this.userdetailInfo.Email).subscribe((res:any)=>{
     this.thePosition=res.EmployeeOrganization;
      console.log('test')
      console.log(this.thePosition)
      console.log('test')
    });
      
     
      });
      }
  
handleGroupCancel() {
  this.groupfrm.reset();
}
AddToGroup()  {
  this.selectedGroups = [];
  this.isModalVisible = true;
  this.loading = true;
  this.addUserService.getGroups().subscribe(
      (r:  GroupSetModel[]) => {
          this.groupList = r;
          this.addUserService.getUserGroups(this.userId).subscribe(
              (r: ResponseDTO<GroupSetModel[]>) => {
                  r.Data.forEach(el => {
                      this.selectedGroups.push(el.Guid);
                  });
                  this.groupfrm.setValue({'Groups': this.selectedGroups});
                  this.loading = false;
              },
              (error: any) => {
                  console.log(error);
              }
          );
          this.loading = false;
      },
      (error: any) => {
          console.log(error);
          this.onShowError(error.Error);
      }
  );
}

  onShowError(Error: any) {
    throw new Error('Method not implemented.');
  }
  onSaveGroups() {

    this.selectedGroups = [];
    this.loading = true;
        const x = this.groupfrm.get('Groups').value;
        
        x.forEach((el: string) => {
            this.selectedGroups.push(el as string);
        });
  
    this.addUserService.addGroups(this.userId, this.selectedGroups).subscribe(
        (r: ResponseDTO<any>) => {
          if( r.ResponseStatus == ResponseStatus.error)
         {
           this.onShowError('Some error has occured. Review your inputs and try again');
           this.loading = false;
           return;
         }
            this.notifier.notify(
                NotificationType.success,
                'User successfully added to '+ this.getGroupName + 'group'
            );
            this.loading = false;
            this.isModalVisible = false;
            this.selectedGroups = [];
            this.groupfrm.reset();
            this.getAllUserGroups();
            
        },
        (err: any) => this.onShowError(err)
    );
  
  
  
  }
 
 
  closeModal() {
    this.isModalVisible = false;
  }

   clickSwitch(): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 3000);
    }
  }
  onFormSubmit() {
    this.isModalVisible = false;
    this.loading = true;
    this.router.navigate(['']);
    this.loading = false;
  }

  // resetForm() {
  //   this.userdetail.reset();
  // }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  getGroupName(value: any) {
    
    const result = this.listOfGroups.find((obj) => {
      
      return obj.Guid === value;
    });
    //debugger;
    return result?.Name;
  }
  getGroupName1(value: any) {
    const result = this.listOfGroups.find((obj) => {
      return obj.Guid === value;
    });
    //debugger;
    return result?.Name;
  }

  onDeleteRecord(id: string,name:string) {
    this.showConfirmation(id,name);
  }

  showConfirmation(guid: string,name:string): void {
    const groupName:string | undefined = this.getGroupName(name);
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to remove this user from '+ groupName + ' group?',
      nzOkText: 'Ok',
    nzOkType: 'default',
    nzOkDanger: true,
      nzOnOk: () => {
        this.deleteItem(guid,name);
      },
    });
  }

  deleteItem(guid: string | null,name:string|null) {
    const groupName:string | undefined = this.getGroupName(name);
    const id = guid ? guid : '';
    this.userDetailService.deleteGroupFromUser(id).subscribe(
      () => {
        this.loading = false;
        this.notification.showNotification({
          type: 'success',
          content: 'Successfully removed user from ' + groupName + ' group' ,
          duration: 5000,
        });
       // this.getAllGroupSetsByUserId();
        this.getAllGroupList();
        this.getAllUserGroups();
        this.hasDataEntry(this.userDetals.length > 0 ? true : false);
      },
      (err: any) => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Group entry not deleted. Please try again.',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );
  }
}
