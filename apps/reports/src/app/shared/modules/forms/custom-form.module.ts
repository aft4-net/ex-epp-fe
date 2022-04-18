import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from '../../components/forms/input/input.component';
import { ButtonComponent } from '../../components/forms/button/button.component';
import { DatePickerComponent } from '../../components/forms/date-picker/date-picker.component';
import { SelectComponent } from '../../components/forms/select/select.component';
import { CheckBoxComponent } from '../../components/forms/checkbox/checkbox.component';
import { AntdFormModule } from './antd-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    DatePickerComponent,
    SelectComponent,
    CheckBoxComponent,
  ],
  imports: [CommonModule, AntdFormModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    DatePickerComponent,
    SelectComponent,
    CheckBoxComponent
  ],
})
export class CustomFormModule {}
