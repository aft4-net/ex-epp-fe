import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ICountry } from '../../Models/EmployeeOrganization/Country';
import { IDutyBranch } from '../../Models/EmployeeOrganization/DutyBranch';
import { EmploymentType, Status } from '../../Models/EmployeeOrganization/enums';
import { CountryService } from '../../Services/EmployeeOrganization/country.service';
import { CountryModel } from '../../Models/EmployeeOrganization/ContryModel';
import { DutyBranchModel } from '../../Models/EmployeeOrganization/DutyBranchModel';
@Component({
  selector: 'exec-epp-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {
  
  countries !: ICountry[];
  dutyBranches !: IDutyBranch[];
  emoloyeeOrganizationForm : FormGroup | any;
  employmentTypes = EmploymentType;
  statuses = Status;
  employmnetTypeKey =  Object.values;
  statusKey = Object.values;
  dateFormat = 'dd/MM/yyyy';
  constructor(private countryService: CountryService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createEmployeeOrganizationForm();
    this.getCountries();
  }

  createEmployeeOrganizationForm() {
    this.emoloyeeOrganizationForm = this.fb.group({
      country: ['',Validators.required],
      dutyBranch: ['',Validators.required],
      companyEmail: ['',Validators.email],
      phoneNumber: ['',Validators.required],
      jobtitle : ['', Validators.required],
      businesstitle: [''],
      department : ['', Validators.required],
      reportingmanager : ['',Validators.required],
      employmenttype: ['', Validators.required],
      joiningdate: ['',Validators.required],
      terminationdate:[''],
      status:['', Validators.required]
    });
  }

  getCountries() {
    this.countryService.loadCountries().subscribe((countries) => {
      this.countries = countries.map((country : CountryModel) => ({
        id: country.Guid,
        name: country.Name
      }))
      console.log(this.countries);
    })
  }

  loadDutyBranch(countryId: string) {
    this.countryService.loadDutyBranch(countryId).subscribe((dutyBranches) => {
      this.dutyBranches = dutyBranches.map((dutyBranch : DutyBranchModel) => ({
        id: dutyBranch.Guid,
        name: dutyBranch.Name
      }))
      console.log(this.countries);
    })
  }
}
