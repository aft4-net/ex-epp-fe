import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'uuid';
import { Category } from '../../Models/device-detail/category';
import { DeviceClassification } from '../../Models/device-detail/deviceclassification';
import { DeviceDetail } from '../../Models/device-detail/devicedetail';
import { SubCategory } from '../../Models/device-detail/subcategory';
import { CategoryService } from '../../Services/device-detail/category.service';
import { DeviceClassificationService } from '../../Services/device-detail/device-classification.service';
import { DeviceDetailService } from '../../Services/device-detail/device-detail.service';
import { SubcategoryService } from '../../Services/device-detail/subcategory.service';

@Component({
  selector: 'exec-epp-add-device-detail',
  templateUrl: './add-device-detail.component.html',
  styleUrls: ['./add-device-detail.component.scss']
})
export class AddDeviceDetailComponent implements OnInit {
  deviceDetailForm!: FormGroup;
  deviceDetail: DeviceDetail = {} as DeviceDetail;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  deviceClassifications: DeviceClassification[] = [];
  
  constructor(private fb: FormBuilder, private deviceDetailService: DeviceDetailService,
        private categoryService: CategoryService,
        private subCategoryService: SubcategoryService,
        private deviceClassificationService: DeviceClassificationService) { }

  ngOnInit(): void {
    this.createDeviceDetailForm();
    this.categoryService.loadCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
    this.subCategoryService.loadSubCategories().subscribe((subCategories: SubCategory[]) => {
      this.subCategories = subCategories
      console.log(this.subCategories);
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
      DeviceClassificationGuid: [null, Validators.required],
      PurchaseDate: [null, Validators.required],
      Purchaser: [null, Validators.required],
      InvoiceNumber: [null, Validators.required],
      Manufacturer: [null, Validators.required],
      SerialNumber: [null, Validators.required],
      Warranty: [null, Validators.required],
      WarrantyEndDate: [null, Validators.required],
      Notes: [null, Validators.required]
    })
  }

  submitForm() {
    if (this.deviceDetailForm.valid) {
      this.deviceDetailService.addDeviceDetail(this.deviceDetailForm.value).subscribe((response)=>{
        console.log(response);
      });
    }
  }

}
