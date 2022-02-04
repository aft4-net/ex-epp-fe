import { Component, OnInit } from '@angular/core';
import {
  AllPermitionData,
  IPermissionModel,
  IPermissionResponseModel,
} from '../../Models/User/Permission-get.model';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonDataService } from '../../../../../../../libs/common-services/commonData.service';
import { PermissionService } from '../../services/permission/permission.service';

export interface GroupCheckBoxItem {
  label: string;
  value: string;
  checked: boolean;
  Guid: string;
}
export interface SelecttedPermission {
  Guid: string;
}

@Component({
  selector: 'exec-epp-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  permissionResponse?: IPermissionResponseModel;
  permissionData:any;
  parentPermission: any;
  onePermission: any;
  allChecked = false;
  indeterminate = true;
   allModuleCecked=true;
   countSelectedModule=0;
   allModuleIntermidate=true;
  isLoding=false;
  permissionIdList: string[] = [];
  childPermissions: IPermissionModel[] = [];
  listOfPermistion: AllPermitionData[] = [];
  listOfAssignedPermistion: AllPermitionData[] = [];
  listCheckBox: GroupCheckBoxItem[] = [];
goupPermissions:IPermissionModel[] = [];
  selectedPermissionList: SelecttedPermission[] = [];
  groupId: any;
  constructor(
    public _commonData:CommonDataService,
    private _notification: NzNotificationService,
    private route: ActivatedRoute,
    private _permissionService: PermissionService,
    private notification: NotificationBar,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.groupId = this.route.snapshot.paramMap.get('id');
    this._permissionService.goupPermissions.forEach(element => {
      this.selectedPermissionList = [
        ...this.selectedPermissionList,
        { Guid: element.Guid },
      ];

    });
    this._permissionService.getPermission().subscribe((reponse: any) => {
      this.permissionResponse = reponse;
      this.permissionData = this.permissionResponse?.Data;
      this.permissionData.forEach((element: any) => {

        this.parentPermission = {
          Guid: element.Parent.Guid,
          PermissionCode: element.Parent.PermissionCode,
          Name: element.Parent.Name,
          value: element.Parent.KeyValue,
          label: this.firstLetterUperCaseWord(
            element.Parent.KeyValue.replace(/_/g, ' ')
          ),
          ParentCode: element.Parent.ParentCode,
          checked: false,
          indeterminate: false,
          checkAll: false,
        };
        element.Childs.forEach((element1: any) => {
          this.childPermissions = [
            ...this.childPermissions,
            {
              Guid: element1.Guid,
              PermissionCode: element1.PermissionCode,
              Name: element1.Name,
              value: element1.KeyValue,
              label: this.firstLetterUperCaseWord(
                element1.KeyValue.replace(/_/g, ' ')
              ),
              ParentCode: element1.ParentCode,
              checked: this.permissionAssigned(element1.Guid),
              indeterminate: false,
              checkAll: false,
            },
          ];
        });
        this.listOfPermistion = [
          ...this.listOfPermistion,
          {
            Parent: this.parentPermission,
            Childs: this.childPermissions,
          },
        ];
        this.childPermissions = [];
        let index=0;

        this.listOfPermistion.forEach(element => {
          if (this.listOfPermistion[index].Childs.every((item) => !item.checked)) {
            this.listOfPermistion[index].Parent.checkAll = false;
            this.listOfPermistion[index].Parent.indeterminate = false;
          } else if (
            this.listOfPermistion[index].Childs.every((item) => item.checked)
          ) {
            this.listOfPermistion[index].Parent.checkAll = true;
            this.listOfPermistion[index].Parent.indeterminate = false;
          } else {
            this.listOfPermistion[index].Parent.indeterminate = true;
            this.listOfPermistion[index].Parent.checkAll = false;
          }

          index++;
        });
       this.checkWhileAllSelected();

      });

      this.listCheckBox?.push({
        label: this.permissionData[0].Childs[0].KeyValue,
        value: this.permissionData[0].Childs[0].KeyValue,
        checked: false,
        Guid: '',
      });
      this.notification.showNotification({
        type: 'success',
        content: 'Permissions loaded successfully',
        duration: 1,
      });
    });
    this.assinedPermission();
  }
  assinedPermission() {
    if(this.groupId!=null){
    this.listOfAssignedPermistion=[];
    this._permissionService
      .getPermissionCategoryById(this.groupId)
      .subscribe((reponse: any) => {
        this.permissionResponse = reponse;
        this.permissionData = this.permissionResponse?.Data;
        this.permissionData.forEach((element: any) => {
          this.parentPermission = {
            Guid: element.Parent.Guid,
            PermissionCode: element.Parent.PermissionCode,
            Name: element.Parent.Name,
            value: element.Parent.KeyValue,
            label: this.firstLetterUperCaseWord(
              element.Parent.KeyValue.replace(/_/g, ' ')
            ),
            ParentCode: element.Parent.ParentCode,
            checked: false,
            indeterminate: false,
            checkAll: false,
          };

          element.Childs.forEach((element1: any) => {
            this.childPermissions = [
              ...this.childPermissions,
              {
                Guid: element1.Guid,
                PermissionCode: element1.PermissionCode,
                Name: element1.Name,
                value: element1.KeyValue,
                label: this.firstLetterUperCaseWord(
                  element1.KeyValue.replace(/_/g, ' ')
                ),
                ParentCode: element1.ParentCode,
                checked: false,
                indeterminate: false,
                checkAll: false,
              },
            ];
          });
          this.listOfAssignedPermistion = [
            ...this.listOfAssignedPermistion,
            {
              Parent: this.parentPermission,
              Childs: this.childPermissions,
            },
          ];
          this.childPermissions = [];
        });
          this.listOfAssignedPermistion.forEach((element) => {
            let count=0;
            this.listOfPermistion.forEach((element2) => {
              if (element.Parent.Guid == element2.Parent.Guid) {
                element.Childs.forEach((element3) => {
                  let count2=0;
                  element2.Childs.forEach((element4) => {
                    if (element3.Guid == element4.Guid) {
                      element4.checked = true;
                      this.listOfPermistion[count].Childs[count2].checked=true;

                    }
                    count2++;
                  });
                });
              }
              count++;
            });
          });

      });
    }
  }

  log(event: any) {
    this.listCheckBox[0].checked = true;
  }
  updateAllPermissionChecked(event: any, i: number): void {
    this.indeterminate = false;
    if (event) {
      this.countSelectedModule++;
      this.listOfPermistion[i].Parent.indeterminate = false;

      this.listOfPermistion[i].Childs = this.listOfPermistion[i].Childs.map(
        (item) => ({
          ...item,
          checked: true,
        })
      );

      this.listOfPermistion[i].Childs.forEach((element) => {
        let count = 0;
        this.selectedPermissionList.forEach((element2) => {
          this.checkWhileAllSelected();
          if (element.Guid == element2.Guid) {
            this.selectedPermissionList.splice(count, 1);
          }
          count++;
        });

        this.selectedPermissionList = [
          ...this.selectedPermissionList,
          { Guid: element.Guid },
        ];
      });
    } else {
      this.countSelectedModule--;
      this.listOfPermistion[i].Childs = this.listOfPermistion[i].Childs.map(
        (item) => ({
          ...item,
          checked: false,
        })
      );
      this.listOfPermistion[i].Childs.forEach((child) => {
        let count = 0;
        this.checkWhileAllSelected();
        this.selectedPermissionList.forEach((element) => {
          if (element.Guid == child.Guid) {
            this.selectedPermissionList.splice(count, 1);
          }
          count++;
        });
      });
    }

    if(this.countSelectedModule==this.listOfPermistion.length){
      this.allModuleCecked=true;
      this.allModuleIntermidate=false
     }
     else  if(0<this.countSelectedModule && this.countSelectedModule<this.listOfPermistion.length){
      this.allModuleCecked=false;
      this.allModuleIntermidate=true
     }
     else{
      this.allModuleCecked=false;
      this.allModuleIntermidate=false
     }



  }

  checkAll(event:any){


for (let i = 0; i < this.listOfPermistion.length; i++) {

    this.indeterminate = false;
    if (event) {
      this.listOfPermistion[i].Parent.indeterminate = false;
      this.listOfPermistion[i].Parent.checkAll = true;
      const allchilds = this.listOfPermistion[i].Childs;
      this.listOfPermistion[i].Childs = this.listOfPermistion[i].Childs.map(
        (item) => ({
          ...item,
          checked: true,
        })
      );

      this.listOfPermistion[i].Childs.forEach((element) => {
        let count = 0;
        this.selectedPermissionList.forEach((element2) => {
          if (element.Guid == element2.Guid) {
            this.selectedPermissionList.splice(count, 1);
          }
          count++;
        });

        this.selectedPermissionList = [
          ...this.selectedPermissionList,
          { Guid: element.Guid },
        ];
      });
    } else {
      this.listOfPermistion[i].Parent.checkAll = false;

      this.listOfPermistion[i].Childs = this.listOfPermistion[i].Childs.map(
        (item) => ({
          ...item,
          checked: false,
        })
      );
      this.listOfPermistion[i].Childs.forEach((child) => {
        let count = 0;
        this.selectedPermissionList.forEach((element) => {
          if (element.Guid == child.Guid) {
            this.selectedPermissionList.splice(count, 1);
          }
          count++;
        });
      });

  }
  this.checkWhileAllSelected();
}



  }
  updateSingleChecked(event: any, index: number, guid: string): void {
    if (event) {
      let found=false;
      this.listOfPermistion[index].Childs.forEach(element => {
        if(guid==element.Guid&& element.Name=="Admin"){
          found=true;
          this.updateAllPermissionChecked(event,index)
        }
      });
     if(!found){
      this.selectedPermissionList = [
        ...this.selectedPermissionList,
        { Guid: guid },
      ];
     }
    } else {

      let count = 0;
      this.selectedPermissionList.forEach((element) => {
        if (element.Guid == guid) {
          this.selectedPermissionList.splice(count, 1);
        }
        count++;
      });
    }
    if (this.listOfPermistion[index].Childs.every((item) => !item.checked)) {
      this.listOfPermistion[index].Parent.checkAll = false;
      this.listOfPermistion[index].Parent.indeterminate = false;
    } else if (
      this.listOfPermistion[index].Childs.every((item) => item.checked)
    ) {
      this.listOfPermistion[index].Parent.checkAll = true;
      this.listOfPermistion[index].Parent.indeterminate = false;
    } else {
      this.listOfPermistion[index].Parent.indeterminate = true;
      this.listOfPermistion[index].Parent.checkAll = false;
    }
    this.checkWhileAllSelected();
  }
  firstLetterUperCaseWord(word: string) {
    let fullPhrase = '';
    const wordLists = word.split(' ');
    wordLists.forEach((element) => {
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
      fullPhrase = fullPhrase + ' ' + titleCase;
      } catch (error) {
        console.log();

      }
    });
    if(wordLists.length==0){
fullPhrase= word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
    return fullPhrase;
  }
  updatePermission() {
    this.isLoding=true;
    this.selectedPermissionList.forEach((element) => {
      this.permissionIdList = [...this.permissionIdList, element.Guid];
    });
    const postData = {
      GroupSetId: this.groupId,
      PermissionIDArray: this.permissionIdList,
    };
    this._permissionService
      .addGroupPermission(postData)
      .subscribe((data: any) => {
        this._notification.create(
          data.ResponseStatus.toLowerCase(),
          data.ResponseStatus,
          data.Message
        );
        this.isLoding=false;
        this._commonData.getPermission();
      });
  }

  permissionAssigned(id:string){
    let bool=false;
    this._permissionService.goupPermissions.forEach(element => {
      if(id==element.Guid){
       bool=true;
      }
    });
    return bool;
  }
  cancelPermission(){

    this.router.navigateByUrl("usermanagement/group-detail/"+this.groupId)
  }
  checkWhileAllSelected(){
   let interm=0;
   let check=0;
   this.allModuleIntermidate=true
      this.listOfPermistion.forEach(element => {
        if(element.Parent.indeterminate){
          interm++;

        }
        if(element.Parent.checkAll){
         check++;

        }

           if(check==this.listOfPermistion.length){
            this.allModuleCecked=true;
            this.allModuleIntermidate=false
           }
           else  if(interm>0){
            this.allModuleCecked=false;
            this.allModuleIntermidate=true
           }
           else{
            this.allModuleCecked=false;
            this.allModuleIntermidate=false
           }

      });
  }
}
