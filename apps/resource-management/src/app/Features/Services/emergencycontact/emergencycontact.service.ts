import { BehaviorSubject, Observable } from 'rxjs';
import {
  EmergencyContact,
  IEmergencyContact,
} from '../../Models/emergencycontact';
import { ResponseDTO, ResponseDto } from '../../Models/response-dto.model';

import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmergencycontactService {
  formData: EmergencyContact = new EmergencyContact();
  list: EmergencyContact[] = [];
  private emSource = new BehaviorSubject<IEmergencyContact | null>(null);

  em$ = this.emSource.asObservable();

  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:14696/api/v1/EmergencyContact';

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

  postEmergencycontact(emc: IEmergencyContact) {
    return this.http.post<IEmergencyContact>(this.baseURL, emc).subscribe(
      (response: IEmergencyContact) => {
        this.emSource.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // .subscribe((response: IBasket) => {
  //     this.basketSource.next(response);
  //     this.calculateTotals();
  //   }, error => {
  //     console.log(error);
  //   })

  // add(education: IEmergencyContact): Observable<ResponseDTO<any>> {
  //   return this.http
  //     .post<ResponseDTO<any>>(this.path, education, this.httpOptions)
  //     .pipe(catchError(this.errHandler.formatErrors));
  // }

  setEmergencycontactData(emc: EmergencyContact) {
    this.emSource.next(emc);
  }

  createsEmergencycontact(emc: EmergencyContact): Observable<EmergencyContact> {
    console.log(emc);
    return this.http.post<EmergencyContact>(this.baseURL, emc);
  }
  postEmergenycContact(em: IEmergencyContact) {
    return this.http.post<ResponseDto<IEmergencyContact>>(this.baseURL, em);
  }

  createEmergencycontact(em: IEmergencyContact): Observable<IEmergencyContact> {
    console.log(em);
    return this.http.post<IEmergencyContact>(this.baseURL, em);
  }

  add(address: IEmergencyContact): Observable<ResponseDto<IEmergencyContact>> {
    console.log('service');
    return this.http.post<ResponseDto<IEmergencyContact>>(
      this.baseURL,
      address
    );
  }

  postEmergenycContacts(emc: IEmergencyContact) {
    return this.http.post(this.baseURL, emc);
  }
}
