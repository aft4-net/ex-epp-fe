import { BehaviorSubject, Observable } from 'rxjs';
import {
  EmergencyContact,
 
  IEmergencyContact,
} from '../../Models/emergencycontact';

import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../../Models/response-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmergencycontactService {
  formData: EmergencyContact = new EmergencyContact();
  list: IEmergencyContact[] = [];
  private emSource = new BehaviorSubject<IEmergencyContact | null>(null);

  em$ = this.emSource.asObservable();

  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:14696/api/v1/EmergencyContact';

  addressIn = {
    Guid: '6fa85f64-5717-4562-b3fc-2c963f66afa6',
    IsActive: true,
    IsDeleted: true,
    CreatedDate: '2021-11-18T16:12:03.065Z',
    CreatedbyUserGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    PhoneNumber: 'string',
    Country: 'string',
    StateRegionProvice: 'string',
    City: 'string',
    SubCityZone: 'string',
    Woreda: 'string',
    HouseNumber: 'string',
    PostalCode: 0,
  };

 
  postEmergenycContact() {
    return this.http.post<ResponseDto<EmergencyContact>>(
      this.baseURL,
      this.formData
    );
  }

  createEmergencycontact(em: EmergencyContact): Observable<EmergencyContact> {
    console.log(em);
    return this.http.post<EmergencyContact>(this.baseURL, em);
  }

  putEmergencycontact() {
    return this.http.put(
      `${this.baseURL}/${this.formData.guid}`,
      this.formData
    );
  }

  deleteEmergencycontact(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getEmergencyContact(): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(this.baseURL);
  }

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then(() => this.list);
  }

   

  postEmergencycontact(emc:EmergencyContact){
    return this.http.post(this.baseURL,emc)
     .subscribe((response:ResponseDto<EmergencyContact> | any) => {
       this.emSource.next(response.data),
       console.log(response.data)
     },error => {
       console.log(error);
     });
    }
    setEmergencycontactData(emc:EmergencyContact){
      this.emSource.next(emc);  
    }



   
}


