import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { GroupsetComponent } from '../../features/components/groupset/groupset.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
   // GroupsetComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserManagementModule { }
