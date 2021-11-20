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


