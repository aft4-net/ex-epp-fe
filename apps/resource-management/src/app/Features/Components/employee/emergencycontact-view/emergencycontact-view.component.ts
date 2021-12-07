import { Component, OnInit } from '@angular/core';

import { AddEmergencycontactComponent } from '../add-emergencycontact/add-emergencycontact.component';
import { Data } from '@angular/router';
import { EmergencyContacts } from '../../../Models/emergencycontact';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exec-epp-emergencycontact-view',
  templateUrl: './emergencycontact-view.component.html',
  styleUrls: ['./emergencycontact-view.component.scss'],
})
export class EmergencycontactViewComponent implements OnInit {
  footer = null;
  isVisible = false;
  isConfirmLoading = false;
  listOfData: readonly EmergencyContacts[] = [];
  i = 0;
  editId: string | null = null;

  constructor(
    private modalService: NzModalService,
    public form: FormGenerator
  ) {}

  addemergencycontact(): void {
    this.isVisible = true;

    // this.modalService.create({
    //   nzTitle: 'Add Emergency Contacts',
    //   nzContent: AddEmergencycontactComponent
    // });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }


  add(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }



  startEdit(id: string): void {
    this.editId = id;
  }

  exitModal() {
    this.isVisible = false;
  }

  resetForm(): void {
    this.form.addressForm.reset();
    this.form.emergencyContact.reset();
  }
  showDeleteConfirm(id: string): void {
    this.listOfData = this.listOfData.filter((d) => d.guid !== id);
    this.modalService.confirm({
      nzTitle: 'Are you sure, you want to cancel this contact?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,

      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  ngOnInit(): void {}
}
