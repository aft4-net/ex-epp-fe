import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label: string | any = null;
  @Input() placeholder = '';
  @Input() errorMsg = '';
  @Input() selectedValue: any;
  @Input() list: any[] = [];
  @Input() multiple = false;
  @Input() custom = false;
  @Input() maxNumber = 20;

  @Output() actionChange: EventEmitter<any> = new EventEmitter<any>();

  optionList: any = [];

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.dial_code === o2.dial_code && o1.name === o2.name : o1 === o2;

  log(value: { name: string; dial_code: string; code: number }): void {
    this.actionChange.emit(value);
  }
}
