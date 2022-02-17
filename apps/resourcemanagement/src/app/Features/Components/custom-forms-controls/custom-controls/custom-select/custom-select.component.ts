import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NzSelectModeType } from "ng-zorro-antd/select";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { commonErrorMessage } from "../../shared/custom.validators";

@Component({
    selector: 'exec-epp-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss']
  })
export class CustomSelectComponent implements OnInit {

    @Input() list$: Observable<SelectOptionModel[]> = of([])
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    @Input() disabled = false;

    @Output() formResponse = new EventEmitter<any>()

    errMessage = ''

    constructor() {
    }

    ngOnInit(): void {
      if(this.disabled) {
        this.myControl.disable({onlySelf: true});
      }
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
      this.formResponse.emit(this.myControl.value)
    }

}