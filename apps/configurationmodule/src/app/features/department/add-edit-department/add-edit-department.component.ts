import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PermissionListService } from '../../../../../../../libs/common-services/permission.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../../models/department';
import { ResponseDTO } from '../../../models/response-dto.model';
import { DepartmentService } from '../../../services/department.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.scss']
})
export class AddEditDepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  @Input() id!: string | null;
  @Output() update = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<string>();
  department!: Department;
  isEdit!: boolean;
  
  constructor(private fb: FormBuilder, private departmentConfigService: DepartmentService,
        private notification: NzNotificationService,
        private activatedRoute: ActivatedRoute,
        private _permissionService:PermissionListService) { }

  ngOnInit(): void {
    this.createDepartmentForm();
    if (this.id !== null) {
      this.isEdit = true;
      this.departmentConfigService.getDepartment(this.id).subscribe((response: ResponseDTO<Department>) => {
        this.department = response.Data;
        this.departmentForm.patchValue(this.department);
      });
    } else {
      this.isEdit = false;
    }
  }

  createDepartmentForm() {
    this.departmentForm = this.fb.group({
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
    if (this.departmentForm.valid) {
      this.closeModal.emit("close");
      this.departmentConfigService.addDepartment(this.departmentForm.value).subscribe((response)=>{
        this.update.emit("save");
        // this.closeModal.emit("close");
        this.departmentForm.reset();
        this.notification.create(
          'success',
          'Successfully Added!',
          'Department'
        );
      }, (error) => {
        this.notification.create(
          'error',
          'Error!',
          error.message
        );
        console.log(error);
      });
    } else {
      Object.values(this.departmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateForm() {
    if (this.departmentForm.valid) {
      this.closeModal.emit("close");
      this.departmentConfigService.updateDepartment(this.departmentForm.value, this.id ?? "")
        .subscribe((response)=>{
          this.update.emit("update");
          // this.closeModal.emit("close");
          this.notification.create(
            'success',
            'Successfully Updated!',
            'Department'
          );
        });
    } else {
      Object.values(this.departmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetForm() {
    this.departmentForm.reset();
  }
  authorize(key:string){
    return this._permissionService.authorizedPerson(key);
  }

}
