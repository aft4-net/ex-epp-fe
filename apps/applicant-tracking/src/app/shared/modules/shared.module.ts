import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AntdFormModule } from './forms/antd-form.module';
import { CustomFormModule } from './forms/custom-form.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
@NgModule({
  declarations: [],
  imports: [CommonModule, AntdFormModule, CustomFormModule,NzGridModule],
  exports: [AntdFormModule, CustomFormModule],
})
export class SharedModule {}
