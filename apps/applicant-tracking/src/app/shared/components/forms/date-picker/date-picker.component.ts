import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'exec-epp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() show:NzCalendarModule = 'default';
  @Input() focusout: boolean = false;
  @Input() displayError: boolean = false;
  @Input() type = 'text';
  @Input() name: string = '';
  @Input() isRequired: boolean = false;
  @Input() label: string | any = null;
  @Input() placeholder: string = '';
  @Input() errorMsg: string = '';
  @Input() suffixIcon: any;
  @Input() prefixIcon: any;
  @Input() fcn: string = '';
  @Input() form: any;
  @Input() maxLength: number = 1000;
  @Input() showErrorIcon = true;
  @Input() disablePaste = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  onClicked(e:any){
    this.onClick.emit(e);
  }
}