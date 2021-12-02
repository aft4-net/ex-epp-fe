import { Component } from '@angular/core';

@Component({
  selector: 'app-create-job-requisition',
  templateUrl: './create-job-requisition.component.html',
  styleUrls: ['./create-job-requisition.component.css'],
})
export class CreateJobRequisitionComponent {
  tabs = [
    { name: 'Requisition Details', disabled: false, icon:'setting' },
    { name: 'Requirements', disabled: false, icon:'setting' },
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
