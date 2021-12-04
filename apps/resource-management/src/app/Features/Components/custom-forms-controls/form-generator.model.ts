import { Directive, Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { validateEmailAddress, validateFirstName, validateLastName, validateMiddleName, validateNationality, validatePhoneNumber } from "../../Services/supporting-services/custom.validators";
import { CountryDetailStateService } from "../../state-services/country-detail.state-service";

@Injectable({
    providedIn: 'root'
})
export class FormGenerator {

    public readonly countriesData$: Observable<string[]> = of(['+1', '+251'])
    
    personalDetailsForm: FormGroup
    organizationalForm: FormGroup

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _countryDetailStateService: CountryDetailStateService
    ) {
        this.personalDetailsForm = this._createPersonalDetailsForm()
        this.organizationalForm = this._createOrganizationalnalDetailsForm()
    }

    getPersonalDetailsForm() {
        return this._formBuilder.group({
            employeeIdNumberPrefix: [this._countryDetailStateService.defaultEmployeeIdNumberPrefices],
            employeeIdNumber: [null],
            firstName: [null, [validateFirstName]],
            middleName: [null, [validateMiddleName]],
            lastName: [null, [validateLastName]],
            gender: [null],
            dateofBirth: [null],
            emailAddresses: this._formBuilder.array([
                this.getEmailControl()
            ]),
            phoneNumbers: this._formBuilder.array([
                this.getPhoneNumberFormGroup()
            ]),
            nationalities: [null]
        });
    }

    private _createPersonalDetailsForm(
        personalDetail?: unknown
    ) {
        const employeeIdPrefix = this._countryDetailStateService.defaultEmployeeIdNumberPrefices
        return this._formBuilder.group({
            employeeIdNumberPrefix: [employeeIdPrefix],
            employeeIdNumber: [null],
            firstName: [null, [validateFirstName]],
            middleName: [null, [validateMiddleName]],
            lastName: [null, [validateLastName]],
            gender: [null],
            dateofBirth: [null],
            emailAddresses: this._formBuilder.array([
                this.getEmailControl()
            ]),
            phoneNumbers: this._formBuilder.array([
                this.getPhoneNumberFormGroup()
            ]),
            nationalities: [null, [Validators.required, validateNationality]]
        });
    }

    private _createOrganizationalnalDetailsForm(
        personalDetail?: unknown
    ) {
        return this._formBuilder.group({
            country: [null],
            dutyStation: [null],
            companyEmail: this.getEmailControl(),
            phoneNumber: this.getPhoneNumberFormGroup(),
            jobTitle: [null],
            businessUnit: [null],
            department: [null],
            reportingManager: [null],
            employeementType: [null],
            joiningDate: [null],
            terminationDate: [null],
            status: [null]
        });
    }

    getEmailControl(email?: string) {
        return this._formBuilder.control(
            email? email: null,
            [validateEmailAddress]
        )
    }

    getPhoneNumberFormGroup(phone?: string) {
        const segments: any = {
            prefix: null,
            value: null
        }
        return this._formBuilder.group({
            prefix: [null], // [segments.prefix],
            phone: [null, [validatePhoneNumber]], // [segments.value]
        })
    }

}