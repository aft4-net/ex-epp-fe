import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'date-Select',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type:NzButtonType = 'default';
  @Input() show:NzCalendarModule = 'default';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  onClicked(e:any){
    this.onClick.emit(e);
  }
}