import { Component, OnInit } from '@angular/core';

import { Data } from '@angular/router';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FamilyDetails } from '../../../Models/FamilyDetails';
import { NzModalService } from 'ng-zorro-antd/modal';
<<<<<<< HEAD
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
=======
import { FamilyDetails } from '../../../Models/FamilyDetails';
>>>>>>> resource-management

@Component({
  selector: 'exec-epp-family-detail-view',
  templateUrl: './family-detail-view.component.html',
  styleUrls: ['./family-detail-view.component.scss'],
})
export class FamilyDetailViewComponent {
  isVisible = false;
  footer = null;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  indeterminate = false;
<<<<<<< HEAD
  listOfFamilies: readonly FamilyDetail[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  familyDetail!:FamilyDetails;
  editId: string | null = null;
=======
  listOfFamilies: FamilyDetails[] = [];

  editId: number | null = null;
>>>>>>> resource-management

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

<<<<<<< HEAD




  startEdit(id: string): void {
=======
  startEdit(id: number): void {
>>>>>>> resource-management
    this.editId = id;
    this.isVisible = true;

  //this.form.generateFamilyDetailForm();

  }

  stopEdit(): void {
  }

<<<<<<< HEAD



  showConfirm(guid: string): void {
    this.listOfFamilies = this.listOfFamilies.filter((d) => d.Guid !== guid);
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
    });
=======
  showConfirm(guid: number): void {
    // this.listOfFamilies = this.listOfFamilies.filter((d) => d.FullName !== guid);
    // this.modalService.confirm({
    //   nzTitle: 'Confirm',
    //   nzContent: 'Are you sure you want to delete?',
    //   nzOkText: 'OK',
    //   nzCancelText: 'Cancel',
    // });
>>>>>>> resource-management
  }

  exitModal() {
    this.isVisible = false;
  }

  resetForm(): void {
    this.form.familyDetail.reset();
  }

  add(): void {
    const families = this.form.getModelFamilyDetails() as FamilyDetails;
    this.listOfFamilies = [...this.listOfFamilies, families];
    console.log('list:', this.listOfFamilies);
   this.isVisible=false;
  }


}
