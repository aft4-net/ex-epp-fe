import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail.component';
import { AddEditDeviceDetailComponent } from './add-edit-device-detail/add-edit-device-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: DeviceDetailComponent},
  {path: 'add', component: AddEditDeviceDetailComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DeviceDetailRoutingModule { }
