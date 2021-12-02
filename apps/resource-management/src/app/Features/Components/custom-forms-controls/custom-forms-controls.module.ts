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
import { CustomFullNameComponent } from "./custom-controls/custom-full-name/custom-full-name.component";
import { CustomTextBoxComponent } from "./custom-controls/custom-text-box/custom-text-box.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    CustomTextBoxComponent,
    CustomFullNameComponent
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
    CustomFullNameComponent
  ]
})
export class CustomFormsControlsModule {}
