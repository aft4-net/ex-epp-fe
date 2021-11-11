import { Component, OnInit } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'exec-epp-Add-Project',
  templateUrl: './Add-Project.component.html',
  styleUrls: ['./Add-Project.component.css']
})
export class AddProjectComponent implements OnInit {
  position: NzTabPosition = 'left';
  projectDetail!: boolean;

  constructor() { }

  ngOnInit() {
    this.projectDetail = false;
  }

}
