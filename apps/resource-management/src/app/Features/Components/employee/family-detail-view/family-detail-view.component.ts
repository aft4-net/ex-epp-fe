import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';

@Component({
  selector: 'exec-epp-family-detail-view',
  templateUrl: './family-detail-view.component.html',
  styleUrls: ['./family-detail-view.component.scss']
})
export class FamilyDetailViewComponent implements OnInit {

  
  isVisible = false;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();


  i = 0;
  editId: string | null = null;
  


  constructor(private modalService: NzModalService) {}

 
  addfamilies(): void {
    this.modalService.create({
      nzTitle: 'Add Family Details',
      nzContent: FamilyDetailComponent
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
    this.listOfData = new Array(1).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King `,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: index % 2 === 0,
    }));
  }


 
  startEdit(id: string): void {
    this.editId = id;
    this.isVisible = true;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King `,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }




  
  showModal(): void {
    this.isVisible = true;
  }


 
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancel'
    });
  }
}
