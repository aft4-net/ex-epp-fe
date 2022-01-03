import { Component, OnInit } from '@angular/core';
import { AllPermitionData, IPermissionModel, IPermissionResponseModel } from '../../Models/User/Permission-get.model';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { PermissionService } from '../../services/permission/permission.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface  GroupCheckBoxItem {
   label:string;
   value:string;
   checked:boolean
   Guid:string
}
export interface SelecttedPermission{
  Guid:string
}

@Component({
  selector: 'exec-epp-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
permissionResponse?:IPermissionResponseModel;
permissionData?:any;
parentPermission:any;
onePermission:any;
allChecked = false;
indeterminate = true;
permissionIdList:string[]=[];
childPermissions:IPermissionModel[]=[];
listOfPermistion:AllPermitionData[]=[]
listCheckBox:GroupCheckBoxItem []=[];

selectedPermissionList:SelecttedPermission[]=[];
groupId:any;
  constructor(private _notification: NzNotificationService,private route: ActivatedRoute,private _permissionService:PermissionService,private notification: NotificationBar) {
    
   }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
this._permissionService.getPermission().subscribe((reponse:any)=>{
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
    this.listOfPermistion=[...this.listOfPermistion,{
      Parent:this.parentPermission,
      Childs:this.childPermissions
    }];
    this.childPermissions=[];
  });
    this.listCheckBox?.push( {
      label:this.permissionData[0].Childs[0].KeyValue,
      value:this.permissionData[0].Childs[0].KeyValue,
      checked:false,
    Guid:''
    });
  this.notification.showNotification({
    type: 'success',
    content: 'Permissions loaded successfully',
    duration: 1,
  });
});
  }

  log(event:any){
    this.listCheckBox[0].checked=true;
  }
  updateAllPermissionChecked(event:any,i:number): void {
    this.indeterminate = false;
    if (event) {
      this.listOfPermistion[i].Parent.indeterminate=false;
      const allchilds=this.listOfPermistion[i].Childs;
      this.listOfPermistion[i].Childs =  this.listOfPermistion[i].Childs.map(item => ({
        ...item,
        checked: true
      }));
      
      this.listOfPermistion[i].Childs.forEach(element => {
        let count=0;
        this.selectedPermissionList.forEach(element2 => {
   
          if(element.Guid==element2.Guid){
            this.selectedPermissionList.splice(count,1);
          }
          count++;
        });

        this.selectedPermissionList=[...this.selectedPermissionList,{Guid:element.Guid}]
      });
    } else {
      this.listOfPermistion[i].Childs =  this.listOfPermistion[i].Childs.map(item => ({
        ...item,
        checked: false
      }));
      this.listOfPermistion[i].Childs.forEach(child => {
        let count=0;
      this.selectedPermissionList.forEach(element => {
   
        if(element.Guid==child.Guid){
          this.selectedPermissionList.splice(count,1);
        }
        count++;
      });
    });
    }
  }
 

  updateSingleChecked(event:any,index : number,guid:string): void {
  
    if(event){
    this.selectedPermissionList=[...this.selectedPermissionList,{Guid:guid}]
    }
 else{
   let count=0;
  this.selectedPermissionList.forEach(element => {
   
    if(element.Guid==guid){
      this.selectedPermissionList.splice(count,1);
    }
    count++;
  });
 }
    if ( this.listOfPermistion[index].Childs.every(item => !item.checked)) {
      this.listOfPermistion[index].Parent.checkAll= false;
      this.listOfPermistion[index].Parent.indeterminate = false;
    } else if ( this.listOfPermistion[index].Childs.every(item => item.checked)) {
      this.listOfPermistion[index].Parent.checkAll= true;
      this.listOfPermistion[index].Parent.indeterminate = false;
    } else {
      this.listOfPermistion[index].Parent.indeterminate = true;
      this.listOfPermistion[index].Parent.checkAll= false;
    }
   
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
  updatePermission(){
    this.selectedPermissionList.forEach(element => {
  this.permissionIdList=[...this.permissionIdList,element.Guid]
});
     const postData={
      GroupSetId: this.groupId,
      PermissionIDArray: this.permissionIdList
    }
    this._permissionService.addGroupPermission(postData).subscribe((data:any)=>{
     this._notification.create(
      data.ResponseStatus.toLowerCase(),
      data.ResponseStatus,
      data.Message
    );
    })

  }
}
