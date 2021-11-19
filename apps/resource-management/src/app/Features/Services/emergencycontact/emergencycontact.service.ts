import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { IEmergencyContact } from '../../Models/emergencycontact';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../Models/response-dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmergencycontactService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:5000/api/v1/EmergencyContact';

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

  emCont = {
    Guid: 'string',
    IsActive: true,
    IsDeleted: true,
    CreatedDate: Date,
    CreatedbyUserGuid: 'string',
    FirstName: 'string',
    FatherName: 'string',
    Relationship: 'string',
    Address: [this.addressIn],
  };

  postEmergenycContact() {
    return this.http.post<ResponseDto<IEmergencyContact>>(
      this.baseURL,
      this.emCont
    );
  }
}
