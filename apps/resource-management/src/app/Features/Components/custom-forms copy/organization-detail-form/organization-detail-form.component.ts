/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { countriesPhoneData, reportingManagerData } from '../accessories/data';
import { FormErrorMessage } from '../accessories/models-types';
import { setControlError } from '../accessories/functions';
import { OrganizationalDetailsModel } from '../accessories/models';

@Component({
  selector: 'exec-epp-organization-detail-form',
  templateUrl: './organization-detail-form.component.html',
  styleUrls: ['./organization-detail-form.component.scss']
})
export class OrganizationDetailFormComponent implements OnInit {

  countriesData = countriesPhoneData
  dutyBranches = ['EDC-Head Quarter', 'EDC-Wegelawit Branch']
  jobTitles = ['Developer', 'QA', 'Finance Officer', 'HR Officer']
  businessUnits = ['Customer Support', 'Software Development']
  departments = ['Development', 'Quality Assurance', 'Finance', 'Human Resources']
  reportingManagers = reportingManagerData
  employmentTypes = ['Permanent', 'Contract']
  statuses = ['Active', 'Inactive', 'Terminated']

  errorMessages = {
    ...{} as FormErrorMessage,
    ...{
      controls: {
        country: setControlError(true),
        dutyBranch: setControlError(true),
        email: setControlError(true),
        phoneNumber: setControlError(true),
        jobTitle: setControlError(true),
        businessUnit: setControlError(true),
        department: setControlError(true),
        reportingManager: setControlError(true),
        employmentType: setControlError(true),
        joiningDate: setControlError(true),
        terminationDate: setControlError(true),
        status: setControlError(true),
      }
    } as Partial<FormErrorMessage>
  } as FormErrorMessage

  organizationalDetailsForm: FormGroup

  organizationalDetails: OrganizationalDetailsModel = {} as OrganizationalDetailsModel

  constructor(
    private readonly _formBuilder: FormBuilder
  ) {
    this.organizationalDetailsForm = this.createForm()
  }

  ngOnInit() {}

  createForm() {
    return this._formBuilder.group({
      country: [null],
      dutyBranch: [null],
      email: [null],
      phonecodePrefix: ['+251'],
      phoneNumber: [null],
      jobTitle: [null],
      businessUnit: [null],
      department: [null],
      reportingManager: [null],
      employmentType: [null],
      joiningDate: [null],
      terminationDate: [null],
      status: [null],
    });
  }



  disabledJoiningDate = (startValue: Date): boolean => {
    return startValue.getTime() > Date.now();
  }

  disabledTerminationDate = (startValue: Date): boolean => {
    return startValue.getTime() < Date.now();
  }

  validateCountry() { }

  validateDutyBranch() { }

  validateEmail() { }

  validatePhoneNumber() { }

  validateJobTitle() { }

  validateBusinessUnit() { }

  validateDepartment() { }

  validateReportingManager() { }

  validateEmploymentType() { }

  validateStatus() { }

  onPhonePrefixChange() { }



  ////////////////////////////////////////////////////////////////////////////////////
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // countries !: ICountry[];
  // dutyBranches !: IDutyBranch[];
  // reportingManagerList !: string[];
  // emloyeeOrganizationForm !: FormGroup;
  // employmentTypes = EmploymentType;
  // statuses = Status;
  // employmnetTypeKey =  Object.values;
  // statusKey = Object.values;
  // dateFormat = 'dd/MM/yyyy';
  // isEthiopia = false;
  // listofCodes: string[] = [];
  // isLoading = false;
  // OrganizationSource !: EmployeeOrganization;
  // constructor(private countryService: CountryService,private fb: FormBuilder,
  //             private router: Router, private _locationPhoneService:LocationPhoneService,
  //             private employeeService: EmployeeService) {
  // }

