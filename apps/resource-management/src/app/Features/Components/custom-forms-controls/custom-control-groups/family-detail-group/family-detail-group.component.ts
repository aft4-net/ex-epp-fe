import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressDataStateService } from "../../../../state-services/address.detail.state.service";
import { OrganizationDetailStateService } from "../../../../state-services/organization-details-data.state-service";
import { PersonalDetailDataStateService } from "../../../../state-services/personal-detail-data.state-service";
import { FormGenerator } from "../../form-generator.model";
import { relationships } from "../emergency-contact-detail-group/emergency-contact-detail-group.component";

@Component({
    selector: 'exec-epp-family-detail-group',
    templateUrl: './family-detail-group.component.html',
    styleUrls: ['./family-detail-group.component.scss']
})
export class FamilyDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    relationships$: Observable<SelectOptionModel[]> = of(relationships)
    genders$:  Observable<SelectOptionModel[]>


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressDetailStateService: PersonalDetailDataStateService
    ) {
        this.genders$=this._addressDetailStateService.genders$
        this.formGroup
            = this._formGenerator.familyDetail

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    onCountrySelect() {

    }
    
    onStateSelect() {

    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}