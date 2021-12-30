import { Component, OnInit } from '@angular/core';
import { IPermissionModel, IPermissionResponseModel } from '../../Models/User/Permission-get.model';
import { PermissionService } from '../../services/permission/permission.service';

@Component({
  selector: 'exec-epp-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
permissionResponse?:IPermissionResponseModel;
permissionData?:IPermissionModel[];
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
    disabled: true,
    name: 'This is panel header 3'
  }
];
  constructor(private _permissionService:PermissionService) { }

  ngOnInit(): void {
this._permissionService.getPermission().subscribe((reponse:any)=>{
  this.permissionResponse=reponse;
  this.permissionData=this.permissionResponse?.Data;
  console.log(this.permissionData);
})
  }

}
