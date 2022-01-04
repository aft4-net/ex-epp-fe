import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AllPermitionData, IPermissionModel, IPermissionResponseModel } from '../../Models/User/Permission-get.model';
import { PermissionService } from '../../services/permission/permission.service';

@Component({
  selector: 'exec-epp-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
 groupId:any;
 listOfAssignedPermistion:AllPermitionData[]=[]
 permissionResponse?:IPermissionResponseModel;
 permissionData?:any;
 childPermissions:IPermissionModel[]=[];
 parentPermission:any;
  constructor(private _permissionService:PermissionService, private userService : UserService,private _router: Router,private route: ActivatedRoute,private fb: FormBuilder) {
  }
  size: NzButtonSize = 'small';
  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.assinedPermission();
    this._permissionService.getGroupPermissionById(this.groupId);
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
}
