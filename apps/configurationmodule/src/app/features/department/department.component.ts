import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
   // private toastrService: ToastrService,
    private _permissionService:PermissionListService,
    private modal: NzModalService
    ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getPaginatedDepartments() {
    this.departmentConfigService.getDepartments(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      // this.listOfDepartments=response.Data;
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
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Department?',
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
    this.departmentConfigService.deleteDepartment(id).subscribe((response) => {
      //this.toastrService.success(response.message, "Department");
      // this.listOfDepartments = this.listOfDepartments.filter((d) => d.Guid !== id);
      this.getPaginatedDepartments();
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }
}
