import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {CountryService} from '../../services/country.service';
import {Country} from './../../models/country';
import {DutyStation} from './../../models/duty-station';
import {DutyStationService} from './../../services/duty-station.service';
import {CountriesMockConfigService} from "../../services/countries.mock.config.service";
import {SelectOptionConfigModel} from "../../models/select-option.config.model";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'exec-epp-duty-station',
  templateUrl: './duty-station.component.html',
  styleUrls: ['./duty-station.component.scss']
})
export class DutyStationComponent implements OnInit {
  countries$: Observable<Country[]> = new Observable<Country[]>();
  dutyStation$: Observable<DutyStation[]> = new Observable<DutyStation[]>();
  addDutyStation: boolean = false;
  isNew: boolean = true;
  dutyStationId: string = "";
  country: FormControl = new FormControl("");
  country1: FormControl = new FormControl("");
  dutyStation: FormControl = new FormControl("");
  label: any;
  selectedValue: any;
  nationalities$: Observable<SelectOptionConfigModel[]>;
  constructor(
    private countryService: CountryService,
    private dutyStationService: DutyStationService,
    private  _addressCountryStateService: CountriesMockConfigService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {
    this.label = 'Country'
    this.nationalities$ = this._addressCountryStateService.getCountries();
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.countries$ = this.countryService.get();
  }

  getDutyStation() {
    if(!this.country.value && this.country.value === "") {
      return;
    }

    this.dutyStation$ = this.dutyStationService.get(this.country.value);
  }

  updateModalState() {
    this.addDutyStation = !this.addDutyStation;
    this.getDutyStation();
  }

  openModal() {
    this.addDutyStation = true;
    this.getDutyStation();
  }

  closeModal() {
    this.addDutyStation = false;

    this.clearData();
  }

  save() {
    if ((!this.country1.value && this.country1.value === "") || (!this.dutyStation.value && this.dutyStation.value === "")) {
      return;
    }

    let dutyStation: DutyStation = {
      Guid: "00000000-0000-0000-0000-000000000000",
      CountryId: this.country1.value,
      Name: this.dutyStation.value
    };

    if (this.isNew){
      this.dutyStationService.add(dutyStation).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.notification.success('Duty Station Added Successfully', '', {
            nzPlacement: 'bottomRight',
          });
          this.getDutyStation();
          this.closeModal();
        }
      }, error => {
        this.notification.error('Duty Station Registration Failed', '', {
          nzPlacement: 'bottomRight',
        });
      });
    } else {
      this.dutyStationService.update({
        Guid: this.dutyStationId,
        CountryId: this.country1.value,
        Name: this.dutyStation.value
      }).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.notification.error('Duty Station Update Successful', '', {
            nzPlacement: 'bottomRight',
          });
          this.getDutyStation();
          this.closeModal();
        }
      }, error => {
        this.notification.error('Duty Station Update Failed', '', {
          nzPlacement: 'bottomRight',
        });
      });
    }
  }

  update(dutyStation: DutyStation) {
    this.isNew = false;
    this.dutyStationId = dutyStation.Guid;
    this.country.setValue(dutyStation.CountryId);
    this.dutyStation.setValue(dutyStation.Name);
    this.openModal();
  }

  delete(dutyStation: DutyStation) {
    this.modalService.confirm({
      nzTitle: 'Delete Country?',
      nzContent: 'Name: <b style="color: red;">'+ dutyStation.Name + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.dutyStationService.delete(dutyStation).subscribe(response => {
          if(response.ResponseStatus === "Success") {
            this.getDutyStation();
          }
        }, error => {
          //
        })
      },
      nzCancelText: 'No'
    });
  }


  clearData() {
    this.isNew = true;
    this.dutyStationId = "";
    this.dutyStation.setValue("");
  }
}
