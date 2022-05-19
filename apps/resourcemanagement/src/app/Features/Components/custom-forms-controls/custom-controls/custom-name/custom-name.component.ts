import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { FormControlResponseModel } from "../../../../Models/supporting-models/form-control-response.model";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../shared/custom.validators";
import { EmployeeService } from "../../../../Services/Employee/EmployeeService";

const errValidator = ((c: AbstractControl) => {
    return { error: true } ;
});

@Component({
    selector: 'exec-epp-custom-name',
    templateUrl: './custom-name.component.html',
    styleUrls: ['../../excel-styles/excel-single-control.style.scss']
  })

export class CustomNameComponent {

    @Input() label = 'Full Name'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() formControl: FormControl = new FormControl()
    @Input() required = true
    @Input() formDescription: FormControlResponseModel = {} as FormControlResponseModel
  
    @Output() formResponse = new EventEmitter()
  
    errMessage = ''
    isEdit = true;
    minLengthofFullName = 3;
    maxLengthofFullName = 0;
  
    constructor() {
        // constructor method
    }

    onChange() {
      this.errMessage = '';
      const value = this.formControl.value;
      if (value) {
        this.formControl.removeValidators(errValidator);

        const re = /[a-zA-Z]+[\s][a-zA-Z]+/; // '^[a-zA-Z][a-zA-Z0-9-_ ]+$'
        if (re.test(value)) {
            // valid full name
        } else {
          this.errMessage = "Full name is not valid!";
        }
      } else {
        this.errMessage = commonErrorMessage.message.substring(0)
      }
      if(this.errMessage && this.errMessage !== '') {
        this.formControl.addValidators(errValidator);
      }
      this.formControl.updateValueAndValidity();
      this.formResponse.emit(this.formControl.value)
    }
  }