import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
<<<<<<< HEAD:apps/usermanagement/src/app/shared/modules/templates/page-template.module.ts
// import { SecondaryHeaderComponent } from '../../../components/secondary-header/secondary-header.component';
=======
>>>>>>> origin:apps/user-management/src/app/shared/modules/templates/page-template.module.ts
import { FooterComponent } from '../../../components/footer/footer.component';
import { PrimaryPageTemplateComponent } from '../../components/page-view-templates/primary-template/primary-page-template.component';
import { SecondaryPageTemplateComponent } from '../../components/page-view-templates/secondary-template/secondary-page-template.component';
import { AntdFormModule } from '../forms/antd-form.module';
import { CustomFormModule } from '../forms/custom-form.module';
import { SiderComponent } from '../../../components/application/sider/sider.component';

@NgModule({
  declarations: [
    HeaderComponent,
<<<<<<< HEAD:apps/usermanagement/src/app/shared/modules/templates/page-template.module.ts
    // SecondaryHeaderComponent,
=======
>>>>>>> origin:apps/user-management/src/app/shared/modules/templates/page-template.module.ts
    FooterComponent,
    SiderComponent, 
    PrimaryPageTemplateComponent,
    SecondaryPageTemplateComponent, 
  ],
  imports: [BrowserModule, RouterModule, AntdFormModule, CustomFormModule],
  exports: [PrimaryPageTemplateComponent, SecondaryPageTemplateComponent],
})
export class PageTemplateModule {} 