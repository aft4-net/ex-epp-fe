import { Component,  OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { GroupSetService } from '../../services/group-set.service';
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
import { PermissionService } from '../../services/permission/permission.service';
import { GroupSetDescription } from '../../Models/Group/GroupSetDescription';

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
              private _permissionService:PermissionService) {

              }
  listOfAssignedPermistion:AllPermitionData[]=[]
  permissionResponse?:IPermissionResponseModel;
  permissionData?:any;
  childPermissions:IPermissionModel[]=[];
  parentPermission:any;
  isAddToGroupVisible = false;
  isVisible = false;
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
  AddToGroupForm !: FormGroup;
  listOfColumn = [
    {
      title: 'Name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IGroupUsersView, b: IGroupUsersView) => a.FullName.localeCompare(b.FullName),
      priority: 3
    }
  ];

  ngOnInit() {
    this.createGroupDescriptionControls();
    this.createAddToGroupControls();
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSetService.LoadGroupDeatil(this.groupId).subscribe((result : any) => {
      this.groupDetail  = result 
      console.log(result)
    } );
    this.FeatchAllGroupsUsers()
    this._permissionService.PermissionList=[];
    this.assinedPermission();
    this._permissionService.getGroupPermissionById(this.groupId);
  }
  createGroupDescriptionControls() {
    this.groupDescriptionEditForm = this.fb.group({
      description: [[],[Validators.required]]
    })
  }

  createAddToGroupControls() {
    this.AddToGroupForm = this.fb.group({
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
        this.totalRecord=response.pagination.TotalRecord
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  RemoveUserFromGroup(userId : string) {

  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context'
      },
      nzOnOk: () => console.log('Click ok')
    });
  }

  createNotification(title: string,type: string, message : string): void {
    this.notification.create(type, title, message);
  }

  createGroupDeleteModal(): void {
    const modal: NzModalRef = this.modal.create({
    nzTitle: 'Delete '+ this.groupDetail?.Name + ' Group',
    nzContent: 'Users in this group will lose all permissions related to the group.' + 
                "Deleting a group can't be undone",
    nzFooter: [
      {
          label: 'Cancel',
          shape: 'round',
          onClick: () =>{
            modal.destroy()
          } 
      },
      {
        label: 'Delete Group',
        type: 'primary',
        danger: true,
        disabled: false,
        loading: false,
        onClick: () => {
          this.DeleteGroup();
          modal.destroy()
        }
      }]
    });
  }

  createEditGroupDescriptionModal(): void {
    const modal: NzModalRef = this.modal.create({
    nzTitle: "Edit group's description",
    nzContent: "Edit the group's description to organize your groups better on the list. You can't edit the group's name.",
    nzFooter: [
      {
          label: 'Cancel',
          shape: 'round',
          onClick: () =>{
            modal.destroy()
          } 
      },
      {
        label: 'Delete Group',
        type: 'primary',
        danger: true,
        disabled: true,
        loading: false,
        onClick: () => {
          this.DeleteGroup();
          modal.destroy()
        }
      }]
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
  }

  SaveGroupDescription() {
    this.editedGroupDetail = {
      Guid: this.groupId,
      Description: this.groupDescriptionEditForm.value.description
    };
    console.log(this.editedGroupDetail.Description);
    this.groupSetService.EditGroupDescription(this.editedGroupDetail).subscribe((x) => {
      this.handleCancel();
      this.createNotification('Updating group description',x.ResponseStatus.toString().toLocaleLowerCase(), x.Message);
      this.groupSetService.LoadGroupDeatil(this.groupId).subscribe((result : any) => {
        this.groupDetail  = result 
        console.log(result)
      } );
    });
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
  firstLetterUperCaseWord(word: string) {
    let fullPhrase="";
   const wordLists=word.split(" ");
   wordLists.forEach(element => {
   const titleCase=  element[0].toUpperCase() + element.substr(1).toLowerCase()
   fullPhrase= fullPhrase+ " "+ titleCase
   });
   return fullPhrase
 }

 GroupDescriptionEditCancel() {
   this.isGroupEditVisible = false;
   this.groupDescriptionEditForm.reset();
 }

 // eslint-disable-next-line @typescript-eslint/no-empty-function
 AddUserToGroup() : void {

 }

 CloseAddUserToGroup() {
  this.isAddToGroupVisible = false;
 }

 ShowAddUserToGroupModal() {
  this.isAddToGroupVisible = true;
 }
}
