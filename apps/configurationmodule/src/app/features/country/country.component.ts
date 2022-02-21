import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {Country} from '../../models/country';
import {CountryService} from '../../services/country.service';
import {AddressCountryStateService} from "../../../../../resourcemanagement/src/app/Features/Services/external-api.services/countries.mock.service";
import {SelectOptionModel} from "../../../../../resourcemanagement/src/app/Features/Models/supporting-models/select-option.model";
import {FormGenerator} from "../../../../../resourcemanagement/src/app/Features/Components/custom-forms-controls/form-generator.model";
import {NgForm} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'exec-epp-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countries$: Observable<Country[]> = new Observable<Country[]>();
  addCountry: boolean = false;
  isNew: boolean = true;
  countryId: string = "";
  country: FormControl = new FormControl("");
  nationalities$: Observable<SelectOptionModel[]>;
  maxNationality = 3;
  selectedValue: any = '';
  tags: any;
  label: any;

  constructor(
    private readonly _formGenerator: FormGenerator,
    private countryService: CountryService,

    private modalService: NzModalService,
    private readonly _addressCountryStateService: AddressCountryStateService,
    private notification: NzNotificationService
  ) {
    this.nationalities$ = this._addressCountryStateService.nationalities$
    this.label = "Country";
  }

  ngOnInit(): void {
    this.getCountries();
  }

  // getControl(name: string): string {
  //   return name;
  //   return this._formGenerator.getFormControl(name, this.formGroup)
  // }

  getCountries(id?: string) {
    if (id) {
      this.countries$ = this.countryService.get(id);
    } else {
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

  save(countryForm: any) {
    this.country = countryForm;
    console.log("selected country: " + this.selectedValue);
    if (!this.country.value && this.country.value === "") {
      return;
    }

    let country: Country = {
      Guid: "00000000-0000-0000-0000-000000000000",
      Name: this.selectedValue
    };

    if (this.isNew) {
      console.log('entered in the first if');
      this.countryService.add(country).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.notification.success('Country Added Successfully', '', {
            nzPlacement: 'bottomRight',
          });
          this.closeModal();
        }
      }, error => {
        this.notification.error(' Registration Failed!', '', {
          nzPlacement: 'bottomRight',});
      });
    } else {
      console.log('entered in the else part');
      this.countryService.update({Guid: this.countryId, Name: this.country.value}).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getCountries();
          this.notification.success('Country Update Successfully', '', {
            nzPlacement: 'bottomRight',});
          this.closeModal();
        }
      }, error => {
        this.notification.error(' Update Failed!', '', {
          nzPlacement: 'bottomRight',});
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

        })
      },
      nzCancelText: 'No'
    });
  }

  clearData() {
    this.isNew = true;
    this.countryId = "";
    this.country.setValue("");
  }
}
