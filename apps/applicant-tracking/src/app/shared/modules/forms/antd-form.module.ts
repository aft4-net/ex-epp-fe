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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import {
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
const icons: any[] = [
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline
];

@NgModule({
  declarations: [],
  imports: [CommonModule, NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule.forRoot(icons),NzModalModule,NzMessageModule, NzUploadModule, NzDropDownModule, NzSelectModule, NzAvatarModule, NzNotificationModule, NzTableModule,NzDividerModule,NzCheckboxModule, NzDatePickerModule],
  exports: [NzLayoutModule, NzButtonModule, NzMenuModule, NzFormModule, NzInputModule, NzCardModule, NzIconModule,NzGridModule,NzModalModule, NzMessageModule, NzUploadModule, NzDropDownModule, NzSelectModule, NzAvatarModule, NzNotificationModule, NzTableModule, NzDividerModule,NzCheckboxModule, NzDatePickerModule],
})
export class AntdFormModule {}
