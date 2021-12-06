import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { FormControlResponseModel } from "../../../../Models/supporting-models/form-control-response.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage, resetError } from "../../../../Services/supporting-services/custom.validators";
import { PersonalDetailDataStateService } from "../../../../state-services/personal-detail-data.state-service";
import { FormGenerator } from "../../form-generator.model";
import { FormControlName, FormControlType } from "../../../../Models/supporting-models/form-control-name-type.enum"

@Component({
    selector: 'exec-epp-custom-employee-id-number',
    templateUrl: './custom-employee-id-number.component.html',
    styleUrls: ['./custom-employee-id-number.component.scss']
  })
export class CustomEmployeeIdNumberComponent implements OnInit {

    @Input() label = 'Employee Identification Number'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() formGroup: FormGroup = new FormGroup({})
    @Input() required = true
    @Input() formDescription: FormControlResponseModel = {} as FormControlResponseModel
    @Input() prefices$: Observable<SelectOptionModel[]> = of([])

    @Output() formResponse = new EventEmitter<FormControlResponseModel>()

    typeofPrefix = FormControlType.Prefix
    typeofInput = FormControlType.Input
    errMessage = ''

    constructor(
      private readonly _formGenerator: FormGenerator
    ) {}

    ngOnInit(): void {
    }

    getPrefix() {
      return this._formGenerator.getFormControl('prefix', this.formGroup)
    }
    geIdNumber() {
      return this._formGenerator.getFormControl('idNumber', this.formGroup)
    }

    onChange(type: FormControlType) {
      this.errMessage = commonErrorMessage.message.substring(0)
      this.formDescription.type = type
      this.formResponse.emit(this.formDescription)
    }

}