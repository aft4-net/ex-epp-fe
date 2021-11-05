import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeePostion,ProjectResourceRequirement } from '@exec-epp/core-models';

@Component({
  selector: 'exec-epp-resourse-requirement',
  templateUrl: './resourse-requirement.component.html',
  styleUrls: ['./resourse-requirement.component.scss']
})
export class ResourseRequirementComponent {


  constructor(private fb: FormBuilder) {  }
  
  addResorceRequirementForm= this.fb.group({
    resourcePostion:["",Validators.required],
    requirement: [1,Validators.required],
  
  });

  editResorceRequirementForm= this.fb.group({
    requirement: [Validators.required],
  });


  employeePostions=Object.values(EmployeePostion);

  projectResourceRequirements:ProjectResourceRequirement[]=[];

  @Output() addProjectResourceRequirementEvent = new EventEmitter<ProjectResourceRequirement[]>();

  listOfColumn = ['Resource','Requirement', 'Action']; 
  isAddResourseRequiremntModalVisible=false;
  isEditResourceRequirmentMode=false;
  asignedResourseToEdit:ProjectResourceRequirement={} as ProjectResourceRequirement ;


  handleCancel(): void {
    this.addResorceRequirementForm.reset();
 
    this. isAddResourseRequiremntModalVisible=false;
  }

  resetForm()
  {
     this.addResorceRequirementForm.controls.resource.setValue("");
     this.addResorceRequirementForm.controls.requirement.setValue("1");

  }
  resetEditForm()
  {
    this.editResorceRequirementForm.controls.requirement.setValue("1");
  }




  addResourceRequirement()
 
  {
    this.projectResourceRequirements.push({employeePostion:this.addResorceRequirementForm.controls.resourcePostion.value,
                                  requirement  :this.addResorceRequirementForm.controls.requirement.value });
   
this.addProjectResourceRequirementEvent.emit(this.projectResourceRequirements);               
this.isAddResourseRequiremntModalVisible=false;
this.employeePostions=this.employeePostions.filter(s=>s!==this.addResorceRequirementForm.controls.resourcePostion.value);
this.addResorceRequirementForm.reset();

    
  }

  showModal()

  {
    this.isAddResourseRequiremntModalVisible=true;
    this. editResorceRequirementForm.controls.requirement.setValue(1);
  }

  editResource(resource:string)
  {

  
    const projectResoureceRequirement=this.projectResourceRequirements.find(s=>s.employeePostion==resource);
    if(projectResoureceRequirement)
   {
   this.asignedResourseToEdit=projectResoureceRequirement;
    this. editResorceRequirementForm.controls.requirement.setValue(projectResoureceRequirement.requirement); 
    this.isEditResourceRequirmentMode=true;
    this.isAddResourseRequiremntModalVisible=true;
  
  }
  }

  submitEditdValue()
  {
     this.asignedResourseToEdit.requirement=this. editResorceRequirementForm.controls.requirement.value

    this.projectResourceRequirements.map(s=>s.employeePostion==
          this.asignedResourseToEdit.employeePostion?s: this.asignedResourseToEdit.requirement)  
    this.addProjectResourceRequirementEvent.emit(this.projectResourceRequirements);   
    this.isEditResourceRequirmentMode=false;
    this.isAddResourseRequiremntModalVisible=false;
    this.editResorceRequirementForm.reset();

    this.asignedResourseToEdit={} as ProjectResourceRequirement ;

  }

  removeResource(resource:string)
  {
    const projectResoureceRequirement=this.projectResourceRequirements.find(s=>s.employeePostion==resource);
    if(projectResoureceRequirement)
    this.employeePostions.push(projectResoureceRequirement.employeePostion);
  this.projectResourceRequirements=this.projectResourceRequirements.filter(s=>s.employeePostion!=resource);
  this.addProjectResourceRequirementEvent.emit(this.projectResourceRequirements);
  } 





}
