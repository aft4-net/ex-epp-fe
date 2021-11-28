import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AddressNewComponent } from '../address-new/address-new.component';

@Component({
  selector: 'exec-epp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalService: NzModalService) {}

  showModal1(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: AddressNewComponent
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
  }



}
