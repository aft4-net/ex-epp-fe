import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from '../../components/forms/input/input.component';
import { ButtonComponent } from '../../components/forms/button/button.component';
import { AvatarComponent } from '../../components/forms/avatar/avatar.component';
import { SelectComponent } from '../../components/forms/select/select.component';
import { TabComponent } from '../../components/forms/tab/tab.component';
import { AntdFormModule } from './antd-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    AvatarComponent,
    SelectComponent,
    TabComponent 
  ],
  imports: [CommonModule, AntdFormModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    AvatarComponent,
    SelectComponent,
    TabComponent
  ],
})
export class CustomFormModule {}
