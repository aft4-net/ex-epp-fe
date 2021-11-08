import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Employee, ProjectResource } from '@exec-epp/core-models';
import { Output, EventEmitter } from '@angular/core';
import {EmployeeService} from '../../../../core/services/employee.service';


@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss']
})
export class AddresourceComponent implements OnInit {


  constructor(private fb: FormBuilder,private employeeService:EmployeeService) { }

  addResorceForm= this.fb.group({
    resource:["",Validators.required],
    assignTo: ["Project",Validators.required],
    assignDate:[null,Validators.required],
  });
  editResorceForm= this.fb.group({
    assignTo: [Validators.required],
    assignDate:[null,Validators.required],
  });
 
  employees!:Employee[];;
  asignedResourseToEdit!:ProjectResource;
  listOfColumn = ['Resource','Assigned Date', 'Assgined To', 'Action'];
  projectResources:ProjectResource[]=[]; 
  isAddResourseModalVisible = false;  
  isEditModalVisible=false;

  @Output() addProjectResourceEvent = new EventEmitter<ProjectResource[]>();


  ngOnInit(): void {
    this.employeeService.getAll().subscribe((response:Employee[])=>{
      this.employees=response;
    })
  }

  addResource()
  {
   this.projectResources.push({employee:this.addResorceForm.controls.resource.value,assignedDate:this.addResorceForm.controls.assignDate.value
                    ,assignedTo:this.addResorceForm.controls.assignTo.value});
    this.addProjectResourceEvent.emit(this.projectResources);               
    this. isAddResourseModalVisible= false;
    this.employees=this.employees.filter(s=>s.id!==this.addResorceForm.controls.resource.value.id);
    this.addResorceForm.reset();
  }

  showModal(): void {
    this.addResorceForm.controls.assignTo.setValue("Project");
    this. isAddResourseModalVisible = true;
  }

  handleCancel(): void {
    this.addResorceForm.reset();
    this. isAddResourseModalVisible = false;
  }

  resetForm()
  {
     this.addResorceForm.controls.resource.setValue("");
     this.addResorceForm.controls.assignDate.setValue("");
     this.addResorceForm.controls.assignTo.setValue("Project");
  }
  resetEditForm()
  {
    this.editResorceForm.controls.assignDate.setValue("");
    this.editResorceForm.controls.assignTo.setValue("Project");
  }

  

  editResource(id:string)
  {
    this.addResorceForm.reset();
    const projectResource=this.projectResources.find(s=>s.employee.id==id);
    if(projectResource)
   {
    this.editResorceForm.controls.assignTo.setValue(projectResource.assignedTo); 
    this.editResorceForm.controls.assignDate.setValue(projectResource.assignedDate);
    this.asignedResourseToEdit=projectResource;
    this.isEditModalVisible=true;  
   }
  }

  submitEditdValue()
  {
    this. asignedResourseToEdit.assignedDate= this.editResorceForm.controls.assignDate.value;
    this. asignedResourseToEdit.assignedTo= this.editResorceForm.controls.assignTo.value;
    this.projectResources.map(s=>s.employee.id=== this. asignedResourseToEdit.employee.id?s:this. asignedResourseToEdit)  
    this.addProjectResourceEvent.emit(this.projectResources);
    this.isEditModalVisible=false;
    this.editResorceForm.reset();
    this. asignedResourseToEdit={} as ProjectResource;

  }

  removeResource(id:string)
  {
  const projectResourece=this.projectResources.find(s=>s.employee.id==id);
       if(projectResourece)
       this.employees.push(projectResourece.employee);
  this.projectResources=this.projectResources.filter(s=>s.employee.id!==id);
  this.addProjectResourceEvent.emit(this.projectResources);
  }

  handleEditModalCancel(): void {
    this.editResorceForm.reset();
    this.asignedResourseToEdit={} as ProjectResource;
    this.isEditModalVisible=false;  
  }

}










