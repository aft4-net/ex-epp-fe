import { Component, OnInit } from '@angular/core';

import { Data } from '@angular/router';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-family-detail-view',
  templateUrl: './family-detail-view.component.html',
  styleUrls: ['./family-detail-view.component.scss'],
})
export class FamilyDetailViewComponent implements OnInit {
  isVisible = false;
  footer = null;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfFamilies: readonly FamilyDetail[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();

  editId: string | null = null;

  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private _employeeService: EmployeeService
  ) {
    if (_employeeService.employeeById) {
      this.listOfFamilies = _employeeService.employeeById.FamilyDetails
        ? _employeeService.employeeById.FamilyDetails
        : [];
    }
  }

  addfamilies(): void {
    this.isVisible = true;
    // this.modalService.create({
    //   nzTitle: 'Add Family Details',
    //   nzFooter:null,
    //   nzContent: FamilyDetailComponent
    // });
  }
  deleteRow(id: string): void {
    this.listOfFamilies = this.listOfFamilies.filter((d) => d.Guid !== id);
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
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }





  startEdit(id: string): void {
    this.editId = id;
    this.isVisible = true;
  }

  stopEdit(): void {
    this.editId = null;
  }




  showConfirm(guid: string): void {
    this.listOfFamilies = this.listOfFamilies.filter((d) => d.Guid !== guid);
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
    });
  }

  exitModal() {
    this.isVisible = false;
  }


  resetForm(): void {
    this.form.familyDetail.reset();
  }

  add(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 6000);
  }



  ngOnInit(): void {

  }

}
