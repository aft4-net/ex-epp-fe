<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddClientStateService, ClientContactCreate } from '../../../core';
import { CountryCodeService } from '../../../core/services/country-code.service';
import { NzModalService } from 'ng-zorro-antd/modal';
=======
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { AddClientStateService } from '../../../core';
import { CountryCode } from '../../../core/models/get/country-code';
import { CountryCodeService } from '../../../core/services/country-code.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { countryPhoneCodes } from '../../../shared/Data/dummy';
>>>>>>> Client-Management

@Component({
  selector: 'exec-epp-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit {
  isVisible=false;
 countries: string[] = [];
  footer = null;

  listofCodes: { value: string; label: string }[] = [];

  listOfStates: string[] = [];

  isEthiopia = false;

  buttonClicked = 0;


  addContactForm!: FormGroup;
<<<<<<< HEAD
  listData = [] as ClientContactCreate[];
=======
  listData:any=[];
>>>>>>> Client-Management
  isModalVisible = false;
  total = 10;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;

<<<<<<< HEAD
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private _countryService: CountryCodeService,
    private addClientStateService: AddClientStateService
  ) {
    this.listofCodes = this._countryService.getPhonePrefices();
  }
=======



  constructor(private fb: FormBuilder,private modal: NzModalService, private _countryService:CountryCodeService) {
    this.listofCodes=this._countryService.getPhonePrefices();

   }
>>>>>>> Client-Management

  ngOnInit(): void {
    this.listData = [];
    this.addContactForm = this.fb.group({
<<<<<<< HEAD
      ContactPersonName: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      PhoneNumberPrefix: ['+251', [Validators.required]],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(320),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
=======
      contactName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      phoneNumberPrefix:['+251',[Validators.required]],
      emailAdress:['',[Validators.required,Validators.email,Validators.maxLength(320),Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
>>>>>>> Client-Management
    });
  }
  showModal(): void {
    this.isVisible = true;
  }
  submitForm(): void {}
  handleOk(): void {
<<<<<<< HEAD
    if (this.addContactForm.valid) {
      // this.listData.push(this.addContactForm.value);
      this.listData = [...this.listData, this.addContactForm.value];
      this.addClientStateService.updateClientContacts(this.listData);
=======


    if(this.addContactForm.valid)
    {
      // this.listData.push(this.addContactForm.value);
      this.listData =[

        ...this.listData,

        this.addContactForm.value

      ]
>>>>>>> Client-Management
      this.addContactForm.reset();
      this.isVisible = false;
    } else {
      Object.values(this.addContactForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  exitModal() {
    this.isVisible = false;
    this.addContactForm.reset();
  }
  handleClear(): void {
    this.addContactForm.reset();
  }
<<<<<<< HEAD
  removeItem(element: any) {
    this.listData.forEach((value: any, index: any) => {
      if (value == element) {
        this.listData.splice(index, 1);
        this.addClientStateService.updateClientContacts(this.listData);
      }
=======
  removeItem(element:any)
  {
    this.listData.forEach((value:any,index:any) => {
      if(value==element)
      this.listData.splice(index,1);

>>>>>>> Client-Management
    });
  }
  showDeleteConfirm(element: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure, you want to cancel this contact?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.removeItem(element);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteBackEnd(element: any) {}
}
