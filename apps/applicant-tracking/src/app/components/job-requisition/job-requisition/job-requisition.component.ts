import { Component } from '@angular/core';

@Component({
  selector: 'app-job-requisition',
  templateUrl: './job-requisition.component.html',
  styleUrls: ['./job-requisition.component.css'],
})
export class JobRequisitionComponent {
  tabs = [
    { name: 'Job Requisition', disabled: false, icon:'setting' },
    { name: 'Job Description', disabled: false, icon:'setting' },
    { name: 'Master pool', disabled: false, icon:'setting' },
  ];
  links = [
    {
      name: 'Application Tracking',
      url: '/applicant-tracking',
      disabled: false,
    },
    { name: 'Job Requisition', url: '/job-requisition', disabled: false },
  ];
}
