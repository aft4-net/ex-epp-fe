import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../models/department';
import { Pagination } from '../../models/pagination';
import { DepartmentService } from '../../services/department.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-device-detail',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  listOfDepartments: Department[] = [];
  pagination!: Pagination;
  constructor(private departmentService: DepartmentService, private toastrService: ToastrService,private _permissionService:PermissionListService,
    ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments(1).subscribe((response)=>{
      this.pagination = response;
      this.listOfDepartments=response.Data;
    });
  }

  pageIndexChange(index: number) {
    this.departmentService.getDepartments(index).subscribe((response)=>{
      this.pagination = response;
      this.listOfDepartments=response.Data;
    });
  }

  deleteHandler(id: string) {
    this.departmentService.deleteDepartment(id).subscribe((response) => {
      this.toastrService.success(response.message, "Department");
      this.listOfDepartments = this.listOfDepartments.filter((d) => d.Guid !== id);
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
