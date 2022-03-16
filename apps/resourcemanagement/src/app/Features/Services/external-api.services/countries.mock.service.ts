import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../../../environments/environment";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { CountryListService } from "./../../../../../../../libs/common-services/country-list.service";

function mapPrefix(values?: { name: string, dial_code: string }[] | null) {
    return (values ? values : [
        { name: 'Ethiopia', dial_code: '+251' },
        { name: 'United States (US)', dial_code: '+1' }
    ]).map(v => {
        return {
            value: v.dial_code,
            label: v.dial_code + ' - ' + v.name
        } as SelectOptionModel
    });
}

@Injectable({
    providedIn: "root"
})
export class CountriesMockService {

    private readonly _baseURL = environment.apiUrl;

    constructor(
        protected readonly _httpClient: HttpClient,
        private _countryListService: CountryListService
    ) {
    }


    getStates(countryName?: string | null): Observable<SelectOptionModel[]> {
        if (countryName && countryName !== null && countryName !== '') {
            return this._countryListService.getCountryAndState(this._baseURL, countryName ?? "").pipe(
                map((response: any) => {
                    return response.data.state.map((state: any) => {
                        return {
                            value: state.name,
                            label: state.name
                        } as SelectOptionModel
                    })
                })
            )
        }
        return of([]);
    }

    getCountries(): Observable<SelectOptionModel[]> {
        return this._countryListService.getCountry(this._baseURL).pipe(
            map((response: any) => {
                return response.data.map((country: any) => {
                    return {
                        value: country.country,
                        label: country.country
                    } as SelectOptionModel
                })
            })
        );
    }

    getCountriesPhonePrefices(): Observable<SelectOptionModel[]> {
        return this._countryListService.getCountryAndCode(this._baseURL).pipe(
            map((response: any) => mapPrefix(response.data))
        );
    }
}
