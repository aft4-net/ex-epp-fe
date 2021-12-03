import { Component, OnInit } from '@angular/core';

import { AddressNewComponent } from '../address-new/address-new.component';
import { Data } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exec-epp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  footer = null;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();


  i = 0;
  editId: string | null = null;



  constructor(private modalService: NzModalService) {}


  addaddress(): void {

    this.isVisible = true;
    // this.modalService.create({
    //   nzTitle: 'Add Addresses',
    //   nzContent: AddressNewComponent
    // });
  }

  handleOk(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);

  }
  

  handleCancel(): void {
    this.isVisible = false;
  }



  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }



  ngOnInit(): void {
    this.listOfData = new Array(0).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0,
    }));
  }



  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }
//====================================


exitModal() {
  this.isVisible = false;
}


showDeleteConfirm(element: any): void {
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

//===============================================












}
