import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { Employee } from "../../Models/Employee";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { AddressCountryStateService, CountriesMockService } from "../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "./form-generator.model";

export type ExtractedData = {
    prefix: any,
    value: any,
    suffix: any
}

export class FormGeneratorAssistant {

    private _employeeIdNumberPrefices: string[] = []
    private _phonePrefices: string[] = []

    constructor(
        private readonly _employeeStaticDataMockService: EmployeeStaticDataMockService,
        private readonly _addressCountryStateService: CountriesMockService
    ) {
        this._employeeStaticDataMockService.employeeIdNumberPrefices$
            .subscribe((response: SelectOptionModel[]) => {
                this._employeeIdNumberPrefices = response.map(option => option.value as string)
            });
        this._addressCountryStateService.getCountriesPhonePrefices()
            .subscribe((response: SelectOptionModel[]) => {
                this._phonePrefices = response.map(option => option.value as string)
            })

        const segments = this._extractPhoneNumber('+151983351881')
        console.log('Phone Number Extraction')
        console.log(segments)
    }

    protected _extractEmployeeIdNumber(employeeIdNumber?: string | null): ExtractedData {
        const result = {
            prefix: this._employeeIdNumberPrefices[0],
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
                this._employeeIdNumberPrefices[0]
                : this._employeeIdNumberPrefices[index];
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
            console.log('Phone extraction function!', this._phonePrefices.length)
            let index = -1
            let noofMatches = 0
            for (let i = 0; i < this._phonePrefices.length; i++) {
                // console.log(this._phonePrefices[i])
                const prefix = phoneNumber.substring(0, this._phonePrefices[i].length)
                if (this._phonePrefices[i] === prefix
                    && prefix.length > noofMatches) {
                    console.log('Phone prefix found!')
                    console.log(this._phonePrefices[i])
                    result.prefix = this._phonePrefices[i]
                    noofMatches = this._phonePrefices[i].length
                }
            }
            result.value = phoneNumber.substring(noofMatches);
        }
        return result
    }

    errorMessageforPersonalDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 0 || i === 1) {
                this.errorMessageForGroups(control as FormGroup)
            } else if (i === 4) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 5) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforOrganizationDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 2) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 3) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforAddressDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 6) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforFamilyDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 1) {
                this.errorMessageForGroups(control as FormGroup)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforEmergencyContactDetails(emergencyGroup: FormGroup, addressGroup: FormGroup) {
        let i = 0
        Object.values(emergencyGroup.controls).forEach(control => {
            if (i === 0) {
                this.errorMessageForGroups(control as FormGroup)
            } else if (i === 2) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 3) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
        i = 0
        Object.values(addressGroup.controls).forEach(control => {
            this.validateControl(control as FormControl)
            //   if (i === 6) {
            //       this.errorMessageForPhone(control as FormArray)
            //   } else {
            //       this.validateControl(control as FormControl)
            //   }
            //   i += 1
        });

    }

    errorMessageForGroups(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            this.validateControl(control as FormControl)
        });
    }

    errorMessageForEmail(formArray: FormArray) {
        Object.values(formArray.controls).forEach(control => {
            this.validateControl(control as FormControl)
        });
    }

    errorMessageForPhone(formArray: FormArray) {
        Object.values(formArray.controls).forEach(control => {
            this.errorMessageForGroups(control as FormGroup)
        });
    }

    validateControl(control: FormControl) {
        if (control.invalid) {
            const value = control.value
            control.setValue(null)
            control.setValue(value)
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
    }

}