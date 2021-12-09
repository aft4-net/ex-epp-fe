import { Component, OnInit } from '@angular/core';

import { Data } from '@angular/router';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FamilyDetails } from '../../../Models/FamilyDetails';

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
  listOfFamilies: FamilyDetails[] = [];

  editId: number | null = null;

  constructor(
    private modalService: NzModalService,
    public form: FormGenerator
  ) {}

  addfamilies(): void {
    this.isVisible = true;
    // this.modalService.create({
    //   nzTitle: 'Add Family Details',
    //   nzFooter:null,
    //   nzContent: FamilyDetailComponent
    // });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  startEdit(id: number): void {
    this.editId = id;
    this.isVisible = true;
  }

  stopEdit(): void {
    this.editId = null;
  }

  showConfirm(guid: number): void {
    // this.listOfFamilies = this.listOfFamilies.filter((d) => d.FullName !== guid);
    // this.modalService.confirm({
    //   nzTitle: 'Confirm',
    //   nzContent: 'Are you sure you want to delete?',
    //   nzOkText: 'OK',
    //   nzCancelText: 'Cancel',
    // });
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

  ngOnInit(): void {

    this.listOfFamilies;
  }
}
