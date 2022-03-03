import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonDataService } from './../../../../../../libs/common-services/commonData.service';
import { PermissionListService } from './../../../../../../libs/common-services/permission.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'exec-epp-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countries$: Observable<Country[]> = new Observable<Country[]>();
  addCountry = false;
  isNew = true;
  countryId = "";
  country: FormControl = new FormControl("");

  constructor(
    private countryService: CountryService,
    private modalService: NzModalService,
    private commonDataService: CommonDataService,
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
      this.countries$ = this.countryService.get();
    }
  }

  openModal() {
    this.addCountry = true;
  }

  closeModal() {
    this.addCountry = false;

    this.clearData();
  }

  save() {
    if (!this.country.value && this.country.value === "") {
      return;
    }

    let country: Country = {
      Guid: "00000000-0000-0000-0000-000000000000",
      Name: this.country.value
    };

    if (this.isNew) {
      this.countryService.add(country).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.closeModal();
        }
      }, error => {

      });
    }
    else {
      this.countryService.update({ Guid: this.countryId, Name: this.country.value }).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.closeModal();
        }
      }, error => {

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
          nzTitle: 'This Country can not be deleted b/c it is assigned to employee and/or duty station',
          nzContent: 'Name: <b style="color: red;">' + country.Name + '</b>',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: true,
          //  nzOnOk: () => this.deleteHandler(id),
          //  nzCancelText: 'No'
        });
      }
      else {
        this.modalService.confirm({
          nzTitle: 'Delete Country?',
          nzContent: 'Name: <b style="color: red;">' + country.Name + '</b>',
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            this.countryService.delete(country).subscribe(response => {
              if (response.ResponseStatus === "Success") {
                this.getCountries();
              }
            }, error => {
              //
            })
          },
          nzCancelText: 'No'
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
}
