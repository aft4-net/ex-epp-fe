import { Component, OnInit } from '@angular/core';
import { AllPermitionData, IPermissionModel, IPermissionResponseModel } from '../../Models/User/Permission-get.model';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { PermissionService } from '../../services/permission/permission.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export interface  GroupCheckBoxItem {
   label:string;
   value:string;
   checked:boolean
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
checkOptionsOne = [
  { label: 'Apple', value: 'Apple', checked: true },
  { label: 'Pear', value: 'Pear', checked: false },
  { label: 'Orange', value: 'Orange', checked: false }
];
childPermissions:IPermissionModel[]=[];
listOfPermistion:AllPermitionData[]=[]
listCheckBox:GroupCheckBoxItem []=[];
checkOptionsTwo = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear', checked: true },
  { label: 'Orange', value: 'Orange' }
];
panels = [
  {
    active: true,
    name: 'This is panel header 1',
    disabled: false
  },
  {
    active: false,
    disabled: false,
    name: 'This is panel header 2'
  },
  {
    active: false,
    disabled: false,
    name: 'This is panel header 3'
  }
];
groupId:any;
  constructor(private route: ActivatedRoute,private _permissionService:PermissionService,private notification: NotificationBar) {
    
   }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
this._permissionService.getPermission().subscribe((reponse:any)=>{
  this.permissionResponse=reponse;
  this.permissionData=this.permissionResponse?.Data;
  console.log(this.permissionData)
  this.permissionData.forEach((element:any) => {
    this.parentPermission={
       Guid:element.Parent.Guid,
       PermissionCode :element.Parent.PermissionCode,
       Name :element.Parent.Name,
       value :element.Parent.KeyValue,
       label:element.Parent.KeyValue,
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
        label:element1.KeyValue,
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
  console.log('this.permissionData');
  console.log(this.listOfPermistion);
  console.log('this.permissionData');
  console.log(this.permissionData);
    this.listCheckBox?.push( {
      label:this.permissionData[0].Childs[0].KeyValue,
      value:this.permissionData[0].Childs[0].KeyValue,
      checked:false,
    Guid:''
    });
    console.log(this.listCheckBox);
   
  this.notification.showNotification({
    type: 'success',
    content: 'Permissions loaded successfully',
    duration: 1,
  });
})
  }
  parentSelected(code:string){
    alert(code)
  }
  groupCheck(event:any){
alert("event");
console.log(event);
  }
  log(event:any){

    console.log('new log');
    console.log(event)
    this.listCheckBox[0].checked=true;
  }
  updateAllPermissionChecked(event:any,i:number): void {
    console.log(event)
    this.indeterminate = false;
    if (event) {
      this.listOfPermistion[i].Parent.indeterminate=false;
      this.listOfPermistion[i].Childs =  this.listOfPermistion[i].Childs.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.listOfPermistion[i].Childs =  this.listOfPermistion[i].Childs.map(item => ({
        ...item,
        checked: false
      }));
    }
  }
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(event:any,index : number): void {
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
    //alert(index);
  }

}
