import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectResource,AddProjectStateService, ProjectService, EmployeeService, projectResourceType, Employee, EditProjectStateService, AssignResource, AssignResourceService, AssignedResoureEdit } from '../../../../core';
import { Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
;




@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss']
})
export class AddresourceComponent implements OnInit {



  addResorceForm!: FormGroup;
  editResorceForm!: FormGroup;

  constructor(private fb: FormBuilder,
  private  notification: NzNotificationService,
    private assignResourceService:AssignResourceService,
    private router:Router,
    private editProjectStateService:EditProjectStateService, 
    private projectCreateState:AddProjectStateService,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) { }


  resources: projectResourceType[] = [] as projectResourceType[];
  employees!: Employee[];;
  asignedResourseToEdit!: AssignResource;

  projectResources: AssignResource[] = [];
  isModalVisible = false;
  isEditMode = false;
  assignedDateError = false;
  isOnEditstate=false;

  @Output() addProjectResourceEvent = new EventEmitter<projectResourceType[]>();

  ngOnInit(): void {
    this.isOnEditstate=this.editProjectStateService.isOnEditstate;
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;

      this.sortEmployees();
    });
    this.addResorceForm = this.fb.group({
      resource: [null, Validators.required],

      assignDate: [null, Validators.required],
    });
    this.editResorceForm = this.fb.group({
      resource: [null, Validators.required],
      assignDate: [null, Validators.required],
    });

    this.addResorceForm.valueChanges.subscribe(() => {
      if (this.addResorceForm.valid) {
        const projectAssignDate = formatDate(this.addResorceForm.controls.assignDate.value, 'yyyy-MM-dd', 'en_US');
        const hiredDate = formatDate(this.addResorceForm.controls.resource.value.HiredDate, 'yyyy-MM-dd', 'en_US');

        if (projectAssignDate < hiredDate)
          this.addResorceForm.controls.assignDate.setErrors({ 'invalidDate': true });
        else
          this.addResorceForm.controls.assignDate.setErrors(null);


      }
    });


    this.editResorceForm.valueChanges.subscribe(() => {
      if (this.editResorceForm.valid) {
        const projectAssignDate = formatDate(this.editResorceForm.controls.assignDate.value, 'yyyy-MM-dd', 'en_US');
        const hiredDate = formatDate(this.editResorceForm.controls.resource.value.HiredDate, 'yyyy-MM-dd', 'en_US');

        if (projectAssignDate < hiredDate) {
          this.editResorceForm.controls.assignDate.setErrors({ 'invalidDate': true });

        }
        else
          this.editResorceForm.controls.assignDate.setErrors(null);
      }
      else
        this.addResorceForm.controls.assignDate.setErrors(null);
    });

      if(this.isOnEditstate)
      this.editProjectStateService.projectResourceList$.subscribe(res=>{
        this.projectResources=res;
        
      })
    

  }


  get assignDateControl() {
    return this.addResorceForm.controls.assignDate as FormControl;
  }

  get assignDateEditControl() {
    return this.editResorceForm.controls.assignDate as FormControl;
  }

  addResource() {
    if (this.addResorceForm.valid) {

      if(this.isOnEditstate)
      {
        this.assignResourceService.addResource(     {
          EmployeeGuid :this.addResorceForm.controls.resource.value.Guid,
          ProjectGuid:this.editProjectStateService.projectEditData.Guid,
          AssignDate:this.addResorceForm.controls.assignDate.value
        }).subscribe(res=>{
         
          this.editProjectStateService.updateAssignResources();
       
          this.addResorceForm.reset();
          this.notification.success("Project's resource Added successfully",'')  
        },error=>{
          this.notification.error("Project's resource add fail",'');
          this.addResorceForm.reset();  
        })
        
      }else
      {
        this.resources.push({
          EmployeeGuid: this.addResorceForm.controls.resource.value.Guid,
          AssignDate: this.addResorceForm.controls.assignDate.value
        })
        this.projectResources.push({
          Empolyee: this.addResorceForm.controls.resource.value,AssignDate: this.addResorceForm.controls.assignDate.value
        });
      }
   
      this.isModalVisible = false;

   
      
    this.projectCreateState.updateAssignResource(this.resources);
      this.sortEmployees();
      this.employees = this.employees.filter(s => s.Guid !== this.addResorceForm.controls.resource.value.Guid);
  
    } else {
      Object.values(this.addResorceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  showModal(): void {

    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.editResorceForm.reset();
    this.addResorceForm.reset();
    this.isEditMode = false;

  }

  resetForm() {
    this.addResorceForm.controls.resource.setValue("");
    this.addResorceForm.controls.assignDate.setValue("");

  }
  resetEditForm() {
    this.editResorceForm.controls.assignDate.setValue("");
    this.editResorceForm.controls.resource.setValue("");
  }



  editResource(id: string) {
    this.addResorceForm.reset();
    const projectResource = this.projectResources.find(s => s.Empolyee.Guid == id);
    if (projectResource) {

      this.editResorceForm.controls.resource.setValue(projectResource.Empolyee);
      this.editResorceForm.controls.assignDate.setValue(projectResource.AssignDate);
      this.asignedResourseToEdit = projectResource;
      this.isEditMode = true;
      this.isModalVisible = true;
    }
  }

  submitEditdValue() {

    if (this.editResorceForm.valid) {
  
      if( this.isOnEditstate)
      {
      
      this.assignResourceService.updateAssignResource({
        Guid:this.asignedResourseToEdit.Guid ,
      EmployeeGuid:this.editResorceForm.controls.resource.value.Guid,
      ProjectGuid:this.editProjectStateService.projectEditData.Guid,
      AssignDate: this.editResorceForm.controls.assignDate.value
      })

        }

      if (this.asignedResourseToEdit.Empolyee.Guid != this.editResorceForm.controls.resource.value.Guid) {
        this.employees.push(this.asignedResourseToEdit.Empolyee);
        this.employees = this.employees.filter(s => s.Guid !== this.editResorceForm.controls.resource.value.EmployeeGUid);
        this.sortEmployees();
      }
      this.asignedResourseToEdit.AssignDate = this.editResorceForm.controls.assignDate.value;
      this.asignedResourseToEdit.Empolyee = this.editResorceForm.controls.resource.value;

      this.projectResources.map(s => s.Empolyee.Guid === this.asignedResourseToEdit.Empolyee.Guid ? s : this.asignedResourseToEdit)

      this.resources.map(s => s.EmployeeGuid == this.asignedResourseToEdit.Empolyee.Guid ? s :
        {
          employeeId: this.editResorceForm.controls.resource.value.Guid,
          assignedDate: this.editResorceForm.controls.assignDate.value,
        }
      )
      if(!this.isOnEditstate) 
      for (let i = 0; i < this.resources.length; i++) {
        if (this.resources[i].EmployeeGuid == this.asignedResourseToEdit.Empolyee.Guid) {
          this.resources[i] = {
            EmployeeGuid: this.editResorceForm.controls.resource.value.Guid,
            AssignDate: this.editResorceForm.controls.assignDate.value
          };

         
    this.projectCreateState.updateAssignResource(this.resources);
          break;
        }
      }


      this.isEditMode = false;
      this.isModalVisible = false;
      this.editResorceForm.reset();
      this.asignedResourseToEdit = {} as AssignResource;
    } else {
      Object.values(this.editResorceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

  removeResource(resource:AssignResource ) {
   
    if(this.isOnEditstate)
   { 
  
     this.assignResourceService.delete(resource.Guid??"").subscribe(res=>{
    this.removeResourceFromtable(resource.Empolyee.Guid);
      this.notification.success("Project's resource removed successfully",'')  
    },error=>{
      this.notification.error("Project's resource remove fail",'')  
    })
   }
   else{ 
    this.projectCreateState.updateAssignResource(this.resources);
    this.removeResourceFromtable(resource.Empolyee.Guid);
  
   }
    
}

removeResourceFromtable(id:string)
{
  const projectResourece = this.projectResources.find(s => s.Empolyee.Guid == id);
  if (projectResourece)
  this.employees.push(projectResourece.Empolyee);
this.sortEmployees();
this.projectResources = this.projectResources.filter(s => s.Empolyee.Guid !== id);
this.resources = this.resources.filter(s => s.EmployeeGuid != id);
}

  sortEmployees() {
    this.employees.sort((a, b) => a.Name.localeCompare(b.Name))
  }
  onReset() {
  
    this.router.navigateByUrl('projectmanagement');
  }
}









