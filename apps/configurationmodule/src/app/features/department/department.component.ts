import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../models/department';
import { Pagination } from '../../models/pagination';
import { DepartmentService } from '../../services/department.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';

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
  constructor(private departmentConfigService: DepartmentService, 
   // private toastrService: ToastrService,
    private _permissionService:PermissionListService,
    ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getPaginatedDepartments() {
    this.departmentConfigService.getDepartments(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      this.listOfDepartments=response.Data;
    });
  }

  getDepartments() {
    this.pageIndex = 1;
    this.getPaginatedDepartments();
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
    this.getPaginatedDepartments();
  }

  onSearchChange() {
    this.getPaginatedDepartments();
  }

  deleteHandler(id: string) {
    this.departmentConfigService.deleteDepartment(id).subscribe((response) => {
      //this.toastrService.success(response.message, "Department");
      this.listOfDepartments = this.listOfDepartments.filter((d) => d.Guid !== id);
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
