import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { Pagination } from '../../models/pagination';
import { DepartmentService } from '../../services/department.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exec-epp-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  listOfDepartments: Department[] = [];
  isAddModalVisible = false;
  isConfirmLoading = false;
  pageIndex = 1;
  searchValue!:string;
  sortBy!: string;
  sortOrder!: string;
  pagination!: Pagination;
  idForEdit: string | null = null;

  constructor(private departmentConfigService: DepartmentService, 
    private _permissionService:PermissionListService,
    private modal: NzModalService
    ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getPaginatedDepartments() {
    this.departmentConfigService.getDepartments(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      this.listOfDepartments = [];
      this.listOfDepartments = [...response.Data];
      console.log("list of departments is : ", this.listOfDepartments);
    });
  }

  getDepartments() {
    this.pageIndex = 1;
    this.getPaginatedDepartments();
  }

  update(value: string) {
    this.getPaginatedDepartments();
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
    this.getPaginatedDepartments();
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
    this.getPaginatedDepartments();
  }

  onSearchChange() {
    this.getPaginatedDepartments();
  }

  showDeleteConfirm(id: string, name: string) {
    this.departmentConfigService.checkifDepartmentisDeletable(id).subscribe((res)=>{
    
    if(res === true){
      this.modal.confirm({
        nzTitle: 'This Department can not be delete',
        nzContent: 'Name: <b style="color: red;">'+ name + '</b>',
        nzOkText: 'Ok',
        nzOkType: 'primary',
        nzOkDanger: true,
      //  nzOnOk: () => this.deleteHandler(id),
      //  nzCancelText: 'No'
      });
     
    }
    else{
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Department?',
      nzContent: 'Name: <b style="color: red;">'+ name + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteHandler(id),
      nzCancelText: 'No'
    });
  }
});
  }

  deleteHandler(id: string) {
    this.departmentConfigService.deleteDepartment(id).subscribe((response) => {
      this.getPaginatedDepartments();
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }
}
