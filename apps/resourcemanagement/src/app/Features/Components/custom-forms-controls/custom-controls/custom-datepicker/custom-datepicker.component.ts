import { formatDate } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../shared/custom.validators";

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
    @Input() startingDate: Date = new Date(1900, 1, 1)
    @Input() endingDate: Date = new Date(2100, 1, 1)
    @Input() required = true
    @Input() Birthday = true
    defaultValue: Date = this.startingDate;

    @Output() formResponse = new EventEmitter()

    
    errMessage = ''
    currentDate = new Date();
    wanteddateFormat ="";
    todaysYear = 0;
    
    constructor() {
    }

    ngOnInit(): void {
        this.defaultValue = this.endingDate.getTime() < Date.now()? this.endingDate: this.startingDate.getTime() > Date.now()? this.startingDate : new Date(Date.now());
        console.log("qaQA");
        this.wanteddateFormat = (formatDate(this.currentDate,'M/dd/yyyy','en-US'));
        this.todaysYear = parseInt(this.wanteddateFormat.substring(this.wanteddateFormat.lastIndexOf('/')+1)); 
       console.log(this.todaysYear - 18);
       if(this.Birthday){
       this.currentDate = new Date("01/01/2004");
       }
    }

    disabledDate = (startValue: Date): boolean => {
        const validStart = new Date(this.startingDate.getFullYear(), this.startingDate.getMonth(), this.startingDate.getDate())
        const validEnd = new Date(this.endingDate.getFullYear(), this.endingDate.getMonth(), this.endingDate.getDate(), 23, 59, 59)
       // const validEnd = new Date(this.todaysYear-18, this.endingDate.getMonth(), this.endingDate.getDate(), 23, 59, 59)
        return (
            (startValue.getTime() < validStart.getTime())
            || (startValue.getTime() > validEnd.getTime())
        )
    }

    onChange() {
        this.errMessage = commonErrorMessage.message.substring(0)
        this.formResponse.emit()
    }

}