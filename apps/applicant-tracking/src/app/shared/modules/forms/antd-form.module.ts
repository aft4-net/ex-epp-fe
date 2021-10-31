import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';

import {
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
const icons: any[] = [
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline
];

@NgModule({
  declarations: [],
  imports: [CommonModule, NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule.forRoot(icons),NzModalModule,NzMessageModule, NzUploadModule, NzDropDownModule, NzSelectModule, NzAvatarModule],
  exports: [NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule,NzGridModule,NzModalModule, NzMessageModule, NzUploadModule, NzDropDownModule, NzSelectModule, NzAvatarModule],
})
export class AntdFormModule {}
