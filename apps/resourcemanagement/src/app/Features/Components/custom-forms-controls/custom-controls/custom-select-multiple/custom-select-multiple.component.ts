import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NzSelectModeType } from "ng-zorro-antd/select";
import { Observable, of } from "rxjs";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { commonErrorMessage } from "../../shared/custom.validators";

@Component({
    selector: 'exec-epp-custom-select-multiple',
    templateUrl: './custom-select-multiple.component.html',
    styleUrls: ['./custom-select-multiple.component.scss']
  })
export class CustomSelectMultipleComponent implements OnInit {

    @Input() list$: Observable<SelectOptionModel[]> = of([])
    @Input() label = 'Nationality(ies)'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() maxChoices = 2
    @Input() myControl: FormControl = new FormControl()
    @Input() required = false
    errMessage = ''

    isDown = true;

    constructor() {
    }

    ngOnInit(): void {
      this.list$.subscribe((val)=>{
        if(val == null){
          this.isDown =false;
        }
      });
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}
