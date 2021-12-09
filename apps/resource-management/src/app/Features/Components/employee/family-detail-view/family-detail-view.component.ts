import { Component, OnInit } from '@angular/core';

import { Data } from '@angular/router';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FamilyDetails } from '../../../Models/FamilyDetails';
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
  listOfFamilies: FamilyDetail[] = [];

  editId: string | null = null;

  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private employeeService:EmployeeService
  ) {
    this.form.addressForm;
    if(employeeService.employeeById){

      this.listOfFamilies=employeeService.employeeById.FamilyDetails?
      employeeService.employeeById.FamilyDetails:[];
  }  }

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

  startEdit(id: string): void {
     this.editId = id;
    const familyDetail=this.employeeService.employeeById?.FamilyDetails?.filter(a=>a.Guid===id)
     if(familyDetail)
     {
      this.form.generateFamilyDetailForm(familyDetail[0]);
      this.isVisible=true;
    }
  }

  stopEdit(): void {
    this.editId = null;
  }

  showConfirm(guid: string): void {
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
    const families = this.form.getModelFamilyDetails() as FamilyDetail;
    this.listOfFamilies = [...this.listOfFamilies, families];
    console.log('list:', this.listOfFamilies);
   this.isVisible=false;
  }

  ngOnInit(): void {

    this.listOfFamilies;
  }
}
