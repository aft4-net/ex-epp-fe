import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit {
  popoverVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onPlateClick() {
    console.log("project name palate clicked.")
  }

  showPopover() {
    //this.popoverVisible = true;
  }

  closePopover() {
    this.popoverVisible = false;
  }
}
