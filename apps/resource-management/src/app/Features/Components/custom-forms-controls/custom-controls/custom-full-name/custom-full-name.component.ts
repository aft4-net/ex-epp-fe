import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormItemData, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { ValidatorResponse } from "../../../../Models/supporting-models/validator-response.model";
import { validateFirstName } from "../../../../Services/supporting-services/custom.validators";


@Component({
    selector: 'exec-epp-custom-full-name',
    templateUrl: './custom-full-name.component.html',
    styleUrls: ['./custom-full-name.component.scss']
  })
export class CustomFullNameComponent implements OnInit {

    @Input() firstNameControl: FormControl = new FormControl()
    @Input() middleNameControl: FormControl = new FormControl()
    @Input() lastNameControl: FormControl = new FormControl()

    errMessages: ValidatorResponse[]


    constructor() {
        this.firstNameControl.setValidators(this.validateFirstName)
        this.middleNameControl.setValidators(this.validateModdleName)
        this.lastNameControl.setValidators(this.validateLaseName)
        this.errMessages = [
            {
                required: true,
                message: ''
            },
            {
                required: true,
                message: ''
            },
            {
                required: true,
                message: ''
            }
        ]    
    }

    ngOnInit(): void {
    }

    validateName(control: AbstractControl, index:number) {
        const errMessage: ValidatorResponse = {
            required: true,
            message: ''
        } 
        const result = validateFirstName(
            control,
            errMessage
        )
        this.errMessages[index] = errMessage
        return result
    }

    validateFirstName(control: AbstractControl) {
        return this.validateName(control, 0)
    }

    validateModdleName(control: AbstractControl) {
        return this.validateName(control, 1)
    }

    validateLaseName(control: AbstractControl) {
        return this.validateName(control, 2)
    }

}