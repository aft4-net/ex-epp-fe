import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";
import { DemoNgZorroAntdModule } from "../../../ng-zorro-antd.module";
import { PersonalDetailGroupComponent } from "./custom-control-groups/personal-details-group/personal-details-group.component";
import { CustomDatepickerComponent } from "./custom-controls/custom-datepicker/custom-datepicker.component";
import { CustomEmployeeDateofBirthComponent } from "./custom-controls/custom-employee-date-of-birth/custom-employee-date-of-birth.component";
import { CustomEmployeeIdNumberComponent } from "./custom-controls/custom-employee-id-number/custom-employee-id-number.component";
import { CustomFullNameComponent } from "./custom-controls/custom-full-name/custom-full-name.component";
import { CustomGenderComponent } from "./custom-controls/custom-gender/custom-gender.component";
import { CustomSelectComponent } from "./custom-controls/custom-select/custom-select.component";
import { CustomTextBoxComponent } from "./custom-controls/custom-text-box/custom-text-box.component";
import { TestFormComponent } from "./test-form/test-form.component";

registerLocaleData(en);

@NgModule({
    declarations: [
        CustomTextBoxComponent,
        CustomSelectComponent,
        CustomDatepickerComponent,
        CustomFullNameComponent,
        CustomEmployeeIdNumberComponent,
        CustomGenderComponent,
        CustomEmployeeDateofBirthComponent,

        PersonalDetailGroupComponent,
        TestFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFileUploaderModule,
        DemoNgZorroAntdModule
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    exports: [
        CustomTextBoxComponent,
        CustomSelectComponent,
        CustomDatepickerComponent,
        CustomFullNameComponent,
        CustomEmployeeIdNumberComponent,
        CustomEmployeeDateofBirthComponent,
        CustomGenderComponent,

        PersonalDetailGroupComponent,
        TestFormComponent
    ]
})
export class CustomFormsControlsModule { }
