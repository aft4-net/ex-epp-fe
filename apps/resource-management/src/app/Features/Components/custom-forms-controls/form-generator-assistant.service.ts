import { Injectable } from "@angular/core";
import { Employee } from "../../Models/Employee";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { AddressCountryStateService } from "../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "./form-generator.model";

export type ExtractedData = {
    prefix: any,
    value: any,
    suffix: any
}

export class FormGeneratorAssistant {

    private readonly _employeeIdNumberPrefices: string[] = []
    private readonly _phonePrefices: string[] = []

    constructor(
        private readonly _employeeStaticDataMockService: EmployeeStaticDataMockService,
        private readonly _addressCountryStateService: AddressCountryStateService
    ) {
        this._employeeStaticDataMockService.employeeIdNumberPrefices$
            .subscribe((response: SelectOptionModel[]) => {
                this._employeeIdNumberPrefices.concat(
                    response.map(option => option.value as string)
                )
            });
        this._addressCountryStateService.phonePrefices$
            .subscribe((response: SelectOptionModel[]) => {
                this._phonePrefices.concat(
                    response.map(option => option.value as string)
                )
            })
    }

    protected _extractEmployeeIdNumber(employeeIdNumber?: string | null): ExtractedData {
        const result = {
            prefix: 'EDC/DT',
            value: null,
            suffix: null
        } as ExtractedData
        if (employeeIdNumber && employeeIdNumber !== null && employeeIdNumber !== '') {
            let index = -1
            let noofMatches = 0
            for (let i = 0; i < this._employeeIdNumberPrefices.length; i++) {
                if (employeeIdNumber.indexOf(this._phonePrefices[i]) === 0
                    && this._employeeIdNumberPrefices[i].length > noofMatches) {
                    index = i
                    noofMatches = this._employeeIdNumberPrefices[i].length
                }
            }
            result.prefix = index === -1 ?
                'EDC/DT'
                : this._employeeIdNumberPrefices[index];
            result.value = employeeIdNumber.substring(noofMatches);
        }
        return result
    }

    protected _extractPhoneNumber(phoneNumber?: string | null): ExtractedData {
        const result = {
            prefix: this._addressCountryStateService.defaultPhonePrefix,
            value: null,
            suffix: null
        } as ExtractedData
        if (phoneNumber && phoneNumber !== null && phoneNumber !== '') {
            let index = -1
            let noofMatches = 0
            for (let i = 0; i < this._employeeIdNumberPrefices.length; i++) {
                if (phoneNumber.indexOf(this._phonePrefices[i]) === 0
                    && this._phonePrefices[i].length > noofMatches) {
                    index = i
                    noofMatches = this._phonePrefices[i].length
                }
            }
            result.prefix = index === -1 ?
                this._addressCountryStateService.defaultPhonePrefix
                : this._employeeIdNumberPrefices[index];
            result.value = phoneNumber.substring(noofMatches);
        }
        return result
    }

}