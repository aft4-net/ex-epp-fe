import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeviceDetail } from '../../Models/device-detail/devicedetail';
import { ResponseDto } from '../../Models/response-dto.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {
  baseUrl = environment.apiUrl;
  deviceDetails:DeviceDetail[] = [];

  constructor(private http: HttpClient) { }

  loadDeviceDetails() {
    this.http.get(this.baseUrl + "DeviceDetails");
  }

  addDeviceDetail(deviceDetail: DeviceDetail): Observable<ResponseDto<DeviceDetail>> {
    return this.http.post<ResponseDto<DeviceDetail>>(this.baseUrl + "DeviceDetails", deviceDetail);
  }
}
