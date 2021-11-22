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
import { BehaviorSubject } from 'rxjs';
import { EmployeeOrganization } from '../../Models/EmployeeOrganization/EmployeeOrganization';
import { ValidateFutureDate} from '../../../Features/Validators/ValidateFutureDate';
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
  searchChange$ = new BehaviorSubject('');
  
  constructor(private countryService: CountryService,private fb: FormBuilder,
              private router: Router, private _locationPhoneService:LocationPhoneService) {
  }

  ngOnInit() {
    this.createEmployeeOrganizationForm();
    this.getCountries();
    this._locationPhoneService.getCountriesPhoneCode()
    .subscribe((response: string[]) => {
      this.listofCodes = response;
    })
  }

  createEmployeeOrganizationForm() {
    this.emloyeeOrganizationForm = this.fb.group({
      dutyStation: [null,[Validators.required]],
      dutyBranch: [null,[Validators.required]],
      companyEmail: [null,[Validators.email, Validators.required]],
      phonecodePrefix:['+251'],
      phoneNumber: [null,[Validators.required,Validators.max(15),Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')]],
      jobtitle : [null, [Validators.required]],
      businesstitle: [null, [Validators.required]],
      department : [null, [Validators.required]],
      reportingmanager : [null,[Validators.required]],
      employmenttype: [null, [Validators.required]],
      joiningdate: [null,[Validators.required,ValidateFutureDate()]],
      terminationdate:[null,[ValidateFutureDate]],
      status:[null, [Validators.required]]
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
      if (this.emloyeeOrganizationForm.valid) {   
        this.router.navigate(['address-new']);
      }
      else
      {
        Object.values(this.emloyeeOrganizationForm.controls).forEach(control => {
          if (control.invalid) {
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
