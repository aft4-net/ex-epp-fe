import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
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
    prefices$: Observable<any> = of([{country:'Ethiopia', code:'+251'}])
    maxAmount = 3
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControls:FormControl[][] = []
    required = true
    errMessage = ''


    constructor() {
        if(this.myControls.length === 0) {
            this.myControls.push([
                new FormControl(),
                new FormControl()
            ])
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
    }

    onAdd() {
        this.myControls.push([
            new FormControl(),
            new FormControl()
        ])
    }

    onRemove(index: number) {
        this.myControls = [
            ...this.myControls.slice(0, index),
            ...this.myControls.slice(index + 1)
        ]
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}