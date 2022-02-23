import { NgModule } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  exports: [
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzCollapseModule,
    NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzPopoverModule,
  ]
})
export class DemoNgZorroAntdModule {
}
