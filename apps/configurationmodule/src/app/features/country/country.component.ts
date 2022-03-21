import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonDataService } from './../../../../../../libs/common-services/commonData.service';
import { PermissionListService } from './../../../../../../libs/common-services/permission.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country, SelectOption } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { CountryListService } from './../../../../../../libs/common-services/country-list.service'
import { environment } from './../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countries$: Observable<Country[]> = new Observable<Country[]>();
  countries:Country[] =[] as Country[];
  countriesView:Country[] =[] as Country[];
  addCountry = false;
  isNew = true;
  countryList$ = new Observable<SelectOption[]>();
  countryId = "";
  country: FormControl = new FormControl("", Validators.required);
  total = 0;
  loading = true;
  pageIndex = 1;
 

  constructor(
    private countryService: CountryService,
    private countryListSerive: CountryListService,
    private modalService: NzModalService,
    private commonDataService: CommonDataService,
    private notification: NzNotificationService,
    private permissionListService: PermissionListService
  ) { }

  ngOnInit(): void {
    this.commonDataService.getPermission();
    this.getCountries();
  }

  getCountries(id?: string) {
    if (id) {
      this.countries$ = this.countryService.get(id);
    }
    else {
    this.countryService.get().subscribe((res:Country[])=>{
     this.countries=res.reverse();
     this.pageIndexChange(this.pageIndex);
     this.total=this.countries.length;
      });

    }
    this.loading=false;
  }

  openModal() {
    this.addCountry = true;
    this.countryList$ = this.countryListSerive.getCountry(environment.apiUrl).pipe(
      map(res => res?.data ?? []),
      map(data => {
        return data.map(c => {
          return {value: c.country, label: c.country} as SelectOption;
        })
      })
    );
   
  }

  closeModal() {
    this.addCountry = false;
    this.clearData();
  }

  save() {
    if (!this.country.value && this.country.value === "") {
        return;
    }
   
    const country: Country = {
      Guid: "00000000-0000-0000-0000-000000000000",
      Name: this.country.value
    };
    
    if (this.isNew) {
      this.countryService.add(country).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.closeModal();
        }
        if(response.Message=='Country registered successfully')
        {
          this.notification.create(
            'Success',
            'Country Added successfully',
            country.Name,
            { nzPlacement: 'bottomRight' }
          );
        }
        else
        {
          this.notification.create(
            'error',
            'Country name already exists',
            country.Name,
            { nzPlacement: 'bottomRight' }
          );
          return;
        }
      });
    }
    else 
    {
      this.countryService.update({ Guid: this.countryId, Name: this.country.value }).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.closeModal();
        }
      });
    }
  }

  update(country: Country) {
    this.isNew = false;
    this.countryId = country.Guid;
    this.country.setValue(country.Name);
    this.openModal();
  }

  delete(country: Country) {
    this.countryService.checkifCountryisDeletable(country.Guid).subscribe((res) => {
      if (res === true) {
        this.modalService.confirm({
          nzTitle: 'This Country can not be deleted b/c it is assigned to employee /or duty station',
          nzContent: 'Name: <b style="color: red;">' + country.Name + '</b>',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: false
        });
      }
      else {
        this.modalService.confirm({
          nzTitle: 'Delete Country?',
          nzContent: 'Are you sure you want to delete this country?<br>this action cannot be undone.',
          nzOkText: 'Yes, Delete',
          nzOkType: 'primary',
         nzOkDanger: false,
          nzOnOk: () => {
            this.countryService.delete(country).subscribe(response => {
              if (response.ResponseStatus === "Success") {
                this.getCountries();
              }
            }, error => {
              console.log(error);
            })
          },
          nzCancelText: 'Cancel'
        });
      }
    });
  }

  clearData() {
    this.isNew = true;
    this.countryId = "";
    this.country.setValue("");
  }
 

  authorize(key:string){
    return this.permissionListService.authorizedPerson(key);
  }
  get isFormDisabled():boolean{
    return  this.country.invalid;
  }
  get enableClear():boolean{ 
    return  this.country.valid;
  }
  pageIndexChange(pageIndex:number)
  {
    this.pageIndex=pageIndex
   this.countriesView=  this.countries.slice((pageIndex-1)*10).slice(0,10);
  }
 
}
