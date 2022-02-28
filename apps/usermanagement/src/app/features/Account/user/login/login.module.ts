import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "apps/usermanagement/src/app/shared/modules/shared.module";
import { DemoNgZorroAntdModule } from "libs/ng-zoro/ng-zorro-antd.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
    imports: [
      LoginRoutingModule,
      DemoNgZorroAntdModule,
      SharedModule,
      ReactiveFormsModule
    ],
    declarations: [LoginComponent]
  })
  export class LoginModule { }