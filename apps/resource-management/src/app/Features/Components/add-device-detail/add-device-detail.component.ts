import { Component, OnInit } from '@angular/core';
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

  deviceDetail: DeviceDetail = {} as DeviceDetail;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  deviceClassifications: DeviceClassification[] = [];
  
  constructor(private deviceDetailService: DeviceDetailService,
        private categoryService: CategoryService,
        private subCategoryService: SubcategoryService,
        private deviceClassificationService: DeviceClassificationService) { }

  ngOnInit(): void {
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

  submitForm() {
    console.log(this.deviceDetail);
    this.deviceDetailService.addDeviceDetail(this.deviceDetail).subscribe((response)=>{
      console.log(response);
    });
  }

}
