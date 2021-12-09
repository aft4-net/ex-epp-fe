import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../Models/device-detail/category';
import { DeviceClassification } from '../../../Models/device-detail/deviceclassification';
import { DeviceDetail } from '../../../Models/device-detail/devicedetail';
import { SubCategory } from '../../../Models/device-detail/subcategory';
import { CategoryService } from '../../../Services/device-detail/category.service';
import { DeviceClassificationService } from '../../../Services/device-detail/device-classification.service';
import { DeviceDetailService } from '../../../Services/device-detail/device-detail.service';
import { SubcategoryService } from '../../../Services/device-detail/subcategory.service';

@Component({
  selector: 'exec-epp-add-edit-device-detail',
  templateUrl: './add-edit-device-detail.component.html',
  styleUrls: ['./add-edit-device-detail.component.scss']
})
export class AddEditDeviceDetailComponent implements OnInit {
  isWorking!: boolean;
  warranty!: boolean;
  deviceDetailForm!: FormGroup;
  deviceDetail: DeviceDetail = {} as DeviceDetail;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  deviceClassifications: DeviceClassification[] = [];
  BusinessUnit!: string;
  IsWorking!: boolean;
  
  constructor(private fb: FormBuilder, private deviceDetailService: DeviceDetailService,
        private categoryService: CategoryService,
        private subCategoryService: SubcategoryService,
        private deviceClassificationService: DeviceClassificationService,
        private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createDeviceDetailForm();
    this.categoryService.loadCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.subCategoryService.loadSubCategories().subscribe((subCategories: SubCategory[]) => {
      this.subCategories = subCategories;
    });
    this.deviceClassificationService.loadDeviceClassifications().subscribe((deviceClassifications: DeviceClassification[]) => {
      this.deviceClassifications = deviceClassifications;
    });
  }

  createDeviceDetailForm() {
    this.deviceDetailForm = this.fb.group({
      CategoryGuid: [null, Validators.required],
      SubCategoryGuid: [null, Validators.required],
      CompanyDeviceCode: [null, Validators.required],
      DeviceName: [null, Validators.required],
      BusinessUnit: [null, Validators.required],
      IsWorking: [null, Validators.required],
      AllocateTo: [null],
      DeviceClassificationGuid: [null, Validators.required],
      PurchaseDate: [null, Validators.required],
      Purchaser: [null],
      InvoiceNumber: [null],
      Manufacturer: [null, Validators.required],
      SerialNumber: [null, Validators.required],
      Warranty: [null, Validators.required],
      WarrantyEndDate: [null],
      Notes: [null, Validators.required]
    })
  }

  submitForm() {
    console.log("submit form called");
    console.log(this.deviceDetailForm.value);
    if (this.deviceDetailForm.valid) {
      this.deviceDetailService.addDeviceDetail(this.deviceDetailForm.value).subscribe((response)=>{
        console.log(response);
        this.toastr.success("Successfully Added", "Device Detail")
      });
    } else {
      Object.values(this.deviceDetailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.toastr.error("Error", "Form is not valid");
    }
  }

  onCategoryChange(event: any) {
    console.log(event);
  }

  onIsWorkingModelChange(value: string) {
    if(value === "Yes") {
      this.isWorking = true;
    } else {
      this.isWorking = false;
      this.deviceDetailForm.patchValue({AllocateTo: null});
    }
  }

  onWarrantyModelChange(value: string) {
    if (value === "Yes") {
      this.warranty = true;
    } else {
      this.warranty = false;
      this.deviceDetailForm.patchValue({WarrantyEndDate: null});
    }
  }

  resetForm() {
    console.log("reset form called");
    this.deviceDetailForm.reset;
  }

}
