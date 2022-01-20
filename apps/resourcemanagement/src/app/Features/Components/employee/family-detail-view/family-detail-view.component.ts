import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { Data } from '@angular/router';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { FamilyDetail } from '../../../Models/FamilyDetail/FamilyDetailModel';
import { FamilyDetailComponent } from '../family-detail/family-detail.component';
import { FamilyDetails } from '../../../Models/FamilyDetails';
import { FormGenerator } from '../../custom-forms-controls/form-generator.model';
import { NotificationBar } from 'apps/resourcemanagement/src/app/utils/feedbacks/notification';
import { PermissionListService } from 'libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-family-detail-view',
  templateUrl: './family-detail-view.component.html',
  styleUrls: ['./family-detail-view.component.scss'],
})
export class FamilyDetailViewComponent implements OnInit {
  isVisible = false;
  canAddFamilyDetail = false;
  footer = null;
  isConfirmLoading = false;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfFamilies: FamilyDetail[] = [];
  confirmModal?: NzModalRef;
  editId: string | null = null;
  IsEdit = false;
  editAt = -10;
  addButton = 'Add';
  emptyData = [];
  constructor(
    private modalService: NzModalService,
    public form: FormGenerator,
    private employeeService: EmployeeService,
    private notification: NotificationBar,
    private _permissionService: PermissionListService
  ) {}

  addfamilies(): void {
    this.isVisible = true;
    this.addButton = 'Add';
    this.IsEdit = false;
    this.editAt = -10;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  startEdit(index: number): void {
    if (index >= 0) {
      this.addButton = 'Update';
      this.IsEdit = true;
      this.editAt = index;
      this.isVisible = true;
      this.form.generateFamilyDetailForm(this.form.allFamilyDetails[index]);
    }
  }

  stopEdit(): void {
    this.editId = null;
  }

  showConfirm(index: number): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you want to delete this item?',
      nzContent: 'The action is not recoverable. ',
      nzOkType: 'primary',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkDanger: true,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if (index > -1) {
            this.form.allFamilyDetails.splice(index, 1);
            this.listOfFamilies = this.form.allFamilyDetails;
            if (this.form.allFamilyDetails.length < 1) {
              this.form.allFamilyDetails = this.emptyData;
            }
          }
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
        }).catch(() => console.log('Error.')),
    });
  }

  exitModal() {
    this.isVisible = false;
  }

  resetForm(): void {
    this.form.familyDetail.reset();
  }

  add(): void {
    const families = this.form.getModelFamilyDetails() as FamilyDetail[];
    if (!this.IsEdit) {
      this.form.allFamilyDetails = [...this.form.allFamilyDetails, families[0]];
    } else {
      this.form.allFamilyDetails[this.editAt] = families[0];
      this.editAt = -10;
      this.IsEdit = false;
    }
    if (this.form.familyDetail.valid) {
      this.isVisible = false;
      this.form.familyDetail.reset();
    }
  }

  authorize(key:string){
    return this._permissionService.authorizedPerson(key)
  }

  ngOnInit(): void {
    this.listOfFamilies;
    this.notification.showNotification({
      type: 'success',
      content: '',
      duration: 1,
    });

  }
}
