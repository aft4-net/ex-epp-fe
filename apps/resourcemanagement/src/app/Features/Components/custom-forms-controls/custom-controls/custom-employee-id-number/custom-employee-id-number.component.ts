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
  selector: 'exec-epp-custom-employee-id-number',
  templateUrl: './custom-employee-id-number.component.html',
  styleUrls: ['../../excel-styles/excel-single-control.style.scss']
})
export class CustomEmployeeIdNumberComponent implements OnInit {

  @Input() label = 'Employee ID'
  @Input() labelConfig = defaultFormLabellParameter
  @Input() prefixControlConfig = defaultFormControlParameter
  @Input() controlConfig = defaultFormControlParameter
  @Input() formControl: FormControl = new FormControl()
  @Input() required = true
  @Input() formDescription: FormControlResponseModel = {} as FormControlResponseModel

  @Output() formResponse = new EventEmitter()

  errMessage = ''
  isEdit = false;
  minLengthofIdNumber = 3;
  maxLengthofIdNumber = 0;

  constructor(
    private readonly _employeeService: EmployeeService
  ) {
    //this.isEdit = this._employeeService.isEdit;
  }

  ngOnInit(): void {
  }

  onChange() {
    this.formControl.removeValidators(errValidator);
    this.errMessage = '';
    const value = this.formControl.value;
    if (value) {
      const idNumber = this.formControl.value as string;
      if (idNumber.length < this.minLengthofIdNumber) {
        this.errMessage = `The minimum length of employee ID number should be ${this.minLengthofIdNumber}!`;
      } else if (this.maxLengthofIdNumber > 0 && idNumber.length > this.maxLengthofIdNumber) {
        this.errMessage = `The maximum length of employee ID number should be ${this.maxLengthofIdNumber}!`;
      } else {
        this._employeeService.checkIdNumber(idNumber)
          .subscribe((err: boolean) => {
            if (!err) {
              this.errMessage = 'The employee ID number should be unique!';
              this.formControl.addValidators(errValidator);
              this.formControl.updateValueAndValidity();
            }
          });
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