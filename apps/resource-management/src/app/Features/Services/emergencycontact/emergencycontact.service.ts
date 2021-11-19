import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmergencycontactService {
  constructor(private http: HttpClient) {}
  readonly baseURL = 'http://localhost:5000/api/v1/EmergencyContact';
  formData: Iemergencycontact = new ();
  list: Address[];
}
