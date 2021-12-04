import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { CountryDetailStateService } from "../../../../state-services/country-detail.state-service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-organizational-details-group',
    templateUrl: './organizational-detail-group.component.html',
    styleUrls: ['./organizational-detail-group.component.scss']
})
export class OrganizationalDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    countries$: Observable<string[]>


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _countryDetailStateService: CountryDetailStateService
    ) {
        this.countries$ = this._countryDetailStateService.countriesName$
        this.formGroup
            = this._formGenerator.organizationalForm

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this.formGroup.get(name) as FormControl
    }

    getFormArray(name: string): FormArray {
        return this.formGroup.get(name) as FormArray
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}