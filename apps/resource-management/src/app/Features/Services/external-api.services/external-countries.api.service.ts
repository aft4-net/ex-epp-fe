import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CityDetail, CountryDetail, StateDetail } from "../../Models/supporting-models/country-detail.model";
import { ReadonlySeedApiService } from "../seed.api-service/readonly-seed.api.service";
import { citiesURL, countriesURL, statesURL } from "../supporting-services/basic-data.collection";

@Injectable({
    providedIn: 'root'
})
export class ExternalCountryApiService extends ReadonlySeedApiService<CountryDetail> {

    protected _getParameters(country: string): HttpParams {
        throw new Error("Method not implemented.");
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, countriesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((country: any) => {
                            return {
                                name: country.name,
                                nationality: country.nationality
                            } as CountryDetail
                        })
                })
            }
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalStateRegionApiService extends ReadonlySeedApiService<StateDetail> {

    protected _getParameters(country: string): unknown {
        return JSON.stringify({ country: country })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, statesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data.states
                        .map((state: any) => {
                            return {
                                name: state.name
                            } as StateDetail
                        })
                })
            }
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalCitiesApiService extends ReadonlySeedApiService<CityDetail> {

    _getParameters(country: string, state: string): unknown {
        return JSON.stringify({ country: country, state: state })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, citiesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((cities: any) => {
                            return {
                                name: cities.name
                            } as CityDetail
                        })
                })
            }
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalPhonePrefixApiService extends ReadonlySeedApiService<CountryDetail> {

    _getParameters(country: string, state: string): unknown {
        return JSON.stringify({ country: country, state: state })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, citiesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((country: any) => {
                            return {
                                name: country.name,
                                phonePrefix: country.dial_code,
                                phoneDigits: { min: 9, max: 15 }
                            } as CountryDetail
                        })
                })
            }
        )
    }

}
