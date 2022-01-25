import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models/role';
import { ResponseDTO } from '../../../models/response-dto.model';
import { RoleService } from '../../../services/role.service';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {
  roleForm!: FormGroup;
  @Input() id!: string | null;
  @Output() update = new EventEmitter<string>();
  role!: Role;
  isEdit!: boolean;
  
  constructor(private fb: FormBuilder, private roleConfigService: RoleService,
        // private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private _permissionService:PermissionListService) { }

  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.createRoleForm();
    if (this.id !== null) {
      this.isEdit = true;
      this.roleConfigService.getRole(this.id).subscribe((response: ResponseDTO<Role>) => {
        console.log("the response is  = ", response);
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
        this.roleForm.reset();
        // this.toastr.success("Successfully Added", "Role")
      });
    } else {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // this.toastr.error("Error", "Form is not valid");
    }
  }

  updateForm() {
    if (this.roleForm.valid) {
      this.roleConfigService.updateRole(this.roleForm.value, this.id ?? "")
        .subscribe((response)=>{
          this.update.emit("update");
          // this.roleForm.reset();
          // this.toastr.success("Successfully Updated", "Role")
        });
    } else {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // this.toastr.error("Error", "Form is not valid");
    }
  }

  resetForm() {
    this.roleForm.reset();
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
