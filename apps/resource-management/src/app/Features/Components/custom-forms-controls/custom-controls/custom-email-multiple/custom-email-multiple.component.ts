import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormControlParameter, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

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
    @Input() prefixControlConfig =  new FormControlParameter(18, 24)
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControls: FormArray = new FormArray([
        new FormControl()
    ])

    @Output() reply = new EventEmitter<boolean>()
    required = true
    errMessage = ''


    constructor() {
        if(this.myControls.length === 0) {
            this.myControls.push(new FormControl())
        }
    }

    ngOnInit(): void {
    }

    onAction(index: number) {
        if(index + 1 < this.myControls.length
            || this.myControls.length >= this.maxAmount) {
            this.onRemove(index)
        } else {
            this.onAdd()
        }
        this.reply.emit(true)
    }

    getControl(index: number) {
        return this.myControls.at(index) as FormControl
    }

    onAdd() {
        this.myControls.push(new FormControl())
    }

    onRemove(index: number) {
        this.myControls.removeAt(index)
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}