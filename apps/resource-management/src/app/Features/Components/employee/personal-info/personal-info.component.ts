import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AddMultiComponent } from './add-multi/add-multi.component';
import { Employee } from '../../../Models/Employee';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { HttpClient } from '@angular/common/http';
import { LocationPhoneService } from '../../../Services/address/location-phone.service';
import { Nationality } from '../../../Models/Nationality';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'exec-epp-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private _locationPhoneService: LocationPhoneService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {}
}
