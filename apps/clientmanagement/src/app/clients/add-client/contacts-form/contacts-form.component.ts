import { AddClientStateService, ClientContactCreate, ClientContactService, UpdateClientContact, UpdateClientStateService } from '../../../core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CountryCodeService } from '../../../core/services/country-code.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit {
  isClearButtonActive=true;
  isDisabled = true;
  isVisible=false;
  countries: string[] = [];
  footer = null;
  modalTitle: string={} as string;

  listofCodes: { value: string; label: string }[] = [];

  listOfStates: string[] = [];

  isEthiopia = false;

  buttonClicked = 0;


  addContactForm!: FormGroup;
  listData = [] as ClientContactCreate[];
  isModalVisible = false;
  total = 10;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  IsEdit=false;
  editAt=-1;
  found=false;
  updateContacts:UpdateClientContact[]=[];
  // ContactPersonName= new FormControl('');

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private _countryService: CountryCodeService,
    private contactService: ClientContactService,
    private notification: NzNotificationService,
    private addClientStateService: AddClientStateService,

    private updateClientStateService: UpdateClientStateService,
  ) {
    this.listofCodes = this._countryService.getPhonePrefices();

  }

  ngOnInit(): void {

    this.updateContacts=this.updateClientStateService.UpdateClientData.ClientContacts;
    if(this.updateClientStateService.isEdit && this.updateClientStateService.UpdateClientData.ClientContacts!==null)

    {
      for(let i=0;i<this.updateClientStateService.UpdateClientData.ClientContacts.length;i++)
      {
        const clientContact={
          ContactPersonName:this.updateClientStateService.UpdateClientData.ClientContacts[i].ContactPersonName,
          Email:this.updateClientStateService.UpdateClientData.ClientContacts[i].Email,
          PhoneNumber:this.updateClientStateService.UpdateClientData.ClientContacts[i].PhoneNumber,
          PhoneNumberPrefix:this.updateClientStateService.UpdateClientData.ClientContacts[i].PhoneNumberPrefix,
        }
        this.listData.push(clientContact);

      }
    }
else{
    this.listData = this.addClientStateService.addClientData.ClientContacts;
}
this.addContactForm = this.fb.group({
ContactPersonName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(70)]],
PhoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(9), Validators.maxLength(15)]],
PhoneNumberPrefix:['+251',[Validators.required]],
Email:['',[Validators.required,Validators.email,Validators.maxLength(320),Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });

    this.addContactForm.valueChanges.subscribe(x => {
      if(this.addContactForm.value['ContactPersonName']!='' ||
      this.addContactForm.value['PhoneNumberPrefix']!='' ||
      this.addContactForm.value['PhoneNumber']!='' ||
      this.addContactForm.value['Email']!=''  ){

       this.isClearButtonActive=false;
      }
      else{
       this.isClearButtonActive=true;
      }

    });

  }
  showModal(): void {
    this.modalTitle = (this.IsEdit? 'Edit': 'Add') + ' Client Contact'
    this.isVisible = true;
  }
  submitForm(): void {
    if (this.addContactForm.valid) {
      if(this.IsEdit){
        this.listData[this.editAt]=this.addContactForm.value;
        if(this.updateClientStateService.isEdit)
        {
          this.updateContacts[this.editAt].ContactPersonName=this.addContactForm.controls
          .ContactPersonName.value;
          this.updateContacts[this.editAt].Email=this.addContactForm.controls
          .Email.value;
          this.updateContacts[this.editAt].PhoneNumber=this.addContactForm.controls
          .PhoneNumber.value;
          this.updateContacts[this.editAt].PhoneNumberPrefix=this.addContactForm.controls
          .PhoneNumberPrefix.value;

          this.updateClientStateService.updateClientContacts(this.updateContacts);
        }
        else
        {
          this.addClientStateService.updateClientContacts(this.listData);
        }
        this.IsEdit=false;
        this.editAt=-1;
        }
        else
        {
          if(this.updateClientStateService.isEdit)
          {
            this.listData = [...this.listData, this.addContactForm.value];
            this.updateContacts = [...this.updateContacts, this.addContactForm.value];
            this.updateClientStateService.updateClientContacts(this.updateContacts);
          }
          else{
            this.listData = [...this.listData, this.addContactForm.value];
            this.addClientStateService.updateClientContacts(this.listData);
          }

        }
      this.addContactForm.reset();
      this.isClearButtonActive=true;
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



  handleOk(): void {

    if (this.addContactForm.valid) {

      // this.listData.push(this.addContactForm.value);
      this.listData = [...this.listData, this.addContactForm.value];
      this.addClientStateService.updateClientContacts(this.listData);

      this.addContactForm.reset();
      this.isVisible = false;
      this.IsEdit=false
    } else {
      this.isDisabled = false;

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
    this.editAt=-1;
    this.IsEdit=false;
  }
  handleClear(): void {
    this.addContactForm.reset();
    this.editAt=-1;
    this.isClearButtonActive=true;
  }
  removeItem(element: any) {
    this.listData.forEach((value: any, index: any) => {
      if (value == element) {
        this.listData.splice(index, 1);
        this.updateContacts.splice(index, 1);
        if(this.updateClientStateService.isEdit)
        {
          this.updateClientStateService.updateClientContacts(this.updateContacts);
        }
        else
        {
          this.addClientStateService.updateClientContacts(this.listData);

        }
      }
    });
  }
  showDeleteConfirm(element: any,i:number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure, you want to cancel this contact?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if(this.updateClientStateService.isEdit)
        {
        if(typeof this.updateClientStateService.UpdateClientData.ClientContacts[i].Guid!=='undefined')
        {
        this.contactService.DeleteContact(this.updateClientStateService.UpdateClientData.ClientContacts[i].Guid).subscribe(
          (res:any)=>{
            if(res.ResponseStatus==='Success')
            {
             this.notification.success("Contact Deleted Successfully","",{nzPlacement:'bottomRight'}
             );
             this.removeItem(element);

            }

           },
          ()=>{
            this.notification.error("Contact was not Deleted",'',{nzPlacement:'bottomRight'})
          }

        );
        }
        else{
          this.removeItem(element);
          this.notification.success("Contact Deleted Successfully","",{nzPlacement:'bottomRight'}
          );
        }
      }
      else{
        this.removeItem(element);
        this.notification.success("Contact Deleted Successfully","",{nzPlacement:'bottomRight'}
        );
      }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  edit(index:number){
    for(let count=0;count<this.listData.length;count++){

      if(count==index){
       this.IsEdit=true;
       this.modalTitle = (this.IsEdit? 'Edit': 'Add') + ' Client Contact'
       this.isVisible = true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.listData[count]);
      }
    }

  }
  patchValues(data: any) {
    this.addContactForm.patchValue({
      ContactPersonName: data.ContactPersonName,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      PhoneNumberPrefix: data.PhoneNumberPrefix,

    });
    // this.getSelectedCountry();
    // this.getSelectedState();
    this.found=true;
  }

  deleteBackEnd(element: any) {}

  checkClientName() { // without type info
   this.isDisabled = false;
  }
  get ContactPersonName() {
    return this.addContactForm.controls.ContactPersonName as FormControl;
  }

}
