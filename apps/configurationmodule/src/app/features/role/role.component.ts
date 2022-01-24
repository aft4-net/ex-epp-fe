import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Pagination } from '../../models/pagination';
import { RoleService } from '../../services/role.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { CommonDataService } from 'libs/common-services/commonData.service';

@Component({
  selector: 'exec-epp-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  listOfRoles: Role[] = [];
  isAddModalVisible = false;
  isConfirmLoading = false;
  pageIndex = 1;
  searchValue!:string;
  sortBy!: string;
  sortOrder!: string;
  pagination!: Pagination;
  constructor(private roleConfigService: RoleService, 
   // private toastrService: ToastrService,
   public _commonData:CommonDataService,
    private _permissionService:PermissionListService,
    ) { }

  ngOnInit(): void {
    this.getRoles();
    this._commonData.getPermission();
  }

  getPaginatedRoles() {
    this.roleConfigService.getRoles(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      // this.listOfRoles=response.Data;
      this.listOfRoles = [];
      this.listOfRoles = [...response.Data];
      console.log("list of roles is : ", this.listOfRoles);
    });
  }

  getRoles() {
    this.pageIndex = 1;
    this.getPaginatedRoles();
  }

  showModal(): void {
    this.isAddModalVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isAddModalVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isAddModalVisible = false;
  }

  pageIndexChange(index: number) {
    this.pageIndex = index;
    this.getPaginatedRoles();
  }

  onSearchChange() {
    this.getPaginatedRoles();
  }

  deleteHandler(id: string) {
    this.roleConfigService.deleteRole(id).subscribe((response) => {
      //this.toastrService.success(response.message, "Role");
      this.listOfRoles = this.listOfRoles.filter((d) => d.Guid !== id);
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
