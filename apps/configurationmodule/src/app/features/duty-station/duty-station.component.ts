import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from './../../models/country';
import { DutyStation } from './../../models/duty-station';
import { DutyStationService } from './../../services/duty-station.service';

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
  dutyStation: FormControl = new FormControl("");

  constructor(
    private countryService: CountryService,
    private dutyStationService: DutyStationService,
    private modalService: NzModalService
  ) { }

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

    if(!this.addDutyStation) {
      this.isNew = true;
    }
  }

  save() {
    if(!this.dutyStation.value && this.dutyStation.value === "" && !this.country.value && this.country.value === ""){
      return;
    }

    let dutyStation: DutyStation = {
      Guid: "00000000-0000-0000-0000-000000000000",
      CountryId: this.country.value,
      Name: this.dutyStation.value
    };

    if (this.isNew){
      this.dutyStationService.add(dutyStation).subscribe(response => {
        if(response.ResponseStatus === "Success") {
          this.getDutyStation();
          this.updateModalState();
          this.clearData();
        }
      }, error => {

      });
    }
    else {
      this.dutyStationService.update({Guid: this.dutyStationId, CountryId: this.country.value, Name: this.country.value}).subscribe(response => {
        if(response.ResponseStatus === "Success") {
          this.getDutyStation();
          this.updateModalState();
          this.clearData();
        }
      }, error => {

      });
    }
  }

  update(dutyStation: DutyStation) {
    this.isNew = false;
    this.dutyStationId = dutyStation.Guid;
    this.country.setValue(dutyStation.CountryId);
    this.dutyStation.setValue(dutyStation.Name);
    this.updateModalState();
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

        })
      },
      nzCancelText: 'No'
    });
  }

  clearData() {
    this.dutyStationId = "";
    this.country.setValue("");
    this.dutyStation.setValue("");
  }
}
