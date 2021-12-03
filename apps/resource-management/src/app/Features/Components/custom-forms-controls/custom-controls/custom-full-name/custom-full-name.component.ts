import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormItemData, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { ValidatorResponse } from "../../../../Models/supporting-models/validator-response.model";
import { commonErrorMessage, validateFirstName, validateLastName, validateMiddleName } from "../../../../Services/supporting-services/custom.validators";

const errorMessageRequired: ValidatorResponse =
{
    required: true,
    message: ''
}
const errorMessageOptional: ValidatorResponse =
{
    required: false,
    message: ''
}

@Component({
    selector: 'exec-epp-custom-full-name',
    templateUrl: './custom-full-name.component.html',
    styleUrls: ['./custom-full-name.component.scss']
  })
export class CustomFullNameComponent implements OnInit {

    @Input() firstNameControl: FormControl = new FormControl()
    @Input() middleNameControl: FormControl = new FormControl()
    @Input() lastNameControl: FormControl = new FormControl()

    constructor() {
    }

    ngOnInit(): void {
    }

    validateFirstName(control: AbstractControl) {
        commonErrorMessage.required = true
        return validateFirstName(control, commonErrorMessage)
    }

    validateMiddleName(control: AbstractControl) {
        commonErrorMessage.required = false
        return validateFirstName(control, commonErrorMessage)
    }

    validateLastName(control: AbstractControl) {
        commonErrorMessage.required = true
        return validateFirstName(control, commonErrorMessage)
    }

}