import { Component, Input, OnInit } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Input() type:NzButtonType = 'default';
  constructor() { }

  ngOnInit(): void {
  }

}
