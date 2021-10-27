import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import data from '../../../../../assets/files/CountryCodes.json';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
})
export class PhoneInputComponent implements OnInit {
  disabled: boolean = false;
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
  @Input() selectedValue: any;
  @Input() isValid: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {}
  optionList: any = [];
  ngOnInit(): void {
    this.optionList = data;
  }

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.dial_code === o2.dial_code && o1.name === o2.name : o1 === o2;

  log(value: { name: string; dial_code: string; code: number }): void {
    this.onChange.emit(value);
  }
}
