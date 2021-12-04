import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { CountryDetailStateService } from "../../../../state-services/country-detail.state-service";

@Component({
    selector: 'exec-epp-custom-employee-id-number',
    templateUrl: './custom-employee-id-number.component.html',
    styleUrls: ['./custom-employee-id-number.component.scss']
  })
export class CustomEmployeeIdNumberComponent implements OnInit {

    label = 'Employee Identification Number'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() prefixControl: FormControl = new FormControl()
    @Input() myControl: FormControl = new FormControl()
    required = true
    errMessage = ''

    prefices$: Observable<string[]>

    constructor(
      private readonly _countryDetailStateService: CountryDetailStateService
    ) {
      this.prefices$ = this._countryDetailStateService.employeeIdNumberPrefices$
      // if(!this.prefixControl.value) {
      //   this.prefixControl.setValue(
      //     this._countryDetailStateService.defaultEmployeeIdNumberPrefices
      //   )
      // }
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}