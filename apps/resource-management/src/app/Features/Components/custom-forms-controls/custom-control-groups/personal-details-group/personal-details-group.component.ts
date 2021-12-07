import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { ExternalCountryApiService } from "../../../../Services/external-api.services/external-countries.api.service";
import { maxEmployeeDateofBirth, minEmployeeDateofBirth } from "../../../../Services/supporting-services/basic-data.collection";
import { PersonalDetailDataStateService } from "../../../../state-services/personal-detail-data.state-service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    formGroup: FormGroup
    employeeIdNumberPrefices$: Observable<SelectOptionModel[]>
    genders$: Observable<SelectOptionModel[]>
    phoenPrefices$: Observable<SelectOptionModel[]>
    nationalities$: Observable<SelectOptionModel[]>
    maxDateofBirth = maxEmployeeDateofBirth? maxEmployeeDateofBirth: new Date(Date.now())
    maxEmailQty = 3
    maxPhoneQty = 3

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _personalDetailDataStateService: PersonalDetailDataStateService,
        private readonly _externalCountryApiService: ExternalCountryApiService
    ) {
        this.employeeIdNumberPrefices$ = this._personalDetailDataStateService.employeeIdNumberPrefices$
        this.genders$ = this._personalDetailDataStateService.genders$
        this.phoenPrefices$ = this._personalDetailDataStateService.phonePrefices$
        this.nationalities$ = this._externalCountryApiService.get()
        this.formGroup = this._formGenerator.personalDetailsForm
        console.log('Set')
        console.log(this._formGenerator.familyDetail.value)

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

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}