import {
  AddClientStateService,
  CompanyContactCreate,
  Employee,
  EmployeeService,
  UpdateClientStateService,
  UpdateCompanyContact,
} from '../../../core';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { CompanyContactService } from '../../../core/';
import { CountryCodeService } from '../../../core/services/country-code.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getNames } from '../../../shared/Data/contacts';

@Component({
  selector: 'exec-epp-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrls: ['./company-contacts-form.component.scss'],
})
export class CompanyContactsFormComponent implements OnInit {
  dynamicBtnValue={} as string;
  isClearButtonActive=true;
  emailAdress = new FormControl('');
  phoneNumber = new FormControl('');
  phoneNumberPrefix=new FormControl('');
  searchChange$ = new BehaviorSubject('');
  employees = [] as Employee[];
  selectedUser?: string;
  isLoading = false;
  contactDetail = {} as Employee;
  listofContactNames = getNames();
clientalreadyExist=false;
  @Input() isVisible!: boolean;
  @Input() editable = false;

  countries: string[] = [];
  footer = null;
  modalTitle: string={} as string;

  listofCodes: { value: string; label: string }[] = [];

  listOfStates: string[] = [];

  addContactForm!: FormGroup;
  listData: any[] = [];
  comapanyContacts = [] as CompanyContactCreate[];
  isModalVisible = false;
  loading = false;
  IsEdit=false;
  editAt=-1;
  found=false;
  clientExist='';
  updateCompContacts:UpdateCompanyContact[]=[];
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private _countryService: CountryCodeService,
    private notification: NzNotificationService,
    private companyService: CompanyContactService,
    private addClientStateService: AddClientStateService,

