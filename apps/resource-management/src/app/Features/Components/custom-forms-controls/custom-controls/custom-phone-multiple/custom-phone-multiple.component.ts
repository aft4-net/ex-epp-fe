import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-custom-phone-multiple',
    templateUrl: './custom-phone-multiple.component.html',
    styleUrls: ['./custom-phone-multiple.component.scss']
})
export class CustomPhoneNumberMultipleComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Phone Number'
    prefices$: Observable<any> = of([{ country: 'Ethiopia', code: '+251' }])
    maxAmount = 3
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControls: FormArray = new FormArray([])

    @Output() reply: EventEmitter<boolean> = new EventEmitter<boolean>()
    required = true
    errMessages: string[] = []


    constructor(
        private readonly _formGenerator: FormGenerator
    ) {
    }

    ngOnInit(): void {
        for (let i = 0; i < this.myControls.length; i++) {
            this.errMessages.push('')
        }
    }

    getFormgroup(index: number) {
        return this.myControls.at(index) as FormGroup
    }

    getPrefixControl(index: number): FormControl {
        const formGroup = this.getFormgroup(index)
        return formGroup.get('prefix') as FormControl
    }

    getControl(index: number): FormControl {
        const formGroup = this.getFormgroup(index)
        return formGroup.get('phone') as FormControl
    }

    onAdd() {
        this.myControls.push(
            this._formGenerator.getPhoneNumberFormGroup()
        )
        this.errMessages.push('')
    }

    onRemove(index: number) {
        this.myControls.removeAt(index)
        this.errMessages = [
            ...this.errMessages.slice(0, index),
            ...this.errMessages.slice(index + 1),

        ]
    }

    onChange(index: number) {
        this.errMessages[index] = commonErrorMessage.message.substring(0)
    }

}