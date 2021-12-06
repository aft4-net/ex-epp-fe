import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { OrganizationDetailStateService } from "../../../../state-services/organization-details-data.state-service";
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


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _organizationDetailStateService: OrganizationDetailStateService
    ) {
        this.countries$ = this._organizationDetailStateService.countriesName$
        this.dutyStations$ = this._organizationDetailStateService.dutyStations$
        this.jobTitles$ = this._organizationDetailStateService.jobTitles$
        this.businessUnits$ = this._organizationDetailStateService.businessUnits$
        this.departments$ = this._organizationDetailStateService.departments$
        this.employementTypes$ = this._organizationDetailStateService.employementTypes$
        this.reportingManagers$ = this._organizationDetailStateService.reportingManagers$
        this.employementStatuses$ = this._organizationDetailStateService.employementStatuses$
        

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