    private updateClientStateService: UpdateClientStateService

  ) {
    this.listofCodes = this._countryService.getPhonePrefices();
  }


  ngOnInit(): void {
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });
    this.updateCompContacts=this.updateClientStateService.UpdateClientData.CompanyContacts;
    if(this.updateClientStateService.isEdit && this.updateClientStateService.getClientcomapanyContacts!=null
      )
      {

          this.listData=this.updateClientStateService.getClientcomapanyContacts;

      }
      else
      {
        this.listData = this.addClientStateService.getClientcomapanyContacts ;
      }
         this.addContactForm = this.fb.group({
        companyContactName: ['', [Validators.required]],
        phoneNumber: ['', []],
        phoneNumberPrefix: ['+251', []],

        emailAdress: ['', []],
      });


      this.addContactForm.valueChanges.subscribe(x => {
        if(this.addContactForm.value['companyContactName']!='' ||
        this.addContactForm.value['phoneNumber']!='' ||
        this.addContactForm.value['emailAdress']!=''  ){
          this.updateClientStateService.updateButtonListener=false;
         this.isClearButtonActive=false;
        }
        else{
         this.isClearButtonActive=true;
        }

      });
  }

  showModal(): void {
    this.dynamicBtnValue=this.updateClientStateService.actionButton="Add";
    this.modalTitle = (this.IsEdit? 'Edit': 'Add') + ' Company Contact'
    this.isVisible = true;
  }
  submitForm(): void {
    if (this.addContactForm.valid) {
      this.listData.forEach((value: any, index: any) => {
        if (value.companyContactName==this.addContactForm.value['companyContactName'])
        {
        this.clientalreadyExist=true;

        }
this.IsEdit
      });
      if(!this.IsEdit){

       if(!this.clientalreadyExist){

         const contactPerson={
           Name:this.addContactForm.controls.companyContactName.value,
           Email:this.addContactForm.controls.emailAdress.value,
          //  Phone:this.addContactForm.controls.phoneNumber.value,
           PhoneNumberPrefix:this.addContactForm.controls.phoneNumber.value,

         } as Employee;
        this.listData = [...this.listData, contactPerson];
        if(this.updateClientStateService.isEdit){
          const contactPerson ={
            ContactPersonGuid:this.contactDetail.Guid
          } as UpdateCompanyContact
          this.updateCompContacts.push(contactPerson);

        this.updateClientStateService.updateCompanyContacts(this.updateCompContacts);
        this.updateClientStateService.updateClientcomapanyContacts(this.listData);
      }
      else
      {

        this.comapanyContacts.push({
          ContactPersonGuid: this.contactDetail.Guid,
        });
        this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
        this.addClientStateService.updateClientcomapanyContacts(this.listData);
      }
        this.isVisible = false;

        this.addContactForm.reset();
       }
       else{
         this.clientExist="Exist."
         this.clientalreadyExist=false;
       }
      }
     else{

        this.listData[this.editAt].Name=this.addContactForm.controls.companyContactName.value;
        this.listData[this.editAt].Email=this.addContactForm.controls.emailAdress.value;
        //this.listData[this.editAt].Phone=this.addContactForm.controls.phoneNumber.value;
        this.listData[this.editAt].PhoneNumberPrefix=this.addContactForm.controls.phoneNumber.value;

        if(this.updateClientStateService.UpdateClientData.CompanyContacts.length>0)
        {

           if(typeof this.updateCompContacts[this.editAt].Guid!=='undefined')
          {
            this.updateCompContacts[this.editAt]. ContactPersonGuid=this.contactDetail.Guid;

          }
          else
          {

            const contactPerson ={
              ContactPersonGuid:this.contactDetail.Guid
            } as UpdateCompanyContact
            this.updateCompContacts.push(contactPerson);
          }

          this.updateClientStateService.updateCompanyContacts(this.updateCompContacts);
          this.updateClientStateService.updateClientcomapanyContacts(this.listData);
        }
        else{
        this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
        this.addClientStateService.updateClientcomapanyContacts(this.listData);
        }
        this.IsEdit=false;
        this.editAt=-1;
        this.isVisible = false;
        this.addContactForm.reset();
      }

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

  }
  edit(index:number){
    this.dynamicBtnValue=this.updateClientStateService.actionButton="Update";
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
      companyContactName: data.Name,
      //phoneNumber: data.phoneNumber,
      emailAdress: data.Email,
      phoneNumber: data.PhoneNumberPrefix,


    });
    // this.getSelectedCountry();
    // this.getSelectedState();
    this.found=true;
  }
  exitModal() {
    this.isVisible = false;
    {
      this.editAt=-1;
      this.addContactForm.reset();
    }

  }
  handleClear(): void {
    console.log('Button cancel clicked!');
    this.addContactForm.reset();
    this.addContactForm.reset();
  }
  removeItem(element: Employee,i:number) {
   this.listData=this.listData.filter(x=>x!==this.listData[i]);
   this.comapanyContacts=this.comapanyContacts.filter(x=>x!==this.comapanyContacts[i]);
   this.updateCompContacts=this.updateCompContacts.filter(x=>x!==this.updateCompContacts[i]);
    if(this.updateClientStateService.isEdit)
    {
      this.updateClientStateService.updateCompanyContacts(this.updateCompContacts);
      this.updateClientStateService.updateClientcomapanyContacts(this.listData);
    }
    else{
      this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
      this.addClientStateService.updateClientcomapanyContacts(this.listData);
    }

  }
  showDeleteConfirm(element: any,i:number): void {

    this.modal.confirm({
      nzIconType:'',
      nzTitle: 'Delete Company Contact?',
      nzContent: 'Are you sure, you want to delete this company contact? <br/>This action cannot be undone!',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
      if(this.updateClientStateService.isEdit)
      {
        if(typeof this.updateClientStateService.UpdateClientData.CompanyContacts[i].Guid!=='undefined')
        {

        this.companyService.DeleteCompany(this.updateClientStateService.UpdateClientData.CompanyContacts[i].Guid).subscribe(
          (res:any)=>{
            if(res.ResponseStatus==='Success')
            {
             this.notification.success("Company Deleted Successfully","",{nzPlacement:'bottomRight'}
             );
             this.removeItem(element,i);

            }

           },
          ()=>{
            this.notification.error("Company was not Deleted",'',{nzPlacement:'bottomRight'})
          }

        );
        }
        else{

          this.removeItem(element,i);
          this.notification.success("Company Deleted Successfully","",{nzPlacement:'bottomRight'}
          );
        }
      }
      else{

        this.removeItem(element,i);
        this.notification.success("Company Deleted Successfully","",{nzPlacement:'bottomRight'}
        );
      }

      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  deleteBackEnd(element: any) {}

  getClientContact() {
    this.contactDetail = this.getClientDetails(
      this.addContactForm.value.companyContactName
    );

    this.addContactForm.controls['phoneNumber'].setValue(
      this.contactDetail.PhoneNumberPrefix
      //+''+ this.contactDetail.Phone
    );

    this.addContactForm.controls['emailAdress'].setValue(
      this.contactDetail.Email
    );

  }

  getClientDetails(name: string) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].Name +'-'+this.employees[i].Role === name) {
        console.log('employee')
        console.log(this.employees[i])

        return this.employees[i];
      }
    }
    return this.employees[1];
  }

}
