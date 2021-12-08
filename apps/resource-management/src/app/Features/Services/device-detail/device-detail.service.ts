import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeviceDetail } from '../../Models/device-detail/devicedetail';
import { ResponseDto } from '../../Models/response-dto.model';
import { Pagination } from '../../Models/device-detail/pagination';


@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {
  baseUrl = environment.apiUrl;
  deviceDetails:DeviceDetail[] = [];

  constructor(private http: HttpClient) { }

  // getDeviceDetails(): Observable<DeviceDetail[]> {
  //   return this.http.get<DeviceDetail[]>(this.baseUrl + "DeviceDetails");
  // }

  getDeviceDetails(index: number): Observable<Pagination> {
    index = index ?? 1;
    return this.http.get<Pagination>(this.baseUrl + "DeviceDetails?pageindex="+index);
  }

  addDeviceDetail(deviceDetail: DeviceDetail): Observable<ResponseDto<DeviceDetail>> {
    return this.http.post<ResponseDto<DeviceDetail>>(this.baseUrl + "DeviceDetails", deviceDetail);
  }
}
