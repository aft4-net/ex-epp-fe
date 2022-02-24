import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [],
  imports: [
  RouterModule,
  NgZorroModule,
  CommonModule
  ],
  exports:[NgZorroModule]
 

})
export class SharedModule { }
