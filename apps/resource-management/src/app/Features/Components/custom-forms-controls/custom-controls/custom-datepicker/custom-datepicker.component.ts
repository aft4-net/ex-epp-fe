import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-datepicker',
    templateUrl: './custom-datepicker.component.html',
    styleUrls: ['./custom-datepicker.component.scss']
})
export class CustomDatepickerComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() prefixControl: FormControl = new FormControl()
    @Input() myControl: FormControl = new FormControl()
    @Input() startingDate?: Date
    @Input() endingDate?: Date
    required = true
    errMessage = ''

    prefices$ = of(defaultEmployeeIdNumberPrefices)

    constructor() {
    }

    ngOnInit(): void {
    }

    disabledDate = (startValue: Date): boolean => {
        return (
            (this.startingDate ? startValue.getTime() > this.startingDate.getTime() : true)
            && (this.endingDate ? startValue.getTime() < this.endingDate.getTime() : true)
        )
    }

    onChange() {
        this.errMessage = commonErrorMessage.message.substring(0)
    }

}