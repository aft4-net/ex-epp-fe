import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { Address } from '../../../Models/address.model';
import { Data } from '@angular/router';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NotificationBar } from 'apps/resourcemanagement/src/app/utils/feedbacks/notification';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { PermissionListService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss'],
})
export class AddressViewComponent implements OnInit {
  isVisible = false;
  canAddAddressDetail = false;
  isConfirmLoading = false;
  confirmModal?: NzModalRef;
  editId: string | null = null;
  listOfaddress: Address[] = [];
  IsEdit = false;
  editAt = -10;
  addButton = 'Add';

  employeeAddress?: Address;
  emptyData = [];
  @ViewChild('drawerTemplate')
  drawerTemplate:
    | TemplateRef<{
        $implicit: { value: string; list: [] };
        drawerRef: NzDrawerRef<any>;
      }>
    | undefined;
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private readonly _formGenerator: FormGenerator,
    public employeeService: EmployeeService,
    private notification: NotificationBar,
    private _permissionService: PermissionListService
  ) {}
  addaddress(): void {
    this.form.generateAddressForm();
    this.isVisible = true;
    this.addButton = 'Add';
    this.IsEdit = false;
    this.editAt = -10;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  startEdit(index: number): void {
    if (index >= 0) {
      this.IsEdit = true;
      this.editAt = index;
      this.isVisible = true;
      this.addButton = 'Update';
      this._formGenerator.generateAddressForm(this.form.allAddresses[index]);
    }
  }

  stopEdit(): void {
    this.editId = null;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  exitModal() {
    this.isVisible = false;
  }

  showConfirm(index: number): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you want to delete Address ?',
      nzContent: 'The action is not recoverable. ',
      nzOkType: 'primary',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkDanger: true,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if (index > -1) {
            this.form.allAddresses.splice(index, 1);
            if (this.form.allAddresses.length < 1) {
              this.form.allAddresses = this.emptyData;
            }
          }
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
        }).catch(() => console.log('Error.')),
    });
  }

  resetForm(): void {
    this.form.addressForm.reset();
  }

  add(): void {
    if (this.form.addressForm.valid) {
      const address = this.form.getModelAddressDetails() as Address;
      if (!this.IsEdit) {
        this.form.allAddresses = [...this.form.allAddresses, address];
      } else {
        this.form.allAddresses[this.editAt] = address;
        this.editAt = -10;
        this.IsEdit = false;
        this.addButton = 'Add';
      }
      if (this.form.addressForm.valid) {
        this.isVisible = false;
        this.form.generateAddressForm();
      }
    }
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }

  ngOnInit(): void {
    this.notification.showNotification({
      type: '',
      content: '',
      duration: 1,
    });
  }
}
