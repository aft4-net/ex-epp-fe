import { BehaviorSubject, Observable, of } from 'rxjs';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { getClientDetails, getNames } from '../../../shared/Data/contacts';

import { Company } from '../../../core/models/get/company';
import { CompanyContact } from '../../../core/models/get/company-contact';
import { CompanyContactService } from '../../../core/services/company-contact.service';
import { CountryCode } from '../../../core/models/get/country-code';
import { CountryCodeService } from '../../../core/services/country-code.service';
import { Employee } from '../../../core';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { countryPhoneCodes } from '../../../shared/Data/dummy';
import { observable } from 'rxjs';

@Component({
  selector: 'exec-epp-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrls: ['./company-contacts-form.component.scss']
})
export class CompanyContactsFormComponent implements OnInit {

  // randomUserUrl = 'https://api.randomuser.me/?results=5';
  emailAdress = new FormControl('');
  phoneNumber=new FormControl('');;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  employees = [] as Employee[];
  selectedUser?: string;
  isLoading = false;
  contactDetail:any;
  listofContactNames=getNames();




  @Input() isVisible: boolean;
  @Input() editable : boolean=false;

  countries: string[] = []
  footer=null;

  listofCodes :{ value: string, label: string }[]=[];

  listOfStates: string[] = []

  isEthiopia = false;

  buttonClicked = 0


  addContactForm!: FormGroup;
  listData:any=[];
  isModalVisible = false;
  total = 10;
  loading = false;
  pageSize = 4;
  pageIndex = 1;
  idParam='';
  totalPage!:number;


  constructor(private _companyContactService:CompanyContactService,private http: HttpClient,private fb: FormBuilder,private modal: NzModalService, private _countryService:CountryCodeService) {
    this.listofCodes=this._countryService.getPhonePrefices();
    // this.companyContact={
    //   name: 'Bethesda',
    //   role: 'US',
    //   email: 'sunny',
    //   phone: 334,


    // } as Company


   }

  ngOnInit(): void {


// this.lookup();

    this.listData=[];
    this.addContactForm = this.fb.group({
      companyContactName: ['', [Validators.required]],
      phoneNumber: ['', []],
      phoneNumberPrefix:['+251',[]],
      // companyContact: [null, [Validators.required]],
      emailAdress:['',[]]
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
      this.listData.push(this.contactDetail);
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
}
  handleClear(): void {
    console.log('Button cancel clicked!');

    this.addContactForm.reset();
  }
  removeItem(element:any)
  {
    this.listData.forEach((value:any,index:any) => {
      if(value==element)
      this.listData.splice(index,1);

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
//   lookup()
//   {
//     const getRandomNameList = (name: string): Observable<any> =>
//     this.http
//       .get(`${this.randomUserUrl}`)
//       .pipe(
//         catchError(() => of({ results: [] })),
//         map((res: any) => res.results)
//       )
//       .pipe(map((list: any) => list.map((item: any) => `${item.name.first} ${name}`)));
//   const optionList$: Observable<string[]> = this.searchChange$
//     .asObservable()
//     .pipe(debounceTime(500))
//     .pipe(switchMap(getRandomNameList));
//   optionList$.subscribe(data => {
//     this.optionList = data;
//     this.isLoading = false;
//   });
// }

getClientContact()
{
  console.log(this.addContactForm.value.companyContactName)
  this.contactDetail=getClientDetails(this.addContactForm.value.companyContactName);
  console.log(this.contactDetail)
  this.addContactForm.controls['phoneNumber'].setValue(this.contactDetail.phone);
    console.log(this.contactDetail)
    this.addContactForm.controls['emailAdress'].setValue(this.contactDetail.email);

}

  }




      // contactName: ['', [Validators.required]],
      // phoneNumber: ['', []],
      // phoneNumberPrefix:['+251',[]],
      // companyContact: [null, [Validators.required]],
      // emailAdress:['',[]]
