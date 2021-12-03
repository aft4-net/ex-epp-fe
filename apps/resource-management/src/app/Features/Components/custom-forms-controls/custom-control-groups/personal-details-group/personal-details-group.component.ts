import { ThisReceiver } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { commonErrorMessage, validateFirstName } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    @Input() personalDetailGroup?: FormGroup
    formGroup: FormGroup


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _formGenerator: FormGenerator
    ) {
        this.formGroup
            = this._formGenerator.getPersonalDetailsForm()

    }

    ngOnInit(): void {
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