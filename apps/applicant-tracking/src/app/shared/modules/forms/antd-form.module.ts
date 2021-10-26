import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EyeInvisibleOutline,
  LockOutline
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
const icons: any[] = [
  EyeInvisibleOutline,
  LockOutline
];

@NgModule({
  declarations: [],
  imports: [CommonModule, NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule.forRoot(icons),],
  exports: [NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule,NzGridModule],
})
export class AntdFormModule {}
