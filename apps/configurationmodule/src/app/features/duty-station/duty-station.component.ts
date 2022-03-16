import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonDataService } from './../../../../../../libs/common-services/commonData.service';
import { PermissionListService } from './../../../../../../libs/common-services/permission.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, BehaviorSubject } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from './../../models/country';
import { DutyStation, DutyStationAndCountry } from './../../models/duty-station';
import { DutyStationService } from './../../services/duty-station.service';

@Component({
  selector: 'exec-epp-duty-station',
  templateUrl: './duty-station.component.html',
  styleUrls: ['./duty-station.component.scss']
})
export class DutyStationComponent implements OnInit {
  countries$: Observable<Country[]> = new Observable<Country[]>();
  dutyStationSource = new BehaviorSubject<DutyStationAndCountry[]>([]);
  dutyStation$ = this.dutyStationSource.asObservable();
  dutyStationList: DutyStationAndCountry[] = [];
  dutyStationListView: DutyStationAndCountry[] = [];
  addDutyStation = false;
  isNew = true;
  dutyStationId = "";
  country: FormControl = new FormControl("", Validators.required);
  dutyStation: FormControl = new FormControl("", Validators.required);
  total = 0;
  loading = true;
  pageIndex = 1;

  constructor(
    private countryService: CountryService,
    private dutyStationService: DutyStationService,
    private modalService: NzModalService,
    private commonDataService: CommonDataService,
    private permissionListService: PermissionListService
  ) { }

  ngOnInit(): void {
    this.getDutyStation();
    this.dutyStation$.subscribe((res: DutyStationAndCountry[])=>{
      this.dutyStationList=res.reverse();
      this.pageIndexChange(this.pageIndex);
      this.total=this.dutyStationList.length;
      this.loading=false;
    })
  }

  getDutyStation() {
    this.countryService.get().subscribe(countries => {
      if (!countries) {
        return;
      }

      this.dutyStationList = [];

      countries.forEach(country => {
        this.dutyStationService.get(country.Guid).subscribe(dutyStations => {
          if (!dutyStations) {
            return;
          }

          this.dutyStationList.push(...dutyStations.map(ds => {
            return {
              Guid: ds.Guid,
              CountryId: ds.CountryId,
              Name: ds.Name,
              CountryName: country.Name
            } as DutyStationAndCountry
          }));

          if (countries.indexOf(country) === countries.length - 1) {
            this.dutyStationSource.next([...this.dutyStationList]);
          }

        })
      });
    }, error => {
      console.log(error);
    });
  }

  getCountries() {
    this.countries$ = this.countryService.get();
  }

  updateModalState() {
    this.addDutyStation = !this.addDutyStation;
    this.getCountries();
  }

  openModal() {
    this.addDutyStation = true;
    this.getCountries();
  }

  closeModal() {
    this.addDutyStation = false;
    this.clearData();
  }

  save() {
    if ((!this.country.value && this.country.value === "") || (!this.dutyStation.value && this.dutyStation.value === "")) {
      return;
    }

    const dutyStation: DutyStation = {
      Guid: "00000000-0000-0000-0000-000000000000",
      CountryId: this.country.value,
      Name: this.dutyStation.value
    };

    if (this.isNew) {
      this.dutyStationService.add(dutyStation).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getDutyStation();
          this.closeModal();
        }
      }, error => {
        console.log(error);
      });
    }
    else {
      this.dutyStationService.update({ Guid: this.dutyStationId, CountryId: this.country.value, Name: this.dutyStation.value }).subscribe(response => {
        if (response.ResponseStatus === "Success") {
          this.getDutyStation();
          this.closeModal();
        }
      }, error => {
        console.log(error);
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
    this.dutyStationService.checkifDutyStationisDeletable(dutyStation.Guid).subscribe((res) => {
      if (res == true) {
        this.modalService.confirm({
          nzTitle: 'This Duty Station can not be deleted b/c it is assigned to employee',
          nzContent: 'Name: <b style="color: red;">' + dutyStation.Name + '</b>',
          nzOkText: 'Ok',
          nzOkType: 'primary',
          nzOkDanger: true
        });
      }
      else {
        this.modalService.confirm({
          nzTitle: 'Delete Country?',
          nzContent: 'Name: <b style="color: red;">' + dutyStation.Name + '</b>',
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            this.dutyStationService.delete(dutyStation).subscribe(response => {
              if (response.ResponseStatus === "Success") {
                this.getDutyStation();
              }
            }, error => {
              console.log(error);
            })
          },
          nzCancelText: 'No'
        });
      }
    });
  }

  clearData() {
    this.isNew = true;
    this.dutyStationId = "";
    this.dutyStation.setValue("");
    this.country.setValue("");
  }

  authorize(key: string) {
    return this.permissionListService.authorizedPerson(key);
  }
  get isFormDisabled():boolean{
    return this.dutyStation.invalid || this.country.invalid;
  }
  get enableClear():boolean{
    return this.dutyStation.valid || this.country.valid;
  }
  pageIndexChange(pageIndex:number)
  {
    this.pageIndex=pageIndex
   this.dutyStationListView=  this.dutyStationList.slice((pageIndex-1)*10).slice(0,10);
  }
}
