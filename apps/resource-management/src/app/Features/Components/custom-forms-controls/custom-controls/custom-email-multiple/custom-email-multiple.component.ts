import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormControlParameter, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-custom-email-multiple',
    templateUrl: './custom-email-multiple.component.html',
    styleUrls: ['./custom-email-multiple.component.scss']
  })
export class CustomEmailMultipleComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Email Address'
    maxAmount = 3
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControls: FormArray = new FormArray([])

    @Output() reply = new EventEmitter<boolean>()
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

    getControl(index: number) {
        return this.myControls.at(index) as FormControl
    }

    onAdd() {
        // this.add.emit(true)
        this.myControls.push(
            this._formGenerator.getEmailControl()
        )
        this.errMessages.push('')
    }

    onRemove(index: number) {
        this.myControls.removeAt(index)
    }

    onChange(index: number) {
        this.errMessages[index] = commonErrorMessage.message.substring(0)
    }

}