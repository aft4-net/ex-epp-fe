import { Component, OnInit } from '@angular/core';
import { EmploymentType, Status } from '../../../Models/EmployeeOrganization/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountryModel } from '../../../Models/EmployeeOrganization/ContryModel';
import { CountryService } from '../../../Services/EmployeeOrganization/country.service';
import { DutyBranchModel } from '../../../Models/EmployeeOrganization/DutyBranchModel';
import { EmployeeOrganization } from '../../../Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { ICountry } from '../../../Models/EmployeeOrganization/Country';
import { IDutyBranch } from '../../../Models/EmployeeOrganization/DutyBranch';
import { LocationPhoneService } from '../../../Services/address/location-phone.service';
import { Router } from '@angular/router';
import { ValidateFutureDate } from '../../../Validators/ValidateFutureDate';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';

@Component({
  selector: 'exec-epp-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

  countries !: ICountry[];
  dutyBranches !: IDutyBranch[];
  reportingManagerList !: string[];
  emloyeeOrganizationForm !: FormGroup;
  employmentTypes = EmploymentType;
  statuses = Status;
  employmnetTypeKey =  Object.values;
  statusKey = Object.values;
  dateFormat = 'mm-dd-yyyy';
  isEthiopia = false;
  listofCodes: string[] = [];
  isLoading = false;
  defaultTerminationDate = new Date();
  OrganizationSource !: EmployeeOrganization;
  isEdit = false
  constructor() {}
                
  

  ngOnInit() {
    

  }
}
