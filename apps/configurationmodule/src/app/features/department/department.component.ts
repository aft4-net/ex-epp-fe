import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { Pagination } from '../../models/pagination';
import { DepartmentService } from '../../services/department.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  searchInput!: string;
  searchValue!:string;
  sortBy!: string;
  sortOrder!: string;
  pagination!: Pagination;
  idForEdit: string | null = null;
  searchTerm$ = new Subject<string>();

  constructor(private departmentConfigService: DepartmentService,private router: Router,
    private notification:NzNotificationService,
   // private toastrService: ToastrService,
    private _permissionService:PermissionListService,
    private modal: NzModalService
    ) {
      this.search(this.searchTerm$).subscribe(results => {
      });
    }

  ngOnInit(): void {
    this.defaultRoute();
    this.getDepartments();
  }

  getPaginatedDepartments() {
    this.departmentConfigService.getDepartments(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      this.listOfDepartments = [];
      this.listOfDepartments = [...response.Data];
    });
  }

  getDepartments() {
    this.pageIndex = 1;
    this.getPaginatedDepartments();
  }

  update(value: string) {
    this.getPaginatedDepartments();
  }

  closeModal(value: string) {
    this.isAddModalVisible = false;
    this.idForEdit = null;
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

  onSearchChange(event: any) {
    // if (this.searchInput.length > 1) {
    //   this.searchValue = this.searchInput;
    //   this.getPaginatedDepartments();
    // } else if (this.searchInput.length == 0){
    //   this.searchValue = '';
    //   this.getPaginatedDepartments();
    // }
    this.searchTerm$.next(event.target.value);
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(async (term) => this.searchEntries(term))
    );
  }

  searchEntries(term: any) {
    this.searchValue = term;
    this.getPaginatedDepartments();
  }

  showDeleteConfirm(id: string, name: string) {
    this.departmentConfigService.checkifDepartmentisDeletable(id).subscribe((res)=>{

    if(res === true){
      this.modal.confirm({
        nzTitle: 'This Department can not be deleted b/c it is assigned to employee and/or job title',
        nzContent: 'Name: <b style="color: red;">'+ name + '</b>',
        nzOkText: 'Ok',
        nzOkType: 'primary',
        nzOkDanger: false,
      //  nzOnOk: () => this.deleteHandler(id),
      //  nzCancelText: 'No'
      });

    }
    else{
    this.modal.confirm({
      nzTitle: 'Delete department ?',
      nzContent: 'Are you sure you want to delete this department?<br>this action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.deleteHandler(id),
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel')
    });
  }
});
  }

  deleteHandler(id: string) {
    this.departmentConfigService.deleteDepartment(id).subscribe((response) => {
       this.notification.create(
        'success',
        'Successfully Deleted!',
        'Department',
        { nzPlacement: 'bottomRight' }
      );
      //this.toastrService.success(response.message, "Department");
      // this.listOfDepartments = this.listOfDepartments.filter((d) => d.Guid !== id);
      this.getPaginatedDepartments();
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

  defaultRoute() {
    if (this.authorizeL(['Create_Department', 'View_Department', 'Update_Department', 'Delete_Department'])) {
      // default route
    } else if (this.authorizeL(['Create_Job_Title', 'View_Job_Title', 'Update_Job_Title', 'Delete_Job_Title'])) {
      console.log("job title default route is called");
      this.router.navigateByUrl('configurationmodule/job-title');
    } else if (this.authorizeL(['Create_Country', 'Delete_Country', 'Update_Country', 'View_Country'])) {
      this.router.navigateByUrl('configurationmodule/country');
    } else if (this.authorizeL(['Create_DutyStation', 'Update_DutyStation', 'Delete_DutyStation', 'View_DutyStation'])) {
      this.router.navigateByUrl('configurationmodule/duty-station');
    } else if (this.authorizeL(['View_Timesheet_Configuration', 'Update_Timesheet_Configuration'])) {
      this.router.navigateByUrl('configurationmodule/timesheet');
    } else {
      // this.router.navigateByUrl('/');
    }
  }
  authorizeL(keys: string[]) {
    for(const key of keys) {
      if(this._permissionService.authorizedPerson(key)){
        return true;
      }
    }

    return false;
  }
}
