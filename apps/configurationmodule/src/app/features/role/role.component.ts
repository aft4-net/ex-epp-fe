import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Pagination } from '../../models/pagination';
import { RoleService } from '../../services/role.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { CommonDataService } from '../../../../../../libs/common-services/commonData.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  idForEdit: string | null = null;

  constructor(private roleConfigService: RoleService, 
   // private toastrService: ToastrService,
   public _commonData:CommonDataService,
    private _permissionService:PermissionListService,
    private modal: NzModalService
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

  update(value: string) {
    this.getPaginatedRoles();
  }

  showAddModal(): void {
    this.isAddModalVisible = true;
  }

  showEditModal(Guid: string): void {
    this.idForEdit = Guid;
    this.isAddModalVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isAddModalVisible = false;
      this.idForEdit = null;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isAddModalVisible = false;
    this.idForEdit = null;
  }

  pageIndexChange(index: number) {
    this.pageIndex = index;
    this.getPaginatedRoles();
  }

  nameSortOrderChange(event: any) {
    this.sortBy = "Name";
    if (event === 'ascend')
      this.sortOrder = "Ascending";
    else if (event === 'descend')
      this.sortOrder = "Descending";
    else {
      this.sortOrder = "";
      this.sortBy = "";
    }
    this.getPaginatedRoles();
  }

  onSearchChange() {
    this.getPaginatedRoles();
  }

  showDeleteConfirm(id: string, name: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Role?',
      nzContent: 'Name: <b style="color: red;">'+ name + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteHandler(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteHandler(id: string) {
    this.roleConfigService.deleteRole(id).subscribe((response) => {
      //this.toastrService.success(response.message, "Role");
      // this.listOfRoles = this.listOfRoles.filter((d) => d.Guid !== id);
      this.getPaginatedRoles();
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }
}
