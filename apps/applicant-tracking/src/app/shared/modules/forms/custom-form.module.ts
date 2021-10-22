import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from '../../components/forms/input/input.component';
import { ButtonComponent } from '../../components/forms/button/button.component';
import { AntdFormModule } from './antd-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, ButtonComponent],
  imports: [CommonModule, AntdFormModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ButtonComponent],
})
export class CustomFormModule {}
