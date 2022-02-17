import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role, RolePostModel } from '../../../models/role';
import { ResponseDTO } from '../../../models/response-dto.model';
import { RoleService } from '../../../services/role.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {
  roleForm!: FormGroup;
  @Input() id!: string | null;
  @Output() update = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<string>();
  role!: RolePostModel;
  isEdit!: boolean;
  departments: Department[] = [];
  
  constructor(private fb: FormBuilder, private roleConfigService: RoleService,
        private departmentService: DepartmentService,
        private notification: NzNotificationService,
        private activatedRoute: ActivatedRoute,
        private _permissionService:PermissionListService) { }

  ngOnInit(): void {
    this.getAllDepartments();
    this.createRoleForm();
    if (this.id !== null) {
      this.isEdit = true;
      this.roleConfigService.getRole(this.id).subscribe((response: ResponseDTO<RolePostModel>) => {
        this.role = response.Data;
        this.roleForm.patchValue(this.role);
      });
    } else {
      this.isEdit = false;
    }
  }

  createRoleForm() {
    this.roleForm = this.fb.group({
      Name: [null, Validators.required],
      DepartmentGuid: [null, Validators.required]
    })
  }

  submitForm() {
    if (this.isEdit) {
      this.updateForm();
    } else {
      this.saveForm();
    }
  }

  saveForm() {
    if (this.roleForm.valid) {
      this.roleConfigService.addRole(this.roleForm.value).subscribe((response)=>{
        this.update.emit("save");
        this.closeModal.emit("close");
        this.roleForm.reset();
        this.notification.create(
          'success',
          'Successfully Added!',
          'Job Title'
        );
      }, (error) => {
        this.notification.create(
          'error',
          'Error!',
          error
        );
        console.log(error);
      });
    } else {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateForm() {
    if (this.roleForm.valid) {
      this.roleConfigService.updateRole(this.roleForm.value, this.id ?? "")
        .subscribe((response)=>{
          this.update.emit("update");
          this.closeModal.emit("close");
          this.notification.create(
            'success',
            'Successfully Updated!',
            'Job Title'
          );
        });
    } else {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetForm() {
    this.roleForm.reset();
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((response) => {
      this.departments = response.Data;
    })
  }

}
