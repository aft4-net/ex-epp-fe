import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup,  Validators } from '@angular/forms';
import { Employee, ProjectResource,ProjectService,EmployeeService, projectResourceType  } from '../../../../core';
import { Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';




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

  projectResources:ProjectResource[]=[]; 
  isModalVisible = false;  
  isEditMode=false;
  assignedDateError=false;
  @Input() projectStartdDate={} as Date;
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

    this.addResorceForm.controls.assignDate.valueChanges.subscribe(()=>{
    
  
     const projectStartedDate = formatDate(this.projectStartdDate,'yyyy-MM-dd','en_US');
     const  hiredDate = formatDate(this.addResorceForm.controls.resource.value.hiredDate,'yyyy-MM-dd','en_US');
   
        if(hiredDate < projectStartedDate )
       { 
     
        this.assignedDateError=true;
          this.addResorceForm.controls.assignDate.setErrors({'incorrect':true});
      }
      else
         {
           console.log("No");
          this.assignedDateError=false;
          this.addResorceForm.controls.assignDate.setErrors(null);
         }
        
        
    });
    
}


get assignDateControl() {
  return   this.addResorceForm.controls.assignDate as FormControl;
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
this.employees=this.employees.filter(s=>s.guid!==this.addResorceForm.controls.resource.value.id);
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
// eslint-disable-next-line @typescript-eslint/no-empty-function
{}
 
 
addProject()
{

  
}

  editResource(id:string)
  {
    this.addResorceForm.reset();
    const projectResource=this.projectResources.find(s=>s.employee.guid==id);
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

  this.projectResources.map(s=>s.employee.guid=== this. asignedResourseToEdit.employee.guid?s:this. asignedResourseToEdit)  
  
  this.resources.map(s=>s.employeeId==this. asignedResourseToEdit.employee.guid?s:
    {  employeeId: this. asignedResourseToEdit.employee.guid,
      assignedDate:this.editResorceForm.controls.assignDate.value,
        assignedTo:this.editResorceForm.controls.assignTo.value}
      )

      for(let i=0;i< this.resources.length;i++)
      {
         if(this.resources[i].employeeId==this. asignedResourseToEdit.employee.guid)
                {  
                 this.resources[i]={  employeeId: this. asignedResourseToEdit.employee.guid,
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
  const projectResourece=this.projectResources.find(s=>s.employee.guid==id);
       if(projectResourece)
       this.employees.push(projectResourece.employee);
       this.sortEmployees();
  this.projectResources=this.projectResources.filter(s=>s.employee.guid!==id);
  this.resources=this.resources.filter(s=>s.employeeId!=id);
  this.addProjectResourceEvent.emit(this.resources);

  }

  sortEmployees()
{
  this.employees.sort((a, b) => a.name.localeCompare(b.name))
}




}









