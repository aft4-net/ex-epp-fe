import { NgModule } from '@angular/core';

import { SiderComponent } from '../../components/application/sider/sider.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD:apps/usermanagement/src/app/modules/userManagment/user.module.ts
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { HttpClientModule } from '@angular/common/http';
=======
import { MsalModule } from '@azure/msal-angular';
import{MsalService} from '@azure/msal-angular';
import{MSAL_INSTANCE} from '@azure/msal-angular';
>>>>>>> origin:apps/user-management/src/app/modules/userManagment/user.module.ts

import{IPublicClientApplication , PublicClientApplication} from '@azure/msal-browser'

export function MSALInstanceFactory(): IPublicClientApplication
{
  return new PublicClientApplication({
    auth:{
      clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'
    }
  })

}
@NgModule({
  declarations: [SiderComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,         
    SharedModule,
<<<<<<< HEAD:apps/usermanagement/src/app/modules/userManagment/user.module.ts
    DemoNgZorroAntdModule,
    HttpClientModule
  ]
=======
    MsalModule
  ],   
  providers:[ 
    {    
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService
]
  
>>>>>>> origin:apps/user-management/src/app/modules/userManagment/user.module.ts
})
export class ApplicationModule { }
