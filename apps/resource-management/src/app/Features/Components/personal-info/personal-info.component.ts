import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'exec-epp-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      personalEmail: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required]],
      fatherName: [null, [Validators.required]],
      grandFatherName: [null, [Validators.required]],
      phoneNumber: [null,[Validators.required]],
      dateofBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      phoneNumberPrefix:[null,[Validators.required]]

    });
  }




}
