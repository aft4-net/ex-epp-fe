
import { NgModule } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzFormModule } from 'ng-zorro-antd/form';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@NgModule({
  exports: [
 
  

    NzButtonModule,
    NzBreadCrumbModule,
 
 

    NzFormModule,
 
    NzIconModule, 
    NzInputModule,
    NzLayoutModule,
    NzModalModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
  
    NzSpinModule,
    NzTableModule,
  
    NzToolTipModule,


  ]
})
export class DemoNgZorroAntdModule {

}