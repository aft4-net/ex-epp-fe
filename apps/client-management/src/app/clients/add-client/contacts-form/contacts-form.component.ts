import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';
import { AddClientStateService, ClientContactCreate } from '../../../core';

@Component({
  selector: 'exec-epp-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent implements OnInit {


  @Input() isVisible: boolean;

  countries: string[] = []
  footer=null;

  listofCodes :{ value: string, label: string }[]=[];

  listOfStates: string[] = []

  isEthiopia = false;

  buttonClicked = 0

  addContactForm!: FormGroup;
  listData=[] as ClientContactCreate[];
isModalVisible = false;
isEditMode=false;
  total = 10;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  totalPage!:number;

  constructor(private fb: FormBuilder,private modal: NzModalService, private addClientStateService: AddClientStateService) {



 
  }

  ngOnInit(): void {



    this.listData=[];
    this.addContactForm = this.fb.group({
      ContactPersonName: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      Email:['',[Validators.required,Validators.email,Validators.maxLength(320)]]
    });
  }
  showModal(): void {
    this.isVisible = true;
  }
  submitForm(): void {

  }
  handleOk(): void {


    if(this.addContactForm.valid)
    {
      this.listData.push(this.addContactForm.value);
      this.addClientStateService.updateClientContacts(this.listData);
      this.addContactForm.reset();
      this.isVisible = false;
    }else {
      Object.values(this.addContactForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }


  }
exitModal()
{
  this.isVisible = false;
  this.addContactForm.reset();
}
  handleClear(): void {
    console.log('Button cancel clicked!');

    this.addContactForm.reset();
  }
  handleCancel(){
    this.isVisible=false;
    this.addContactForm.reset();
  }
  removeItem(element:any)
  {
    this.listData.forEach((value:any,index:any) => {
      if(value==element)
     {this.listData.splice(index,1);
      this.addClientStateService.updateClientContacts(this.listData);
     }
    });

  }
  showDeleteConfirm(element:any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure, you want to cancel this contact?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {


        this.removeItem(element)
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteBackEnd(element: any){

  }



}
