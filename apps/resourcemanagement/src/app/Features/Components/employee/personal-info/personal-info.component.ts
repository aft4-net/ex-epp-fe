import { Component, OnInit } from '@angular/core';

import { Employee } from '../../../Models/Employee';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
//import { LoadingSpinnerService} from '../../../../../../../../libs/common-services/loading-spinner.service';

@Component({
  selector: 'exec-epp-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  

  currentemployee!: Employee;
  currentdate = new Date();
  dateFormat = 'dd/mm/yyyy';

  
  isEdit = false;
  

  

  constructor(
    public employeeService: EmployeeService,
    private readonly _form: FormGenerator,
    //private loadingSpinnerService: LoadingSpinnerService
  ) {
    this.isEdit = this._form.IsEdit;

    this.employeeService.isdefault = false;
  }

  ngOnInit(): void { 
    //setTimeout(() => { 
     
     //}, 5000);  
  }

  
  
}
