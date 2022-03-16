import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { CountriesMockService } from "../../Services/external-api.services/countries.mock.service";

export type ExtractedData = {
    prefix: any,
    value: any,
    suffix: any
}

export class FormGeneratorAssistant {

    private _employeeIdNumberPrefices: string[] = []
    private _phonePrefices: string[] = []

    constructor(
        private readonly _countriesMokService: CountriesMockService
    ) {
        this._countriesMokService.getCountriesPhonePrefices()
            .subscribe((response: SelectOptionModel[]) => {
                this._phonePrefices = response.map(option => option.value as string)
            })
    }

    protected _extractEmployeeIdNumber(employeeIdNumber?: string | null): ExtractedData {
        const result = {
            prefix: this._employeeIdNumberPrefices[0],
            value: null,
            suffix: null
        } as ExtractedData
        
        if (employeeIdNumber && employeeIdNumber !== null && employeeIdNumber !== '') {
            let noofMatches = 0
            for (let i = 0; i < this._employeeIdNumberPrefices.length; i++) {
                
                const prefix = employeeIdNumber.substring(0, this._employeeIdNumberPrefices[i].length)
                console.log(this._employeeIdNumberPrefices[i] === prefix
                    && this._employeeIdNumberPrefices[i].length > noofMatches)
                if (this._employeeIdNumberPrefices[i] === prefix
                    && this._employeeIdNumberPrefices[i].length > noofMatches) {
                        result.prefix = this._employeeIdNumberPrefices[i]
                    noofMatches = this._employeeIdNumberPrefices[i].length
                   
                }
            }
            result.value = employeeIdNumber.substring(noofMatches);
        }
        return result
    }

    protected _extractPhoneNumber(phoneNumber?: string | null): ExtractedData {
        const result = {
            prefix: '+251',
            value: null,
            suffix: null
        } as ExtractedData
        if (phoneNumber && phoneNumber !== null && phoneNumber !== '') {
            let noofMatches = 0
            for (let i = 0; i < this._phonePrefices.length; i++) {
                // console.log(this._phonePrefices[i])
                const prefix = phoneNumber.substring(0, this._phonePrefices[i].length)
                if (this._phonePrefices[i] === prefix
                    && prefix.length > noofMatches) {
                    result.prefix = this._phonePrefices[i]
                    noofMatches = this._phonePrefices[i].length
                }
            }
            result.value = phoneNumber.substring(noofMatches);
        }
        return result
    }

    

}