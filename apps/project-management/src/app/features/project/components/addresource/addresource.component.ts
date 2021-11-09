import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Employee, ProjectResource,ProjectService,EmployeeService, projectResourceType  } from '../../../../core';
import { Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'exec-epp-addresource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.scss']
})
export class AddresourceComponent implements OnInit {

 

  addResorceForm!: FormGroup;
  editResorceForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private employeeService:EmployeeService,
    private projectService:ProjectService
    ) { }


  resources: projectResourceType[]=[] as  projectResourceType[];
  employees!:Employee[];;
  asignedResourseToEdit!:ProjectResource;
  listOfColumn = ['Resource','Assigned Date', 'Action'];
  projectResources:ProjectResource[]=[]; 
  isModalVisible = false;  
  isEditMode=false;
  @Output() addProjectResourceEvent = new EventEmitter<projectResourceType[]>();



  ngOnInit(): void {
    this.employeeService.getAll().subscribe((response:Employee[])=>{
      this.employees=response;
      this.sortEmployees();
    });
    this.addResorceForm= this.fb.group({
      resource:[null,Validators.required],

      assignDate:[null,Validators.required],
    });
    this.editResorceForm= this.fb.group({
  
      assignDate:[null,Validators.required],
    });

  }

  addResource()
  {
  
   
    if (this.addResorceForm.valid) {
 this.projectResources.push({employee:this.addResorceForm.controls.resource.value,assignedDate:this.addResorceForm.controls.assignDate.value
        });
        this. isModalVisible= false;
        
this.resources.push({  employeeId:this.addResorceForm.controls.resource.value.id,
                    assignedDate:this.addResorceForm.controls.assignDate.value})


this.addProjectResourceEvent.emit(this.resources)
this.sortEmployees();
this.employees=this.employees.filter(s=>s.id!==this.addResorceForm.controls.resource.value.id);
this.addResorceForm.reset();
    } else {
      Object.values(this.addResorceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    
  }

  showModal(): void {

    this. isModalVisible = true;
  }

  handleCancel(): void {
    this. isModalVisible = false;
    this.editResorceForm.reset();
    this.addResorceForm.reset();
    this.isEditMode=false;

  }

  resetForm()
  {
     this.addResorceForm.controls.resource.setValue("");
     this.addResorceForm.controls.assignDate.setValue("");
   
  }
  resetEditForm()
  {
    this.editResorceForm.controls.assignDate.setValue("");

  }

  cancel()
{}
 
 
addProject()
{

  
}

  editResource(id:string)
  {
    this.addResorceForm.reset();
    const projectResource=this.projectResources.find(s=>s.employee.id==id);
    if(projectResource)
   {

    this.editResorceForm.controls.assignDate.setValue(projectResource.assignedDate);
    this.asignedResourseToEdit=projectResource;
    this.isEditMode=true; 
    this.isModalVisible=true; 
   }
  }

  submitEditdValue()
  {
if( this.editResorceForm.valid)
{
  this. asignedResourseToEdit.assignedDate= this.editResorceForm.controls.assignDate.value;

  this.projectResources.map(s=>s.employee.id=== this. asignedResourseToEdit.employee.id?s:this. asignedResourseToEdit)  
  
  this.resources.map(s=>s.employeeId==this. asignedResourseToEdit.employee.id?s:
    {  employeeId: this. asignedResourseToEdit.employee.id,
      assignedDate:this.editResorceForm.controls.assignDate.value,
        assignedTo:this.editResorceForm.controls.assignTo.value}
      )

      for(let i=0;i< this.resources.length;i++)
      {
         if(this.resources[i].employeeId==this. asignedResourseToEdit.employee.id)
                {  
                 this.resources[i]={  employeeId: this. asignedResourseToEdit.employee.id,
                  assignedDate:this.editResorceForm.controls.assignDate.value};                
                
                 this.addProjectResourceEvent.emit(this.resources);
                 break;}
      }
       
 
  this. isEditMode=false;
  this.isModalVisible=false;
  this.editResorceForm.reset();
  this. asignedResourseToEdit={} as ProjectResource;
  } else {
    Object.values(this.editResorceForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  }

  removeResource(id:string)
  {
  const projectResourece=this.projectResources.find(s=>s.employee.id==id);
       if(projectResourece)
       this.employees.push(projectResourece.employee);
       this.sortEmployees();
  this.projectResources=this.projectResources.filter(s=>s.employee.id!==id);
  this.resources=this.resources.filter(s=>s.employeeId!=id);
  this.addProjectResourceEvent.emit(this.resources);

  }

  sortEmployees()
{
  this.employees.sort((a, b) => a.name.localeCompare(b.name))
}


}









