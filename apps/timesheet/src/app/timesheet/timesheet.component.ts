import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from './services/timesheet.service';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  drawerVisible = false;
  validateForm!: FormGroup;

  clients = [
    { id: 1, client: 'client one' },
    { id: 2, client: 'client two' },
    { id: 3, client: 'client three' },
  ];
  projects = [
    { id: 1, project: 'project one' },
    { id: 2, project: 'project two' },
    { id: 3, project: 'project three' },
  ];
  tasks = [
    { id: 1, task: 'task one' },
    { id: 2, task: 'task two' },
    { id: 3, task: 'task three' },
  ];

  formData = {
    timesheetDate: new Date(),
    client: '',
    project: '',
    task: '',
    hours: null,
    notes: '',
  };
  

  constructor(private fb: FormBuilder, private timesheetService:TimesheetService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null],
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      task: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
  }
  

  dateColumnClicked() {
    this.drawerVisible = true;
  }

  closeTimesheetDrawer() {
    this.drawerVisible = false;
  }
 
  resetForm(): void {
    this.validateForm.reset();
  }

  submitForm(): void {

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    try {
      let dataToSend = {
        timesheetDate: this.validateForm.value.fromDate !=null? this.validateForm.value.fromDate.toISOString().substring(0, 10) : null,
        client: this.validateForm.value.client,
        project: this.validateForm.value.project,
        task: this.validateForm.value.task,
        hour: this.validateForm.value.hour,
        note: this.validateForm.value.notes,
      };

      console.log('sssssssssssssssssssss');
      console.log(dataToSend);
     // this.timesheetService.addTimesheet(dataToSend);

    } catch (err) {
      console.error(err);
    }
  }

}
