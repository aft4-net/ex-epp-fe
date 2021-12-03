import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-employee-id-number',
    templateUrl: './custom-employee-id-number.component.html',
    styleUrls: ['./custom-employee-id-number.component.scss']
  })
export class CustomEmployeeIdNumberComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Employee Identification Number'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() prefixControl: FormControl = new FormControl()
    @Input() myControl: FormControl = new FormControl()
    required = true
    errMessage = ''

    prefices$ = of(defaultEmployeeIdNumberPrefices)

    constructor() {
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}