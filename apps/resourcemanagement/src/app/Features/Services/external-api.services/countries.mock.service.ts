import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";

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

    private readonly _baseURL = 'https://countriesnow.space/api/v0.1/countries';

    constructor(
        protected readonly _httpClient: HttpClient
    ) {
    }


    getStates(countryName?: string | null): Observable<SelectOptionModel[]> {
        if (countryName && countryName !== null && countryName !== '') {
            return this._httpClient.post(
                this._baseURL + '/states',
                { country: countryName }
            )
                .pipe(
                    map((response: any) => {
                        return response.data.states.map((state: any) => {
                            return {
                                value: state.name,
                                label: state.name
                            } as SelectOptionModel
                        })
                    })
                )
        }
        return of([])
    }

    getCountries(): Observable<SelectOptionModel[]> {
        return this._httpClient.get(
            this._baseURL + '/iso'
        )
            .pipe(
                map((response: any) => {
                    return response.data.map((country: any) => {
                        return {
                            value: country.name,
                            label: country.name
                        } as SelectOptionModel
                    })
                })
            )
    }

    getCities(countryName?: string | null, stateName?: string | null): Observable<SelectOptionModel[]> {
        if (countryName && countryName !== null && countryName !== '') {
            if (stateName && stateName !== null && stateName !== '') {
                return this._httpClient.post(
                    this._baseURL + '/state/cities',
                    { country: countryName, state: stateName }
                )
                    .pipe(
                        map((response: any) => {
                            return response.data.map((city: any) => {
                                return {
                                    value: city,
                                    label: city
                                } as SelectOptionModel
                            })
                        })
                    )
            } else {
                return this._httpClient.post(
                    this._baseURL + '/state/cities',
                    { country: countryName, state: stateName }
                )
                    .pipe(
                        map((response: any) => {
                            return response.data.states.map((state: any) => {
                                return {
                                    value: state.name,
                                    label: state.name
                                } as SelectOptionModel
                            })
                        })
                    )
            }
        }
        return of([])
    }

    getCountriesPhonePrefices(): Observable<SelectOptionModel[]> {
        return this._httpClient.get(
            this._baseURL + '/codes'
        )
            .pipe(
                map((response: any) => mapPrefix(response.data))
            )
    }

}
