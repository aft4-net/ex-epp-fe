import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectResource,AddProjectStateService, ProjectService, EmployeeService, projectResourceType, Employee, AssignResource, AssignResourceService, AssignedResoureEdit, ProjectResourceStateService, Project } from '../../../../core';
import { Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
;




@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss']
})
export class AddresourceComponent implements OnInit{

  addResorceForm!: FormGroup;
  editResorceForm!: FormGroup;

  constructor(private fb: FormBuilder,
  private  notification: NzNotificationService,
  private modal: NzModalService,
  private  projectResourceStateService:ProjectResourceStateService , 
    private assignResourceService:AssignResourceService,
    private router:Router,
    private projectCreateState:AddProjectStateService,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) { }

  resources: projectResourceType[] = [] as projectResourceType[];
  employees: Employee[]=[];;
  asignedResourseToEdit!: AssignResource;
  removeResourceModel=false;
  projectResources: AssignResource[] = [];
  isModalVisible = false;
  isEditMode = false;
  assignedDateError = false;
  disableUpdateButton=true;
  cancelModal=false;
  isOnEditstate=false;
  resourceEdit:AssignResource={} as AssignResource;
  resoureRemove!:AssignResource;
  projectForResource:Project={} as Project;

  @Output() addProjectResourceEvent = new EventEmitter<projectResourceType[]>();
  @Input() ProjectStartDate:Date| null=null;
  @Input() ProjectEndDate:Date| null=null;
  @Input() formValid:boolean |false=false;
  @Output() tabIndex = new EventEmitter();
  ngOnInit(): void {
    this.isOnEditstate=this. projectResourceStateService.isOnEditstate;
    if( this.isOnEditstate)
    this.projectForResource= this. projectResourceStateService.project;
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
        if(this. projectResourceStateService.isOnEditstate)
       {
          this. projectResourceStateService.projectResourceList$.subscribe(res=>{
            this.projectResources=res;
            if(this.projectResources)
            this.projectResources.forEach(p=>{        
             this.employees=this.employees.filter(x=>x.Guid!=p.EmployeeGuid);          
            })   
        })
        this.sortEmployees();
      }
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

        if((this.editResorceForm && this.isOnEditstate )&& (this.editResorceForm.controls.assignDate.value !=this.resourceEdit.AssignDate ||
          this.editResorceForm.controls.resource.value.Guid !=this.resourceEdit.EmployeeGuid))
          this.disableUpdateButton=false;
          else
          this.disableUpdateButton=true;

        if (projectAssignDate < hiredDate) {
          this.editResorceForm.controls.assignDate.setErrors({ 'invalidDate': true });

        }
        else
          this.editResorceForm.controls.assignDate.setErrors(null);
      }
      else
        this.addResorceForm.controls.assignDate.setErrors(null);



    });

     


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
          ProjectGuid:this.projectResourceStateService.project.Guid,
          AssignDate:this.addResorceForm.controls.assignDate.value
        }).subscribe(res=>{

          this.projectResourceStateService.updateAssignResources();

          this.addResorceForm.reset();
          this.notification.success("Resource assigned successfully",'')
        },error=>{
          this.notification.error("Project's resource add fail",'');
          this.addResorceForm.reset();
        })

      }else
      {
        this.resources.push({
          EmployeeGuid: this.addResorceForm.controls.resource.value.Guid,
          AssignDate: this.addResorceForm.controls.assignDate.value,
        })

        this.projectResources=[{
          Empolyee: this.addResorceForm.controls.resource.value,AssignDate: this.addResorceForm.controls.assignDate.value    
        },...this.projectResources];
   
        
    this.projectCreateState.updateAssignResource(this.resources);
    this.sortEmployees();
    this.employees = this.employees.filter(s => s.Guid !== this.addResorceForm.controls.resource.value.Guid);

      }
      this.isModalVisible = false;
      this.handleCancel();
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
      this.resourceEdit=projectResource;
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
      ProjectGuid:this.projectResourceStateService.project.Guid  ,
      AssignDate: this.editResorceForm.controls.assignDate.value
      }).subscribe(res=>{

        this.projectResourceStateService.updateAssignResources();

        this.addResorceForm.reset();
        this.notification.success("Resource updated successfully",'')
      },error=>{
        this.notification.error("Resource updated failed",'');
        this.addResorceForm.reset();
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
  conformationDelete(resource:AssignResource )
  {
    this. resoureRemove=resource;

    this.removeResourceModel=true
  }
  deleteCancel()
  {
    this.removeResourceModel=false;
    this.resoureRemove={} as AssignResource;
  }

  removeResource() {
    this.removeResourceModel=false;

     this.assignResourceService.delete(  this. resoureRemove.Guid??"").subscribe(res=>{
    this.removeResourceFromtable(this. resoureRemove.Empolyee.Guid);
      this.notification.success("Resource unassigned successfully",'')
      this.resoureRemove={} as AssignResource;
    },error=>{
      this.notification.error("Project's resource remove fail",'')
      this.resoureRemove={} as AssignResource;
    })

 }

removeForAddReource(resource:AssignResource)
{
  this.projectCreateState.updateAssignResource(this.resources);
  this.removeResourceFromtable(resource.Empolyee.Guid);
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
    if(this.employees.length!=0)
    this.employees.sort((a, b) => a.Name.localeCompare(b.Name))
  }
  disabledDates=(current:Date):boolean => {

    return current.valueOf()<this.ProjectStartDate!.valueOf();
  }
  onReset() {
    this.router.navigateByUrl('projectmanagement');
  }

  disabledEndDate = (startValue: Date): boolean => {
    if (!startValue || !this.ProjectStartDate ||this.isOnEditstate) {
      return false;
    }
    
    if(this.ProjectEndDate)
        {
          return (
            startValue.getTime() < this.ProjectStartDate.getTime() || startValue.getTime() > this.ProjectEndDate.getTime()
          );
        }
       else
        return (
          startValue.getTime() < this.ProjectStartDate.getTime() 
        );

  };

  
  confirmCancel(){
    this.removeResourceModel=false;
  }
  confirmCancelExit()
  {
    this.cancelModal=false;
  }
  showConfirm(){
    if(this.formValid)
     {
      this.tabIndex.emit(0);
       this.cancelModal=true;
     }
    else
    this.router.navigateByUrl('projectmanagement');
}

  confimeresredirect()
  {
    this.router.navigateByUrl('projectmanagement');
    this.cancelModal=false;
  }
  rediretCancel()
  {
    this.cancelModal=false;
  }
  navaigateToProject()
  {
    this.router.navigateByUrl('projectmanagement');
  }
}









