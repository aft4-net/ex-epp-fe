import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Address } from '../../../Models/address.model';
import { AddressNewComponent } from '../address-new/address-new.component';
import { Data } from '@angular/router';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exec-epp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss'],
})
export class AddressViewComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;

  editId: string | null = null;
  listOfaddress: Address[] = [];

  @ViewChild('drawerTemplate')
  drawerTemplate: TemplateRef<{
      $implicit: { value: string; list: []; };
      drawerRef: NzDrawerRef<any>;
    }> | undefined;
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator
  ) {
    this.form.addressForm;
  }

  addaddress(): void {
    this.form.generateAddressForm();
    this.isVisible = true;
    // this.modalService.create({
    //   nzTitle: 'Add Addresses',
    //   nzContent: AddressNewComponent
    // });
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  startEdit(id: string): void {
    this.editId = id;
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

  showDeleteConfirm(id: string): void {
    this.listOfaddress = this.listOfaddress.filter((d) => d.Guid !== id);
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

  resetForm(): void {
    this.form.addressForm.reset();
  }

  add(): void {
    if (this.form.addressForm.valid) {
      // this.isVisible = false
      const address =this.form.getModelAddressDetails() as Address;
      this.listOfaddress = [...this.listOfaddress, address];
      this.isVisible=false
    }
  
  }

  ngOnInit(): void {}
}
