import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { EmployeeService } from "../../../../Services/Employee/EmployeeService";
import { CountryService } from "../../../../Services/EmployeeOrganization/country.service";
import { DepartmentService } from "../../../../Services/EmployeeOrganization/department.service";
import { ReportingManagerService } from "../../../../Services/EmployeeOrganization/reportingmanager.service";
import { RoleService } from "../../../../Services/EmployeeOrganization/role.service";
import { FormGenerator } from "../../form-generator.model";
import { employementStatuses$, employementTypes$ } from "../../shared/static-data";

@Component({
    selector: 'exec-epp-organizational-details-group',
    templateUrl: './organizational-detail-group.component.html',
    styleUrls: ['./organizational-detail-group.component.scss']
})
export class OrganizationalDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    countries$: Observable<SelectOptionModel[]>
    dutyStations$: Observable<SelectOptionModel[]>
    jobTitles$: Observable<SelectOptionModel[]>
    reportingManagers$: Observable<SelectOptionModel[]>
    departments$: Observable<SelectOptionModel[]>
    employementTypes$: Observable<SelectOptionModel[]>
    employementStatuses$: Observable<SelectOptionModel[]>

    joinigStartDate = new Date(Date.now())
    terminationStartDate = new Date(Date.now())

    isContract = false;
    isNew = true;
    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _countryService: CountryService,
        private readonly _departmentService: DepartmentService,
        private readonly _roleService: RoleService,
        private readonly _reportingManagerService: ReportingManagerService,
        private readonly _employeeService: EmployeeService
        ) {
        this.countries$ = this._countryService.loadCountries();
        this.dutyStations$ = of([]);
        this.departments$ = this._departmentService.getAllDeparments()
        this.jobTitles$ = of([]);
        this.employementTypes$ = employementTypes$
        this.reportingManagers$ = this._reportingManagerService.GetReportingManager();
        this.employementStatuses$ = employementStatuses$
        this.formGroup
            = this._formGenerator.organizationalForm
    }

    ngOnInit(): void {
        if(this.formGroup.value.country){
           this.onCountrySelect(this.formGroup.value.country.toString());
        }

        if(this.formGroup.value.department){
            this.onDepartmentSelect(this.formGroup.value.department.toString());
        }
        this.isNew = !this._employeeService.isEdit;
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormArray(name: string): FormArray {
        return this._formGenerator.getFormArray(name, this.formGroup)
    }
    onCountrySelect(event: any){
        this.dutyStations$ = this._countryService.loadDutyBranch(event);
    }

    onDepartmentSelect(event: any){
        this.jobTitles$ = this._roleService.GetAllRoles(event);
    }

    onEmployementTypeChange() {
        const value: string = this.getControl('employeementType').value
        if(value.search('Permanent') < 0){
            this.isContract = true
        } else {
            this.isContract = false
        }
    }

}