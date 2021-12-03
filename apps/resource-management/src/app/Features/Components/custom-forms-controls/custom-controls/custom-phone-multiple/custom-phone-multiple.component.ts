import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

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
    @Input() myControls: FormArray = new FormArray([
        new FormControl()
    ])

    @Output() reply: EventEmitter<boolean> = new EventEmitter<boolean>()
    prefixControls: FormArray = new FormArray([
        this.createPhoneControl()
    ])
    required = true
    errMessage = ''


    constructor(
        private readonly _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
    }

    onAction(index: number) {
        if (index + 1 < this.myControls.length
            || this.myControls.length >= this.maxAmount) {
            this.onRemove(index)
        } else {
            this.onAdd()
        }
        this.reply.emit(true)
    }

    createPhoneControl() {
        return this._formBuilder.array([
            new FormControl(),
            new FormControl()
        ])
    }

    getPrefixControl(index: number): FormControl {
        const array = this.myControls.at(index) as FormArray
        return array.at(0) as FormControl
    }

    getControl(index: number): FormControl {
        const array = this.myControls.at(index) as FormArray
        return array.at(1) as FormControl
    }

    onAdd() {
        this.myControls.controls.push(
            this.createPhoneControl()
        )
    }

    onRemove(index: number) {

        for (let i = this.myControls.length - 1; i >= 0; i--) {
            const element = this.myControls.controls.pop() as FormControl
            if(index !== i) {
                this.myControls.controls.push(
                    element
                )
            }
        }
        // this.myControls = this._formBuilder.array([
        //     ...this.myControls.controls.slice(0, index),
        //     ...this.myControls.controls.slice(index + 1)
        // ])
    }

    onChange() {
        this.errMessage = commonErrorMessage.message.substring(0)
    }

}