import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { Pagination } from '../../models/pagination';
import { RoleService } from '../../services/role.service';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';
import { CommonDataService } from '../../../../../../libs/common-services/commonData.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  searchInput!: string;
  searchValue!:string;
  sortBy!: string;
  sortOrder!: string;
  pagination!: Pagination;
  idForEdit: string | null = null;
  searchTerm$ = new Subject<string>();

  constructor(private roleConfigService: RoleService, 
    private notification:NzNotificationService,
   // private toastrService: ToastrService,
   public _commonData:CommonDataService,
    private _permissionService:PermissionListService,
    private modal: NzModalService
    ) {
      this.search(this.searchTerm$).subscribe(results => {
      });
    }

  ngOnInit(): void {
    this.getRoles();
    this._commonData.getPermission();
  }

  getPaginatedRoles() {
    this.roleConfigService.getRoles(this.pageIndex, this.searchValue, this.sortBy, this.sortOrder).subscribe((response)=>{
      this.pagination = response;
      this.listOfRoles = [];
      this.listOfRoles = [...response.Data];
    });
  }

  getRoles() {
    this.pageIndex = 1;
    this.getPaginatedRoles();
  }

  update(value: string) {
    this.getPaginatedRoles();
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

  onSearchChange(event: any) {
    // if (this.searchInput.length > 1) {
    //   this.searchValue = this.searchInput;
    //   this.getPaginatedRoles();
    // } else if (this.searchInput.length == 0){
    //   this.searchValue = '';
    //   this.getPaginatedRoles();
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
    this.getPaginatedRoles();
  }

  showDeleteConfirm(id: string, name: string) {
    this.roleConfigService.checkifRoleisDeletable(id).subscribe((res)=>{
    
      if(res === true){

        this.modal.confirm({
          nzTitle: 'This Role can not be delete b/c it is assigned to employee',
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
      nzTitle: 'Delete job title ?',
      nzContent: 'Are you sure you want to delete this job title?<br>this action cannot be undone.',
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
    this.roleConfigService.deleteRole(id).subscribe((response) => {
      this.notification.create(
        'success',
        'Successfully Deleted!',
        'Job Title'
      );
      //this.toastrService.success(response.message, "Role");
      // this.listOfRoles = this.listOfRoles.filter((d) => d.Guid !== id);
      this.getPaginatedRoles();
    })
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }
}
