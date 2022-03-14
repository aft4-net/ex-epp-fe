import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DemoNgZorroAntdModule } from "libs/ng-zoro/ng-zorro-antd.module";
import { UserDashboardRoutingModule } from "./user-dashboard-routing.module";
import { UserDashboardComponent } from "./user-dashboard.component";

@NgModule({
    declarations:[UserDashboardComponent],
    imports:[
        ReactiveFormsModule,
        CommonModule,
        DemoNgZorroAntdModule,
        UserDashboardRoutingModule
        
    ]
})
export class UserDashboardModule{

}