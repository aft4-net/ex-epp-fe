import { Component, OnInit } from '@angular/core';

import { AddressNewComponent } from '../address-new/address-new.component';
import { Data } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { Address } from '../../../Models/address.model';


@Component({
  selector: 'exec-epp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss'],
})
export class AddressViewComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
   
  editId: string | null = null;
  listOfaddress: readonly Address[] = [];
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator
  ) {}

  addaddress(): void {
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
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 6000);
  }



  ngOnInit(): void {}
 
}
