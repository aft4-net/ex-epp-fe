import { JsonPipe } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'timesheet';

  constructor() {
  }
}
