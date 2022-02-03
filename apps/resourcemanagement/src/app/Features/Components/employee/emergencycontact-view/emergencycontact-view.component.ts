import { Component, OnInit } from '@angular/core';
import { EmergencyContacts, IEmergencyContact } from '../../../Models/emergencycontact';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { Data } from '@angular/router';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NotificationBar } from 'apps/resourcemanagement/src/app/utils/feedbacks/notification';
import { PermissionListService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-emergencycontact-view',
  templateUrl: './emergencycontact-view.component.html',
  styleUrls: ['./emergencycontact-view.component.scss'],
})
export class EmergencycontactViewComponent implements OnInit {
  footer = null;
  canAddEmergencyContactDetail = false;
  isVisible = false;
  isConfirmLoading = false;
  listOfData: any[] = [];
  confirmModal?: NzModalRef;
  i = 0;
  editId: string | null = null;
  IsEdit = false;
  editAt = -10;
  emptyData = [];
  addbutton = 'Add';
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private _employeeService: EmployeeService,
    private notification: NotificationBar,
    private _permissionService: PermissionListService
  ) {
    if (_employeeService.employeeById) {
      this.form.allEmergencyContacts = _employeeService.employeeById
        .EmergencyContact
        ? _employeeService.employeeById.EmergencyContact
        : [];
    }
    this._employeeService.isdefault = false;
  }
  addemergencycontact(): void {
    this.isVisible = true;
    this.addbutton = 'Add';
    this.IsEdit = false;
    this.editAt = -10;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  add(): void {
    if (
      !this.form.emergencyContact.valid ||
      !this.form.emergencyAddress.valid
    ) {
      this.form.errorMessageforEmergencyContactDetails(
        this.form.emergencyContact,
        this.form.emergencyAddress
      );
      return;
    }
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
    const emergencyContact =
      this.form.getModelEmergencyContactDetails() as EmergencyContacts;

    if (!this.IsEdit) {
      this.form.allEmergencyContacts = [
        ...this.form.allEmergencyContacts,
        emergencyContact,
      ];
    } else {
      this.form.allEmergencyContacts[this.editAt] = emergencyContact;
      this.editAt = -10;
      this.IsEdit = false;
    }
    if (this.form.emergencyContact.valid) {
      this.isVisible = false;
      this.form.generateEmergencyContactForm();
    }
  }
  onCurrentPageDataChange(event: any) {}
  deleteRow(guid: string) {}

  startEdit(index: number): void {
    if (index >= 0) {
      this.addbutton = 'Update';
      this.IsEdit = true;
      this.editAt = index;
      this.isVisible = true;
      this.form.generateEmergencyContactForm(
        this.form.allEmergencyContacts[index]
      );
      console.log('this.form.allEmergencyContacts[index]');
      console.log(this.form.allEmergencyContacts[index]);
      console.log('this.form.allEmergencyContacts[index]');
    }
  }

  exitModal() {
    this.isVisible = false;
  }

  resetForm(): void {
    this.form.addressForm.reset();
    this.form.emergencyContact.reset();
  }
  showConfirm(index: number): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you want to delete this item?',
      nzContent: 'The action is not recoverable. ',
      nzOkType: 'primary',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkDanger: true,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if (index > -1) {
            this.form.allEmergencyContacts.splice(index, 1);
            if (this.form.allEmergencyContacts.length < 1) {
              this.form.allEmergencyContacts = this.emptyData;
            }
          }
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
        }).catch(() => console.log('Error.')),
    });
  }

  authorize(key:string){
    return this._permissionService.authorizedPerson(key)
  }

  ngOnInit(): void {
    this.notification.showNotification({
      type: 'success',
      content: '',
      duration: 1,
    });
  }
}
