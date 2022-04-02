import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import {AddProjectStateService, EmployeeService,projectResourceType,Employee,AssignResource,
  AssignResourceService,ProjectResourceStateService,Project,ProjectCreate,} from '../../../../core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionListService } from '../../../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss'],
})
export class AddresourceComponent implements OnInit {
  addResorceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permissionList: PermissionListService,
    private notification: NzNotificationService,
    private projectResourceStateService: ProjectResourceStateService,
    private assignResourceService: AssignResourceService,
    private router: Router,
    private projectCreateState: AddProjectStateService,
    private employeeService: EmployeeService
  ) {}
 
  loading = true;
  resources: projectResourceType[] = [] as projectResourceType[];
  employees: Employee[] = [];
  asignedResourseToEdit!: AssignResource;
  removeResourceModel = false;
  projectResources: AssignResource[] = [];
  isModalVisible = false;
  isEditMode = false;
  assignedDateError = false;
  disableUpdateButton = true;
  cancelModal = false;
  isOnEditstate = false;
  resourceEdit: AssignResource = {} as AssignResource;
  resoureRemove!: AssignResource;
  projectForResource: Project = {} as Project;
  projectCreate:ProjectCreate={} as ProjectCreate;

  isProjectExternal=false;
  ngOnInit(): void {
    this.projectResourceStateService.isOnEditstate$.subscribe((res) => {
      this.isOnEditstate = res;
    });

    if (!this.isOnEditstate) 
  {this.loading=false;
    this.projectCreateState.state$.subscribe(res=>{
      this.projectCreate=res;
      if(this.projectCreate?.ProjectType==='External')
      this.isProjectExternal=true;
      else
      this.isProjectExternal=false;
    })
  }
  this.getResources();
  this.createForm();
  this.valueChangeFormValidation()
   }

  createForm()
  {
    this.addResorceForm = this.fb.group({
      resource: [null, Validators.required],
      billable:[false],
      assignDate: [null, Validators.required],
    });
}

  getResources()
  {
    this.projectForResource = this.projectResourceStateService.project;  
    if(this.projectForResource?.ProjectType==='External')
    this.isProjectExternal=true;
      
    if(this.authorize('Assign_Resource'))
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees =  response.filter(p=>p.IsActive && !p.IsDeleted);
      if (this.projectResourceStateService.isOnEditstate) {
        this.projectResourceStateService.projectResourceList$.subscribe(
          (res) => {
            this.projectResources= res;
            if ( this.projectResources)
              this.projectResources.forEach((p) => {
                this.employees = this.employees.filter(
                  (x) => x.Guid != p.EmployeeGuid
                );
              });
          }
        );
        this.sortEmployees();
        this.loading=false;
      }
    });
    else
    this.loading=false;
  }

  valueChangeFormValidation()
  {
    this.addResorceForm.valueChanges.subscribe(() => {
      if (this.addResorceForm.valid) {
        const projectAssignDate = formatDate(
          this.addResorceForm.controls.assignDate.value,
          'yyyy-MM-dd',
          'en_US'
        );
        const hiredDate = formatDate(
          this.addResorceForm.controls.resource.value.HiredDate,
          'yyyy-MM-dd',
          'en_US'
        );

        if (projectAssignDate < hiredDate)
          this.addResorceForm.controls.assignDate.setErrors({
            invalidDate: true,
          });
        else this.addResorceForm.controls.assignDate.setErrors(null);
      }

            if (this. addResorceForm &&this.isOnEditstate &&
          (new Date(this. addResorceForm.controls.assignDate.value).getTime() !=
            new Date(this.resourceEdit.AssignDate).getTime() ||
            this. addResorceForm.controls.resource.value.Guid !=
              this.resourceEdit.EmployeeGuid ||   
                this. addResorceForm.controls.billable.value !=  this.resourceEdit.Billable)
        )
          this.disableUpdateButton = false;
        else this.disableUpdateButton = true;
    });
  }
  get assignDateControl() {
    return this.addResorceForm.controls.assignDate as FormControl;
  }

  get assignDateEditControl() {
    return this. addResorceForm.controls.assignDate as FormControl;
  }

  addButtonClicked() {
    if (this.addResorceForm.valid) {
      this.isModalVisible = false;
      if (this.isOnEditstate) 
       this.editStateAddResource()
    else {
      this.createStateaddResource();
        this.projectCreateState.updateAssignResource(this.resources);
        this.sortEmployees();
        this.employees = this.employees.filter(
          (s) => s.Guid !== this.addResorceForm.controls.resource.value.Guid
        );
      }
      this.addResorceForm.reset();
    } else {
      Object.values(this.addResorceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  editStateAddResource()
  {
    this.assignResourceService
    .addResource({
      EmployeeGuid: this.addResorceForm.controls.resource.value.Guid,
      ProjectGuid: this.projectResourceStateService.project.Guid,
      AssignDate: this.addResorceForm.controls.assignDate.value,
     Billable: this.addResorceForm.controls.billable.value,
    })
    .subscribe(
      (res) => {
        this.projectResourceStateService.updateAssignResources();
        this.notification.success('Resource assigned successfully', '');
      },
      (error) => {
        this.notification.error("Project's resource add fail", '');
      }
    );
  }

  createStateaddResource()
  {
    this.resources.push({
      EmployeeGuid: this.addResorceForm.controls.resource.value.Guid,
      AssignDate: this.addResorceForm.controls.assignDate.value,
      Billable: this.addResorceForm.controls.billable.value,
    });

    this.projectResources = [
      {
        Empolyee: this.addResorceForm.controls.resource.value,
        AssignDate: this.addResorceForm.controls.assignDate.value,
       Billable: this.addResorceForm.controls.billable.value,
      },
      ...this.projectResources,
    ];
    this.projectResourceStateService.updateProjecResourcetList(this.projectResources);
  }
  showModal(): void {
    this.isModalVisible = true;
    if(!this.isEditMode)
    this.addResorceForm.controls.billable.setValue(false);
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this. addResorceForm.reset();
    this.isEditMode = false;
  }

  resetForm() {
    this.addResorceForm.reset()
    this.addResorceForm.controls.resource.setValue(null);
    this.addResorceForm.controls.assignDate.setValue(null);
    this.addResorceForm.controls.billable.setValue(false);
  }


  editResource($event:any) {
  
    const projectResource = this.projectResources.find(
      (s) => s.Empolyee.Guid == $event
    );

    if (projectResource) {
     
      this.resourceEdit = projectResource;
      this. addResorceForm.controls.resource.setValue(projectResource.Empolyee);
  
      this. addResorceForm.controls.assignDate.setValue(
        projectResource.AssignDate
      );
      this. addResorceForm.controls.billable.setValue(
        projectResource.Billable
      );

      this.asignedResourseToEdit = projectResource;
      this.isEditMode = true;
      this.isModalVisible = true;
  
    }
  }

  submitEditdValue() {
    if (this. addResorceForm.valid) {
      this.isEditMode = false;
      if (this.isOnEditstate)
       this.editResourceonEditState();
      else
        this.editResourceOnCreateState();
    
      if (this.asignedResourseToEdit.Empolyee.Guid !=
        this. addResorceForm.controls.resource.value.Guid) {
        this.employees.push(this.asignedResourseToEdit.Empolyee);
        this.employees = this.employees.filter(
          (s) =>
            s.Guid !== this. addResorceForm.controls.resource.value.EmployeeGUid
        );
        this.sortEmployees();
      }

      this.asignedResourseToEdit.AssignDate =this. addResorceForm.controls.assignDate.value;
      this.asignedResourseToEdit.Empolyee =this. addResorceForm.controls.resource.value;
        this.asignedResourseToEdit.Billable=this. addResorceForm.controls.billable.value;

      this.projectResources.map((s) =>
        s.Empolyee.Guid === this.asignedResourseToEdit.Empolyee.Guid
          ? s
          : this.asignedResourseToEdit
      );
      this.projectResourceStateService.updateProjecResourcetList(this.projectResources);
      this.resources.map((s) =>
        s.EmployeeGuid == this.asignedResourseToEdit.Empolyee.Guid
          ? s
          : {
              employeeId: this. addResorceForm.controls.resource.value.Guid,
              assignedDate: this. addResorceForm.controls.assignDate.value,
              billable: this. addResorceForm.controls.billable.value,
            }
      );

      this.isModalVisible = false;
      this.  resetForm();
      this.asignedResourseToEdit = {} as AssignResource;
    } else {
      Object.values(this. addResorceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


editResourceonEditState()
{
  this.assignResourceService
  .updateAssignResource({
    Guid: this.asignedResourseToEdit.Guid,
    EmployeeGuid: this. addResorceForm.controls.resource.value.Guid,
    ProjectGuid: this.projectResourceStateService.project.Guid,
    AssignDate: this. addResorceForm.controls.assignDate.value,
    Billable: this. addResorceForm.controls.billable.value,
  })
  .subscribe(
    (res) => {
      this.projectResourceStateService.updateAssignResources();

      this.notification.success('Resource updated successfully', '');
     
    },
    (error) => {
      this.notification.error('Resource updated failed', '');
    }
  );
}

editResourceOnCreateState()
{
  for (let i = 0; i < this.resources.length; i++) {
    if (
      this.resources[i].EmployeeGuid ==
      this.asignedResourseToEdit.Empolyee.Guid
    ) {
      this.resources[i] = {
        EmployeeGuid: this. addResorceForm.controls.resource.value.Guid,
        AssignDate: this. addResorceForm.controls.assignDate.value,
        Billable: this. addResorceForm.controls.billable.value,
      };

      this.projectCreateState.updateAssignResource(this.resources);

      break;
    }
  }
}

  conformationDelete($event: any) {
    this.resoureRemove = $event;
    this.removeResourceModel = true;
  }
  deleteCancel() {
    this.removeResourceModel = false;
    this.resoureRemove = {} as AssignResource;
  }

  removeResource() {
    this.removeResourceModel = false;

    this.assignResourceService.delete(this.resoureRemove.Guid ?? '').subscribe(
      (res) => {
        this.removeResourceFromtable(this.resoureRemove.Empolyee.Guid);
        this.notification.success('Resource unassigned successfully', '');
     
        this.projectResources=this.projectResources.filter(r=>r.Empolyee.Guid!=this.resoureRemove.Guid);
       this.projectResourceStateService.updateProjecResourcetList(this.projectResources);
        this.resoureRemove = {} as AssignResource;
      },
      (error) => {
        this.notification.error("Project's resource remove fail", '');
        this.resoureRemove = {} as AssignResource;
      }
    );
  }

  removeForAddReource(resource: AssignResource) {
    this.resources=this.resources.filter(r=>r.EmployeeGuid!=resource.Empolyee.Guid);
    this.projectCreateState.updateAssignResource(this.resources);
    this.removeResourceFromtable(resource.Empolyee.Guid);
  }

  removeResourceFromtable(id: string) {
    const projectResourece = this.projectResources.find(
      (s) => s.Empolyee.Guid == id
    );
    if (projectResourece) this.employees.push(projectResourece.Empolyee);
    this.sortEmployees();
    this.projectResources = this.projectResources.filter(
      (s) => s.Empolyee.Guid !== id
    );
    this.projectResourceStateService.updateProjecResourcetList(this.projectResources);
    this.resources = this.resources.filter((s) => s.EmployeeGuid != id);
  }

  sortEmployees() {
    if (this.employees.length != 0)
      this.employees.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  onReset() {
    this.router.navigateByUrl('projectmanagement');
  }

  disabledEndDate = (startValue: Date): boolean => {
    if (!this.isOnEditstate) {
      if (
        !this.projectCreateState.projectData.StartDate ||
        !startValue ||
        formatDate( this.projectCreateState.projectData.StartDate,'yyyy-MM-dd','en_US') === 
          formatDate(  startValue,'yyyy-MM-dd','en_US') 
      ) {
        return false;
      }

      if (
        this.projectCreateState.projectData.EndDate != null &&
        typeof this.projectCreateState.projectData.EndDate != 'undefined' &&
        this.projectCreateState.projectData.EndDate!=""
      )
        return (
          formatDate(  startValue,'yyyy-MM-dd','en_US')  <
         formatDate( this.projectCreateState.projectData.StartDate,'yyyy-MM-dd','en_US')
             ||
            formatDate(  startValue,'yyyy-MM-dd','en_US') >
            formatDate( this.projectCreateState.projectData.EndDate,'yyyy-MM-dd','en_US')    
         )
      else
        return (
          formatDate(  startValue,'yyyy-MM-dd','en_US')  <
          formatDate( this.projectCreateState.projectData.StartDate,'yyyy-MM-dd','en_US') );
        
    } else if (this.isOnEditstate) {
      if (
        !startValue ||
        !this.projectForResource.StartDate ||
        formatDate(  this.projectForResource.StartDate,'yyyy-MM-dd','en_US')
        ==  formatDate(  startValue,'yyyy-MM-dd','en_US')
      ) {
        return false;
      }
      if (
        this.projectForResource.EndDate != null &&
        typeof this.projectForResource.EndDate != 'undefined'
      )
        return (
          formatDate(  startValue,'yyyy-MM-dd','en_US') <
          formatDate( this.projectForResource.StartDate,'yyyy-MM-dd','en_US') ||
          formatDate(  startValue,'yyyy-MM-dd','en_US') >
          formatDate( this.projectForResource.EndDate,'yyyy-MM-dd','en_US') 
        )
      else
        return ( formatDate(  startValue,'yyyy-MM-dd','en_US') <
          formatDate( this.projectForResource.StartDate,'yyyy-MM-dd','en_US') );
    }
    return false;
  };

  confirmCancel() {
    this.removeResourceModel = false;
  }

  authorize(key: string) {
    return this.permissionList.authorizedPerson(key);
  }

}
