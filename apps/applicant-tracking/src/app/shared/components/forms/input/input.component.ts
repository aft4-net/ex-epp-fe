import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],

})
export class InputComponent {
  disabled: boolean = false;
  @Input() type = 'text';
  @Input() name: string = '';
  @Input() isRequired: boolean = false;
  @Input() label: string | any = null;
  @Input() placeholder: string = '';
  @Input() errorMsg: string = '';
  @Input() suffixIcon: any;
  @Input() prefixIcon: any;
  @Input() fcn : string = "";
  @Input() form: any;
  constructor() {}

}
