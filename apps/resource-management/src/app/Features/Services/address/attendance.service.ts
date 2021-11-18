/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../Models/address.model';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    url = 'http://localhost:5000/api/v1/PersonalAddress'
    

    constructor(
        private readonly _httpClient: HttpClient
    ) {
    }

    add(address: Address) {
        console.log('service')
        return this._httpClient.post(this.url, address)
    }
    
}
