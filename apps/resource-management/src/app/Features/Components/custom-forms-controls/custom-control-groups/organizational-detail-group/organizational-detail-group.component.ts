import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressCountryStateService } from "../../../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "../../form-generator.model";

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
    businessUnits$: Observable<SelectOptionModel[]>
    reportingManagers$: Observable<SelectOptionModel[]>
    departments$: Observable<SelectOptionModel[]>
    employementTypes$: Observable<SelectOptionModel[]>
    employementStatuses$: Observable<SelectOptionModel[]>

    joinigStartDate = new Date(Date.now())
    terminationStartDate = new Date(Date.now())

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressCountryStateService: AddressCountryStateService,
        private readonly _employeeStaticDataService: EmployeeStaticDataMockService
    ) {
        this.countries$ = this._addressCountryStateService.countries$
        this.dutyStations$ = this._employeeStaticDataService.dutyStations$
        this.jobTitles$ = this._employeeStaticDataService.jobTitles$
        this.businessUnits$ = this._employeeStaticDataService.businessUnits$
        this.departments$ = this._employeeStaticDataService.departments$
        this.employementTypes$ = this._employeeStaticDataService.employementTypes$
        this.reportingManagers$ = this._employeeStaticDataService.reportingManagers$
        this.employementStatuses$ = this._employeeStaticDataService.employementStatuses$
        

        this.formGroup
            = this._formGenerator.organizationalForm

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormArray(name: string): FormArray {
        return this._formGenerator.getFormArray(name, this.formGroup)
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}