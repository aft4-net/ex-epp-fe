import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    formGroup: FormGroup


    constructor(
        private readonly _formGenerator: FormGenerator
    ) {
        this.formGroup
            = this._formGenerator.personalDetailsForm

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