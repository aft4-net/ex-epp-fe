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
import { environment } from '../../../../environments/environment';
import { AccountService } from '../../../services/user/account.service';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { MessageBar } from '../../../utils/feedbacks/message';
import { NzTableModule } from 'ng-zorro-antd/table';
//import { UserDetailService } from '../../services/user-detail.service';
import { UserDetail, GroupData } from '../../Models/User/UserDetail';
import { CustomFormModule } from '../../../shared/modules/forms/custom-form.module';
import { AuthenticationService } from './../../../../../../../libs/common-services/Authentication.service';
import { PermissionService } from '../../services/permission/permission.service';
import { UserDetailService } from '../../Services/user-detail.service';


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
  public userDetals: [UserDetail] | [] = [];
  isRecordUpdated = false;
  selectedRecord: string | undefined;
  cgm=CustomFormModule;
  userId:any;
  thePosition : any;
  userdetailInfo:any
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

  public listOfTypes: [UserDetail] | [] = [];
  public listOfGroups: [GroupData] | [] =[];
  selectedSoFar = [];
  listUserGroups: Array<any> = [];
  public membershipList: [GroupData] | [] =[];


  getAllGroupSetsByUserId() { 
    this.userDetailService.getGroupSetByUserId(this.userId).subscribe((res) => {
      this.fetchedGroupName = res.Data;
    });
  }
  getAllUserGroups() { 
    this.userDetailService.getAllUserGroupsByUserId(this.userId).subscribe((res) => {
      this.listUserGroups = res.Data;
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
    this.userDetailService.getUserInfo("").subscribe((res) => {
      this.userDetals = res.Data;
      console.log(this.userDetals);
    });
  }

  constructor(
    private userDetailService: UserDetailService,
    //private _intialdataService: IntialdataService,
    private router: Router,
    private modal: NzModalService,
    private notification: NotificationBar,
    private _authenticationService:AuthenticationService, 
    private _permissionService:PermissionService,
    private validator: FormValidator,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.userdetail = _fb.group({
      Name: '',
      JobTitle: null,
      Guid:null
    });
    this.isLogin=_authenticationService.loginStatus();
    this.thePosition = _authenticationService.position;
  }
  authorize(key:string){
     
    // return true;
     return this._permissionService.authorizedPerson(key);
   }
  // getPermission(): void {
   // this._intialdataService.getUserPermission().subscribe((res:any)=>{
     // this.permissionList=res.Data;     
   // })
  //}
  hasDataEntry(value: boolean) {
    this.userDetailService.hasData(value);
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getAllGroupSetsByUserId();
    this.getUsers();
    this.getAllGroupList();
    this.getAllUserGroups();
    this.userDetailService.getUserById(this.userId)
      .subscribe(async (response:any) => {
        this.userdetailInfo = response.Data;
       
      });
     // this.getPermission();
      //._permissionService.permissionList=this.permissionList;
      }

  onAddNewRecord(): void {
    this.resetForm();
    this.isModalVisible = true;
    //this.validation.controls.isMultitpleEntry.setValue(true);
    this.isUpdateMode = false;
  }
  
  onSaveRecord(): void {
    const dataToPost = this.userGroup.value;
    dataToPost.UserGuid = this.userId;
    console.log('dataToPost')
    console.log(dataToPost)
    console.log('dataToPost')
    this.userDetailService.addGroupToUser(dataToPost).subscribe(
      () => {
        this.loading = false;
        this.isModalVisible = false;
        this.notification.showNotification({
          type: 'success',
          content: 'You have successfully added group to user.',
          duration: 5000,
        });

        this.getAllGroupSetsByUserId();
        this.getAllGroupList();
        this.getAllUserGroups();
        this.hasDataEntry(this.userDetals.length > 0 ? true : false);
      },
      (err: any) => {
        this.loading = false;
        this.notification.showNotification({
          type: 'error',
          content: 'Group is not added. Please try again',
          duration: 5000,
        });
        console.log('error:' + err);
      }
    );

    if (!this.validation.controls.isMultitpleEntry.value) {
      this.isModalVisible = false;
      this.notification.showNotification({
        type: 'success',
        content: 'You have successfully added group to user.',
        duration: 5000,
      });
      this.isRecordUpdated = true;
     
    }
    this.userdetail.reset();
    this.validation.controls.isMultitpleEntry.setValue(true);
    this.isRecordUpdated = true;
  }
  closeModal() {
    this.isModalVisible = false;
  }

  onDisplayRecord(id: string) { 
    this.isModalVisible = true;
    this.isUpdateMode = true;
    this.selectedRecord = id;
    const toDisplayRow = this.userdetail;
    this.userdetail.patchValue({
     // UserId: toDisplayRow.UserId,
      //FullName: toDisplayRow.FullName,
      //JobTitle: toDisplayRow.JobTitle,
      //Email: toDisplayRow.Email,
      //PhoneNo: toDisplayRow.PhoneNo, 
      //Status: toDisplayRow.Status, 
    });
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

  resetForm() {
    this.userdetail.reset();
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  getGroupName(value: any) {
    const result = this.listOfGroups.find((obj) => {
      return obj.Guid === value;
    });
    return result?.Name;
  }

  onDeleteRecord(id: string) {
    this.showConfirmation(id);
  }

  showConfirmation(guid: string | null): void {
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this entry?',
      nzOnOk: () => {
        this.deleteItem(guid);
      },
    });
  }

  deleteItem(guid: string | null) {
    const id = guid ? guid : '';
    this.userDetailService.deleteGroupFromUser(id).subscribe(
      () => {
        this.loading = false;
        this.notification.showNotification({
          type: 'success',
          content: 'Successfully deleted group from user.',
          duration: 5000,
        });
        this.getUsers();
        this.getAllGroupSetsByUserId();
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