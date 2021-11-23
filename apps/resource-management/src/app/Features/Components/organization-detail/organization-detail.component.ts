import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup, Validators } from '@angular/forms';
import { ICountry } from '../../Models/EmployeeOrganization/Country';
import { IDutyBranch } from '../../Models/EmployeeOrganization/DutyBranch';
import { EmploymentType, Status } from '../../Models/EmployeeOrganization/enums';
import { CountryService } from '../../Services/EmployeeOrganization/country.service';
import { CountryModel } from '../../Models/EmployeeOrganization/ContryModel';
import { DutyBranchModel } from '../../Models/EmployeeOrganization/DutyBranchModel';
import { Router  } from '@angular/router';
import { LocationPhoneService } from '../../Services/address/location-phone.service';
import { EmployeeOrganization } from '../../Models/EmployeeOrganization/EmployeeOrganization';
import { ValidateFutureDate} from '../../../Features/Validators/ValidateFutureDate';
import { EmployeeService } from '../../Services/Employee/EmployeeService';
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
  dateFormat = 'dd/MM/yyyy';
  isEthiopia = false;
  listofCodes: string[] = [];
  isLoading = false;
  OrganizationSource !: EmployeeOrganization;
  constructor(private countryService: CountryService,private fb: FormBuilder,
              private router: Router, private _locationPhoneService:LocationPhoneService,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getCountries();
    this._locationPhoneService.getCountriesPhoneCode()
    .subscribe((response: string[]) => {
      this.listofCodes = response;
    })
    this.OrganizationSource = this.employeeService.getEmployeeOrganization();
    this.createEmployeeOrganizationForm(this.OrganizationSource);
    
  }

  createEmployeeOrganizationForm(employeeOrganization: EmployeeOrganization) {
    this.emloyeeOrganizationForm = this.fb.group({
      dutyStation: [employeeOrganization.DutyStation,[Validators.required]],
      dutyBranch: [employeeOrganization.DutyBranch,[Validators.required]],
      companyEmail: [employeeOrganization.CompaynEmail,[Validators.email, Validators.required]],
      phonecodePrefix:['+251'],
      phoneNumber: [employeeOrganization.PhoneNumber,[Validators.required,Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')]],
      jobtitle : [employeeOrganization.JobTitle, [Validators.required, Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
      businesstitle: [null, [Validators.required,Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
      department : [employeeOrganization.Department, [Validators.required , Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
      reportingmanager : [employeeOrganization.ReportingManager,[Validators.required , Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
      employmentType: [employeeOrganization.EmploymentType, [Validators.required]],
      joiningdate: [employeeOrganization.JoiningDate,[Validators.required,ValidateFutureDate()]],
      terminationdate:[employeeOrganization.TerminationDate,[ValidateFutureDate]],
      status:[employeeOrganization.Status, [Validators.required]]
    });
  }

  getCountries() {
    this.countryService.loadCountries().subscribe((countries) => {
      this.countries = countries.map((country : CountryModel) => ({
        id: country.Guid,
        name: country.Name
      }))
    })
  }

  loadDutyBranch(countryId: string) {
    this.countryService.loadDutyBranch(countryId).subscribe((dutyBranches) => {
      this.dutyBranches = dutyBranches.map((dutyBranch : DutyBranchModel) => ({
        id: dutyBranch.Guid,
        name: dutyBranch.Name
      }))
    })
  }

  action(event: string) {
    if(event === "next")
    {
      const OrganizationFormData = {
          DutyStation: this.emloyeeOrganizationForm.value.dutyStation,
          DutyBranch: this.emloyeeOrganizationForm.value.dutyBranch,
          CompaynEmail : this.emloyeeOrganizationForm.value.companyEmail,
          PhoneNumber : this.emloyeeOrganizationForm.value.phoneNumber,
          JoiningDate : this.emloyeeOrganizationForm.value.joiningdate,
          TerminationDate : this.emloyeeOrganizationForm.value.terminationdate,
          EmploymentType : this.emloyeeOrganizationForm.value.employmentType,
          Department : this.emloyeeOrganizationForm.value.department,
          ReportingManager : this.emloyeeOrganizationForm.value.reportingmanager,
          Status : this.emloyeeOrganizationForm.value.status,
          JobTitle : this.emloyeeOrganizationForm.value.jobtitle
        }  as EmployeeOrganization;
        if (this.emloyeeOrganizationForm.valid) {  
          this.employeeService.setEmployeeData(
          {
            EmployeeOrganization : OrganizationFormData
          })
          this.OrganizationSource = this.employeeService.getEmployeeOrganization();
          this.router.navigate(['personal-address']);
        }
      else
      {
        console.log('NotValid');
        Object.values(this.emloyeeOrganizationForm.controls).forEach(control => {
          if (control.invalid) {
            console.log(control.value);
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
    if(event === "back")
    {
      this.router.navigate(['']);
    }
  }
}
