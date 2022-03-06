import { Component,  OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { GroupSetModel } from '../../Models/group-set.model';
import { Observable, of } from 'rxjs';
import { GroupParams } from '../../Models/User/GroupParams';
import { IGroupUsersView } from '../../Models/User/GroupUsersView';
import { PaginationResult } from '../../Models/PaginationResult';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AllPermitionData, IPermissionModel, IPermissionResponseModel } from '../../Models/User/Permission-get.model';
import { GroupSetDescription } from '../../Models/Group/GroupSetDescription';
import { UserService } from '../../Services/user.service';
import { ResponseDTO } from '../../../models/ResponseDTO';
import { GroupUsers } from '../../Models/Group/GroupUsres';
import { AuthenticationService } from './../../../../../../../libs/common-services/Authentication.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { GroupSetService } from '../../Services/group-set.service';
import { PermissionService } from '../../Services/permission/permission.service';


@Component({
  selector: 'exec-epp-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  groupParams =  new GroupParams();
  constructor(private groupSetService : GroupSetService, private _router: Router,
              private fb: FormBuilder,private notification: NzNotificationService,
              private modal: NzModalService, private activatedRoute: ActivatedRoute,
              private _authenticationService:AuthenticationService,
              private _authpermissionService:PermissionListService,
              private _permissionService:PermissionService,
              private userService : UserService,
               private _pauthService:PermissionListService,) {
                this.isLogin=_authenticationService.loginStatus();
              }
  listOfAssignedPermistion:AllPermitionData[]=[]
  permissionResponse?:IPermissionResponseModel;
  permissionData?:any;
  childPermissions:IPermissionModel[]=[];
  parentPermission:any;
  isAddToGroupVisible = false;
  isVisible = false;
  isLogin=false;
  isGroupEditVisible = false;
  isConfirmLoading = false;
  isOkLoading = false;
  loading = false;
  groupDetail? : GroupSetModel;
  editedGroupDetail? : GroupSetDescription;
  size: NzButtonSize = 'small';
  groupSet$: Observable<GroupSetModel> | undefined ;
  groupId? : any;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  groupUserList : IGroupUsersView[] = [];
  groupUserList$ : Observable<IGroupUsersView[]>= new Observable<IGroupUsersView[]>();
  paginatedResult !: PaginationResult<IGroupUsersView[]>;
  pageSize = 10;
  pageIndex = 1;
  totalRows !:number;
  totalRecord !: number;
  beginingRow !: number;
  lastRow !: number;
  groupdescription : any;
  groupDescriptionEditForm !: FormGroup;
  AddUserToGroupForm !: FormGroup;
  groupUsers : GroupUsers= {
    GroupGuid: "",
    UserGuidCollection: [],
  };
  usersNotAssignedGroup !: IGroupUsersView[];
  listOfColumn = [
    {
      title: 'Name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IGroupUsersView, b: IGroupUsersView) => a.FullName.localeCompare(b.FullName),
      priority: 3
    }
  ];

  isNotsuperAdmin = true;

  ngOnInit() {
    
    this.createGroupDescriptionControls();
    this.AddUserToGroupControls();
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSetService.LoadGroupDeatil(this.groupId).subscribe((result : any) => {
      this.groupDetail = result
    } );
    this.FeatchAllGroupsUsers();
    this._permissionService.Permission=[];
    this.assinedPermission();
    this._permissionService.getGroupPermissionById(this.groupId);
    this.disableEdit();

  }
  
  disableEdit(){
    this.groupSetService.isSuperAdmin(this.groupId).subscribe((res)=>{
      if(res == true){
        this.isNotsuperAdmin = false;
        console.log(res);
        console.log("was");
      }
      });
  }

  createGroupDescriptionControls() {
    this.groupDescriptionEditForm = this.fb.group({
      description: [[this.groupDetail?.Description],[Validators.maxLength(250)]]
    })
  }
  authorize(key:string){

     return this._authpermissionService.authorizedPerson(key);
   }
  AddUserToGroupControls() {
    this.AddUserToGroupForm = this.fb.group({
      Users: [[],[Validators.required]]
    })
  }

  FeatchAllGroupsUsers() {
    this.loading = true;
    this.groupParams.groupId = this.groupId;
    this.groupSetService.LoadGroupUsers(this.groupParams).subscribe((response: PaginationResult<IGroupUsersView[]>) => {
      if(response.Data) {
        this.groupUserList$=of(response.Data);
        this.groupUserList = response.Data;
        this.listOfCurrentPageData = response.Data;
        this.pageIndex=response.pagination.PageIndex;
        this.pageSize=response.pagination.PageSize;
        this.totalRecord=response.pagination.TotalRecord;
        this.totalRows=response.pagination.TotalRows;
        this.lastRow = this.totalRows;
        this.beginingRow = 1;
      }
      else
      {
        this.groupUserList = [];
        this.groupUserList$=of([]);
      }
      this.loading = false;
    },() => {
      this.loading = false;
      this.groupUserList = [];
      this.groupUserList$=of([]);
     });
  }

  GroupUsersPageIndexChange(index: any): void {
    this.loading =true;
    this.groupParams.pageIndex = index;
    this.groupParams.groupId = this.groupId;
    this.groupSetService.LoadGroupUsers(this.groupParams).subscribe(
      (response:PaginationResult<IGroupUsersView[]>)=>{
        this.groupUserList$ = of(response.Data);
        this.groupUserList= response.Data;
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
      this.loading = false;
  }

  RemoveUserFromGroup(groupUserId : string) {
      this.groupSetService.RemoveUserFromGroup(groupUserId).subscribe((result) => {
        this.createNotification('Removing User',result.ResponseStatus.toString().toLocaleLowerCase(), result.Message);
        this.FeatchAllGroupsUsers();
      })
  }

 // createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    //this.modal.create({
     // nzTitle: tplTitle,
     // nzContent: tplContent,
     // nzFooter: tplFooter,
     // nzMaskClosable: false,
     // nzClosable: false,
     // nzComponentParams: {
      //  value: 'Template Context'
     // },
     // nzOnOk: () => console.log('Click ok')
   /// });
  //}

  createNotification(title: string,type: string, message : string): void {
    this.notification.create(type, title, message);
  }

  createGroupDeleteModal(): void {
    const groupId = this.groupDetail?.Guid;
     if(this.groupUserList.length > 0) {
      const modal: NzModalRef = this.modal.create({
       nzWidth:'400px',
       nzTitle: 'Group Deletion',
       nzContent: 'This group can not be deleted because there are users assigned to the group',
       nzFooter: [
        {
          label: 'Ok',
          type: 'primary',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: 'cancel',
          type: 'default',
          onClick: () => modal.destroy()
        }
      ]
    });
  }
   else {
    this.groupSetService.isSuperAdmin(this.groupId).subscribe((res)=>{
      if(res == true){
       const modal: NzModalRef = this.modal.create({
         nzWidth:'400px',
         nzTitle: 'Super Admin',
         nzContent: 'This Group Can Not Be Deleted',
         nzFooter: [
          {
            label: 'Ok',
            type: 'primary',
            onClick: () => {
              modal.destroy()
            }
          },
          {
            label: 'cancel',
            type: 'default',
            onClick: () => modal.destroy()
          }
        ]});
      }
      else {
        const modal: NzModalRef = this.modal.create({
        nzWidth:'400px',
        nzTitle: 'Delete '+ this.groupDetail?.Name + ' Group?',
        nzContent: "Are you sure you want to delete the group? Deleting a group can't be undone" ,
        nzFooter: [
          {
            label: 'Delete Group?',
            type: 'primary',
            onClick: () => {
              this.DeleteGroup();
              modal.destroy()
            }
          },
          {
            label: 'cancel',
            type: 'default',
            onClick: () => modal.destroy()
          }
        ]
      });
    }
  });}
}

  createGroupMemeberDeleteModal(groupUserId :string): void {
    const modal: NzModalRef = this.modal.create({
    nzWidth:'400px',
    nzTitle: 'Remove user?',
    nzContent: 'Are you sure you want to remove user? This action can not be undone',
    nzFooter: [
        {
          label: 'Yes, Remove',
          type: 'primary',
          onClick: () => {
            this.RemoveUserFromGroup(groupUserId);
            modal.destroy()
          }
        },
        {
          label: 'cancel',
          type: 'default',
          onClick: () => modal.destroy()
        }
      ]
    });
  }

  DeleteGroup(): void {
    this.groupSetService.DeleteGroup(this.groupId).subscribe(
      (result) => {
        this.createNotification('Deleting group',result.ResponseStatus.toString().toLocaleLowerCase(), result.Message);
        this._router.navigateByUrl('usermanagement/group');
      }
    )
  }

  handleCancel() {
    this.groupDescriptionEditForm.reset();
  }

  EditGroupDescription() {
    this.isGroupEditVisible = true;
    this.groupDescriptionEditForm.setValue({
      description : this.groupDetail?.Description
    });
  }

  SaveGroupDescription() {
    this.editedGroupDetail = {
      Guid: this.groupId,
      Description: this.groupDescriptionEditForm.value.description
    };
    this.groupSetService.EditGroupDescription(this.editedGroupDetail).subscribe((response) => {
      this.handleCancel();
      this.createNotification('Updating group description',response.ResponseStatus.toString().toLocaleLowerCase(), response.Message);
      this.groupSetService.LoadGroupDeatil(this.groupId).subscribe((result : any) => {
        this.groupDetail  = result
      } );
    });
    this.isGroupEditVisible = false;
  }

  assinedPermission(){
    this._permissionService.getPermissionCategoryById(this.groupId).subscribe((reponse:any)=>{
      this.permissionResponse=reponse;
      this.permissionData=this.permissionResponse?.Data;
      this.permissionData.forEach((element:any) => {
        this.parentPermission={
           Guid:element.Parent.Guid,
           PermissionCode :element.Parent.PermissionCode,
           Name :element.Parent.Name,
           value :element.Parent.KeyValue,
           label: this.firstLetterUperCaseWord(element.Parent.KeyValue.replace(/_/g, ' ')),
           ParentCode :element.Parent.ParentCode,
           checked:false,
           indeterminate:false,
           checkAll:false
        }

        element.Childs.forEach((element1:any) => {
          this.childPermissions=[...this.childPermissions,{
            Guid:element1.Guid,
            PermissionCode :element1.PermissionCode,
            Name :element1.Name,
            value :element1.KeyValue,
            label:this.firstLetterUperCaseWord(element1.KeyValue.replace(/_/g, ' ')),
            ParentCode :element1.ParentCode,
            checked:false,
            indeterminate:false,
            checkAll:false
         }]
        }

        );
        this.listOfAssignedPermistion=[...this.listOfAssignedPermistion,{
          Parent:this.parentPermission,
          Childs:this.childPermissions
        }];
        this.childPermissions=[];
      });
    });
  }
  //change char
  firstLetterUperCaseWord(word: string) {
    let fullPhrase="";
   const wordLists=word.split(" ");
   wordLists.forEach(element => {
   try {
    let titleCase='';
       if(element=="for" || element =="to"){
         titleCase =
        element[0].toLowerCase() + element.substr(1).toLowerCase();
       }
       else{
         titleCase =
        element[0].toUpperCase() + element.substr(1).toLowerCase();
       }
    fullPhrase= fullPhrase+ " "+ titleCase
   } catch (error) {
     console.log();
   }
   });
   return fullPhrase
 }

 GroupDescriptionEditCancel() {
   this.isGroupEditVisible = false;
   this.groupDescriptionEditForm.reset();
 }

 AddUserToGroup() {
    this.groupUsers.GroupGuid = this.groupId;
    this.groupUsers.UserGuidCollection = this.AddUserToGroupForm.value.Users;
    this.groupSetService.AddUsersToGroup(this.groupUsers).subscribe((result) => {
      this.isAddToGroupVisible=false;
      this.createNotification('Adding Users',result.ResponseStatus.toString().toLocaleLowerCase(), result.Message);
      this.FeatchAllGroupsUsers();
      this.AddUserToGroupForm.reset();
    });
 }

 CloseAddUserToGroup() {
  this.isAddToGroupVisible = false;
 }

 ShowAddUserToGroupModal() {
  this.isAddToGroupVisible = true;
  this.userService.LoadUsersNotAssignedToGroup(this.groupId).subscribe(
    (result: ResponseDTO<IGroupUsersView[]> | any)=> {
      this.usersNotAssignedGroup = result.Data;
    });
 }

 CancelAddUserToGroup() {
  this.AddUserToGroupForm.reset();
  this.AddUserToGroupForm.controls["Users"].markAsPristine()
 }

}  