  // ngOnInit() {
  //   this.getCountries();
  //   this._locationPhoneService.getCountriesPhoneCode()
  //   .subscribe((response: string[]) => {
  //     this.listofCodes = response;
  //   })
  //   this.OrganizationSource = this.employeeService.getEmployeeOrganization();
  //   this.createEmployeeOrganizationForm(this.OrganizationSource);

  // }

  // createEmployeeOrganizationForm(employeeOrganization: EmployeeOrganization) {
  //   this.emloyeeOrganizationForm = this.fb.group({
  //     country: [employeeOrganization.DutyStation,[Validators.required]],
  //     dutyBranch: [employeeOrganization.DutyBranch,[Validators.required]],
  //     companyEmail: [employeeOrganization.CompaynEmail,[Validators.email, Validators.required]],
  //     phonecodePrefix:['+251'],
  //     phoneNumber: [employeeOrganization.PhoneNumber,[Validators.required,Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')]],
  //     jobtitle : [employeeOrganization.JobTitle, [Validators.required, Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
  //     businesstitle: [null, [Validators.required,Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
  //     department : [employeeOrganization.Department, [Validators.required , Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
  //     reportingmanager : [employeeOrganization.ReportingManager,[Validators.required , Validators.pattern('^([a-zA-z\\s]{4,32})$')]],
  //     employmentType: [employeeOrganization.EmploymentType, [Validators.required]],
  //     joiningdate: [employeeOrganization.JoiningDate,[Validators.required,ValidateFutureDate()]],
  //     terminationdate:[employeeOrganization.TerminationDate,[ValidateFutureDate]],
  //     status:[employeeOrganization.Status, [Validators.required]]
  //   });
  // }

  // getCountries() {
  //   this.countryService.loadCountries().subscribe((countries) => {
  //     this.countries = countries.map((country : CountryModel) => ({
  //       id: country.Guid,
  //       name: country.Name
  //     }))
  //   })
  // }

  // loadDutyBranch(countryId: string) {
  //   this.countryService.loadDutyBranch(countryId).subscribe((dutyBranches) => {
  //     this.dutyBranches = dutyBranches.map((dutyBranch : DutyBranchModel) => ({
  //       id: dutyBranch.Guid,
  //       name: dutyBranch.Name
  //     }))
  //   })
  // }

  // action(event: string) {
  //   if(event === "next")
  //   {
  //     const OrganizationFormData = {
  //         DutyStation: this.emloyeeOrganizationForm.value.country,
  //         DutyBranch: this.emloyeeOrganizationForm.value.dutyBranch,
  //         CompaynEmail : this.emloyeeOrganizationForm.value.companyEmail,
  //         PhoneNumber : this.emloyeeOrganizationForm.value.phoneNumber,
  //         JoiningDate : this.emloyeeOrganizationForm.value.joiningdate,
  //         TerminationDate : this.emloyeeOrganizationForm.value.terminationdate,
  //         EmploymentType : this.emloyeeOrganizationForm.value.employmentType,
  //         Department : this.emloyeeOrganizationForm.value.department,
  //         ReportingManager : this.emloyeeOrganizationForm.value.reportingmanager,
  //         Status : this.emloyeeOrganizationForm.value.status,
  //         JobTitle : this.emloyeeOrganizationForm.value.jobtitle
  //       }  as EmployeeOrganization;
  //       if (this.emloyeeOrganizationForm.valid) {
  //         this.employeeService.setEmployeeData(
  //         {
  //           EmployeeOrganization : OrganizationFormData
  //         })
  //         this.OrganizationSource = this.employeeService.getEmployeeOrganization();
  //         this.router.navigate(['personal-address']);
  //       }
  //     else
  //     {
  //       console.log('NotValid');
  //       Object.values(this.emloyeeOrganizationForm.controls).forEach(control => {
  //         if (control.invalid) {
  //           console.log(control.value);
  //           control.markAsDirty();
  //           control.updateValueAndValidity({ onlySelf: true });
  //         }
  //       });
  //     }
  //   }
  //   if(event === "back")
  //   {
  //     this.router.navigate(['']);
  //   }
  // }
}
