import { Injectable } from '@angular/core'; 
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectValidationService {

  projectsSource = new BehaviorSubject<Project[]>([]);
  validateUpdateProject= new BehaviorSubject<boolean>(false);
  projects$ = this.projectsSource.asObservable();
  projectNameExitsErrorMessage=""
  get validationMessages():any{
    return  {
      'projectName': {
        'required': 'Please provide project name ',
        'maxlength':'Project name should not be more than 70 character',
        'minlength':'Project name should not be lesser than 2 character',
        'invalidName':this.projectNameExitsErrorMessage
      },
      'projectType': {
        'required': ' Please select project Type'
      },
      'client': {
        'required': 'Please select client'
      },
      'status':{
        'required': ' Please select Project status', 
      },
      'supervisor': {
        'required': 'Please select project supervisor', 
      },  
      'startValue': {
        'required': 'Please enter project start date',
      }
    };
  }


  constructor(private _projectService:ProjectService) { 
    this._projectService.getProjects().subscribe((response: any) => {
      this.projectsSource.next( response.Data);
    });
  }

 
  getValidationErrors(group: FormGroup): any {    
    // eslint-disable-next-line no-var
    var formErrors:any={};    
    Object.keys(group.controls).forEach((key: string) => {    
       const abstractControl = group.get(key);    
   
       formErrors[key] = '';    
       if (abstractControl && !abstractControl.valid &&    
          (abstractControl.touched || abstractControl.dirty)) {    
   
          const messages = this.validationMessages[key];    
   
          for (const errorKey in abstractControl.errors) {    
             if (errorKey) {    
                formErrors[key] += messages[errorKey] + ' ';    
             }    
          }    
       }    

       if (abstractControl instanceof FormGroup) {    
          const  groupError = this.getValidationErrors(abstractControl);    
          formErrors = { ...formErrors, ...groupError }    
       }    
    });    
    return formErrors    
 }  
 
 projectNameExitWithClient(projectControlName: string,clientControlName:string,isOnEditstate:boolean)  {  

  return (formGroup: FormGroup) => { 

   if(this.projectsSource.getValue().length==0 || (isOnEditstate && !this.validateUpdateProject.getValue()))
   return null; 

   const control = formGroup.get(projectControlName);  
   const clientControl = formGroup.get(clientControlName);  

   if (!control || !clientControl ) 
   return null;
   
   for (let i = 0; i < this.projectsSource.getValue().length; i++) {
     if ( this.projectsSource.getValue()[i].ProjectStatus?.AllowResource &&
       clientControl?.value  ==
       this.projectsSource.getValue()[i].Client?.Guid &&
         control?.value?.toLowerCase().trim() ===
         this.projectsSource.getValue()[i].ProjectName?.toLowerCase()?.trim()
     ) {
       control?.setErrors({ invalidName: true });
       this.projectNameExitsErrorMessage =
       `Project name already exists 
       ${ this.projectsSource.getValue()[i].ProjectType== "External" ? `by this 
       ${this.projectsSource.getValue()[i].Client?.ClientName}  client  `:` `} `;
       control.setErrors({invalidName: true });
       return ({ invalidName: true });
     }
   }
   if(control.errors?.invalidName)
   control.setErrors(null);
return null;
} 

}

}
