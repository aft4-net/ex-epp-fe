import { Component, OnInit } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'exec-epp-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  position: NzTabPosition = 'left';
  constructor() { }

  ngOnInit(): void {
  }

}
