import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from '../../components/forms/input/input.component';
import { ButtonComponent } from '../../components/forms/button/button.component';
import { PhoneInputComponent } from '../../components/forms/phone-input/phone-input.component';
import { CountrySelectorComponent } from '../../components/forms/country-selector/country-selector.component';

import { AntdFormModule } from './antd-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, ButtonComponent, PhoneInputComponent, CountrySelectorComponent],
  imports: [CommonModule, AntdFormModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ButtonComponent, PhoneInputComponent, CountrySelectorComponent],
})
export class CustomFormModule {}
