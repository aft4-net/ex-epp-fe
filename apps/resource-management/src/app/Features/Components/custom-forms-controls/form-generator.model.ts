import { Directive, Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Address, Addresss } from "../../Models/address.model";
import { EmployeeDetail } from "../../Models/core-models/employee-detail.model";
import { PersonalDetail } from "../../Models/core-models/personal-detailsmodel";
import { EmergencyContact } from "../../Models/emergencycontact";
import { Employee } from "../../Models/Employee";
import { EmployeeOrganization } from "../../Models/EmployeeOrganization/EmployeeOrganization";
import { Nationality } from "../../Models/Nationality";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { commonErrorMessage, resetError, validateEmailAddress, validateEmployeeIdNumber, validateFirstName, validateLastName, validateMiddleName, validateNationality, validatePhoneNumber } from "../../Services/supporting-services/custom.validators";
import { PersonalDetailDataStateService } from "../../state-services/personal-detail-data.state-service";

type ExtractedData = {
    prefix: any,
    value: any,
    suffix: any
}

export type FormNaming = {
    name: string
    type: string
    controls?: FormNaming[]
    array?: FormNaming[]
    groups?: FormNaming[]
}
export const formGroups = {
    personalDetailForm: {
        name: 'personalDetailsForm',
        controls: {
            gender: 'gender',
            dateofBirth: 'dateofBirth',
            nationalities: 'nationalities'
        },
        arrays: {
            phoneNumbers: 'phoneNumbers',
            emailAddresses: 'emailAddresses'
        },
        groups: {
            employeeIdNumber: 'employeeIdNumber',
            fullName: 'fullName'
        }
    },
    employeeIdNumber: {

    }
}

@Injectable({
    providedIn: 'root'
})
export class FormGenerator {

    private _defaultEmployeeIdNumberPrefix: any
    private _defaultPhonePrefix: any
    private readonly _phonePrefices: string[] = []

    public readonly countriesData$: Observable<string[]> = of(['+1', '+251'])

    public personalDetailsForm: FormGroup
    public organizationalForm: FormGroup
    public addressForm: FormGroup
    public emergencyContact: FormGroup
    public familyDetail: FormGroup

    public readonly address: Address[] = []


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _personalDetailStateService: PersonalDetailDataStateService
    ) {

        this._personalDetailStateService.defaultEmployeeIdNumberPrefix$
            .subscribe((response: SelectOptionModel) => {
                this._defaultEmployeeIdNumberPrefix = response.value
            })
        this._personalDetailStateService.defaulPhonePrefix$
            .subscribe((response: SelectOptionModel) => {
                this._defaultPhonePrefix = response.value
            })

        this.personalDetailsForm = this._createPersonalDetailsForm()
        this.organizationalForm = this._createOrganizationalnalDetailsForm()
        this.addressForm = this._createAddressDetailsForm()
        this.emergencyContact = this._createEmergencyContactDetailsForm()
        this.familyDetail = this._createFamilyDetailsForm()
    }

    private _createPersonalDetailsForm() {
        return this._formBuilder.group({
            employeeIdNumber: this._createEmployeeIdNumberFormGroup(),
            fullName: this._createFullNameFormGroup(),
            gender: [null],
            dateofBirth: [null],
            emailAddresses: this._formBuilder.array([
                this.createEmailControl()
            ]),
            phoneNumbers: this._formBuilder.array([
                this.createPhoneNumberFormGroup()
            ]),
            nationalities: [null, [validateNationality]]
        });
    }

    private _createOrganizationalnalDetailsForm() {
        return this._formBuilder.group({
            country: [null],
            dutyStation: [null],
            companyEmail: this._formBuilder.array([
                this.createEmailControl()
            ]),
            phoneNumber: this._formBuilder.array([
                this.createPhoneNumberFormGroup()
            ]),
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

    private _createAddressDetailsForm() {
        return this._formBuilder.group({
            country: [null],
            state: [null],
            city: [null],
            subCityZone: [null],
            woreda: [null],
            houseNumber: [null],
            postalCode: [null],
            phoneNumber: this._formBuilder.array([
                this.createPhoneNumberFormGroup()
            ]),
        });
    }

    private _createFamilyDetailsForm() {
        return this._formBuilder.group({
            maritalStatus: [null],
            relationship: [null],
            fullName: this._createFullNameFormGroup(),
            gender: [null],
            dateofBirth: [null]
        });
    }

    private _createEmergencyContactDetailsForm() {
        return this._formBuilder.group({
            fullName: this._createFullNameFormGroup(),
            relationship: []
        });
    }

    private _createEmployeeIdNumberFormGroup() {
        return this._formBuilder.group({
            prefix: [this._defaultEmployeeIdNumberPrefix],
            idNumber: [null, [validateEmployeeIdNumber]],
        })
    }

    private _createFullNameFormGroup() {
        return this._formBuilder.group({
            firstName: [null, [validateFirstName]],
            middleName: [null, [validateMiddleName]],
            lastName: [null, [validateLastName]],
        })
    }

    createEmailControl() {
        return this._formBuilder.control(
            null,
            [validateEmailAddress]
        )
    }

    createPhoneNumberFormGroup() {
        return this._formBuilder.group({
            prefix: [this._defaultPhonePrefix],
            phone: [null, [validatePhoneNumber]],
        })
    }

    getFormControl(name: string, formGroup: FormGroup): FormControl {
        return formGroup.get(name) as FormControl
    }

    getFormArray(name: string, formGroup: FormGroup): FormArray {
        return formGroup.get(name) as FormArray
    }

    getFormControlfromArray(index: number, formArray: FormArray): FormControl | undefined {
        if(index >= formArray.length) {
            return undefined
        }
        return formArray.at(index) as FormControl
    }

    getFormGroupfromArray(index: number, formArray: FormArray): FormGroup | undefined {
        if(index >= formArray.length) {
            return undefined
        }
        return formArray.at(index) as FormGroup
    }

    getFormGroup(name: string, formGroup: FormGroup): FormGroup {
        return formGroup.get(name) as FormGroup
    }

    private _setControlValue(value: any, control?: FormControl) {
        if(control) {
            control.setValue(value)
        }
    }

    private _setEmployeeIdNumber(employeeIdNumber: string, formGroup: FormGroup) {
        const segments = this._extractEmployeeIdNumber(employeeIdNumber)
        if (segments.value !== null) {
            this._setControlValue(segments.prefix, this.getFormControl('prefix', formGroup))
            this._setControlValue(segments.value, this.getFormControl('idNumber', formGroup))
        }
    }

    private _setNames(first: string | null, middle: string | null, last: string | null, formGroup: FormGroup) {
        this._setControlValue(first, this.getFormControl('firstName', formGroup))
        this._setControlValue(middle, this.getFormControl('middleName', formGroup))
        this._setControlValue(last, this.getFormControl('lastName', formGroup))
    }

    private _setPhoneNumber(phoneNumber: string, formGroup: FormGroup) {
        const segemets = this._extractPhoneNumber(phoneNumber)
        if(segemets.value !== null) {
            this._setControlValue(segemets.prefix, this.getFormControl('prefix', formGroup))
            this._setControlValue(segemets.value, this.getFormControl('phone', formGroup))
        }
    }
    
    private _setEmailArray(emails: string[] | null, formArray: FormArray) {
        if(emails !== null && emails.length > 0) {
            for (let i = 0; i < emails.length; i++) {
                const existingControl = this.getFormControlfromArray(i, formArray)
                if(existingControl !== undefined) {
                    this._setControlValue(emails[i], existingControl)
                } else {
                    const newControl = this.createEmailControl()
                    this._setControlValue(emails[i], newControl)
                    formArray.push(newControl)
                }
            }
        }
    }

    private _setPhoneArray(phoneNumbers: string[], formArray: FormArray) {
        for (let i = 0; i < phoneNumbers.length; i++) {
            const existingFormGroup = this.getFormGroupfromArray(i, formArray)
            if(existingFormGroup !== undefined) {
                this._setPhoneNumber(phoneNumbers[i], existingFormGroup)
            } else {
                const newFormGroup = this.createPhoneNumberFormGroup()
                this._setPhoneNumber(phoneNumbers[i], newFormGroup)
                formArray.push(newFormGroup)
            }
        }
    }

    private _setPresonalDetail(employee: Employee) {
        if(employee.employeeNumber) {
            this._setEmployeeIdNumber(
                employee.employeeNumber,
                this.getFormGroup('employeeIdNumber', this.personalDetailsForm)
            )
        }
        
        if(employee.FirstName && employee.FatherName && employee.GrandFatherName) {
            this._setNames(
                employee.FirstName,
                employee.FatherName,
                employee.GrandFatherName,
                this.getFormGroup('fullName', this.personalDetailsForm)
            )
        }

        if(employee.Gender) {
            this._setControlValue(
                employee.Gender,
                this.getFormControl('gender', this.personalDetailsForm)
            )
        }

        if(employee.DateofBirth) {
            this._setControlValue(
                employee.DateofBirth,
                this.getFormControl('dateofBirth', this.personalDetailsForm)
            )        
        }

        this._setEmailArray(
            [
                employee.PersonalEmail,
                employee.PersonalEmail2,
                employee.PersonalEmail3

            ],
            this.getFormArray('emailAddresses', this.personalDetailsForm)
        )

        this._setPhoneArray(
            [
                employee.Phone1,
                employee.Phone2,
                employee.MobilePhone

            ],
            this.getFormArray('phoneNumbers', this.personalDetailsForm)
        )
        
        this._setControlValue(
            employee.Nationality,
            this.getFormControl('nationalities', this.personalDetailsForm)
        )
    }

    private _setOrganizationalDetail(organizationalDetail: EmployeeOrganization) {
        this._setControlValue(
            organizationalDetail.DutyStation,
            this.getFormControl('country', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.DutyBranch,
            this.getFormControl('dutyStation', this.organizationalForm)
        )
        this._setEmailArray(
            [
                organizationalDetail.CompaynEmail
            ],
            this.getFormArray('companyEmail', this.organizationalForm)
        )

        this._setPhoneArray(
            [
                organizationalDetail.PhoneNumber
            ],
            this.getFormArray('phoneNumber', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.JobTitle,
            this.getFormControl('jobTitle', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.BusinessUnit,
            this.getFormControl('businessUnit', this.organizationalForm)
        )
        
        this._setControlValue(
            organizationalDetail.Department,
            this.getFormControl('department', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.ReportingManager,
            this.getFormControl('reportingManager', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.EmploymentType,
            this.getFormControl('employeementType', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.JoiningDate,
            this.getFormControl('joiningDate', this.organizationalForm)
        )
        this._setControlValue(
            organizationalDetail.TerminationDate,
            this.getFormControl('terminationDate', this.organizationalForm)
        )
        
        this._setControlValue(
            organizationalDetail.Status,
            this.getFormControl('status', this.organizationalForm)
        )
    }

    private _setAddressDetail(address: Address) {
        this._setControlValue(
            address.Country,
            this.getFormControl('country', this.addressForm)
        )
        this._setControlValue(
            address.StateRegionProvice,
            this.getFormControl('state', this.addressForm)
        )
        this._setControlValue(
            address.City,
            this.getFormControl('city', this.addressForm)
        )
        this._setControlValue(
            address.SubCityZone,
            this.getFormControl('subCityZone', this.addressForm)
        )
        this._setControlValue(
            address.Woreda,
            this.getFormControl('woreda', this.addressForm)
        )
        this._setControlValue(
            address.HouseNumber,
            this.getFormControl('houseNumber', this.addressForm)
        )
        this._setControlValue(
            address.PostalCode,
            this.getFormControl('postalCode', this.addressForm)
        )
        this._setPhoneArray(
            [
                address.PhoneNumber
            ],
            this.getFormArray('phoneNumber', this.addressForm)
        )
    }

    // private _setEmergencyContactDetail(emergencyContact: EmergencyContact) {
    //     this._setControlValue(
    //         emergencyContact.Country,
    //         this.getFormControl('country', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.StateRegionProvice,
    //         this.getFormControl('state', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.City,
    //         this.getFormControl('city', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.SubCityZone,
    //         this.getFormControl('subCityZone', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.Woreda,
    //         this.getFormControl('woreda', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.HouseNumber,
    //         this.getFormControl('houseNumber', this.addressForm)
    //     )
    //     this._setControlValue(
    //         emergencyContact.PostalCode,
    //         this.getFormControl('postalCode', this.addressForm)
    //     )
    //     this._setPhoneArray(
    //         [
    //             emergencyContact.PhoneNumber
    //         ],
    //         this.getFormArray('phoneNumber', this.addressForm)
    //     )
    // }

    private _regenerateForm() {
        this.personalDetailsForm = this._createPersonalDetailsForm()
        this.organizationalForm = this._createOrganizationalnalDetailsForm()
        this.addressForm = this._createAddressDetailsForm()
        this.emergencyContact = this._createEmergencyContactDetailsForm()
        this.familyDetail = this._createFamilyDetailsForm()
    }

    generateForms(employee?: Employee) {
        this._regenerateForm()
        if(employee) {
            this._setPresonalDetail(employee)
            if(employee.Organization) {
                this._setOrganizationalDetail(employee.Organization)
            }
        }
    }

    generateAddressForm(address?: Addresss) {
        this.addressForm = this._createAddressDetailsForm()
        if(address) {
            this._setAddressDetail(address)
        }
    }
    
    triggerControlValidation(control: AbstractControl, required: boolean) {
        resetError(required)
        const value = control.value
        control.setValue(null)
        control.setValue(value)
        return commonErrorMessage.message.substring(0)
    }

    triggerValidation(control: FormControl | FormArray | FormGroup) {

    }

    private _extractEmployeeIdNumber(employeeIdNumber?: string): ExtractedData {
        const result = {
            prefix: this._defaultEmployeeIdNumberPrefix,
            value: null,
            suffix: null
        } as ExtractedData
        if (employeeIdNumber) {
            this._personalDetailStateService.employeeIdNumberPrefices$
                .subscribe((options: SelectOptionModel[]) => {
                    let index = -1
                    let noofMatches = 0
                    for (let i = 0; i < options.length; i++) {
                        if (employeeIdNumber.indexOf(options[i].label) === 0
                            && options[i].label.length > noofMatches) {
                            index = i
                            noofMatches = options[i].label.length
                        }
                    }
                    if (index === -1) {
                        window.alert('Incoming employee id number is corrupted!')
                    } else {
                        result.prefix = options[index].value,
                            result.value = employeeIdNumber.substring(noofMatches)
                    }
                })
        }
        return result
    }

    private _extractPhoneNumber(phoneNumber?: string): ExtractedData {
        const result = {
            prefix: this._defaultPhonePrefix,
            value: null,
            suffix: null
        } as ExtractedData
        if (phoneNumber) {
            this._personalDetailStateService.phonePrefices$
                .subscribe((options: SelectOptionModel[]) => {
                    let index = -1
                    let noofMatches = 0
                    for (let i = 0; i < options.length; i++) {
                        if (phoneNumber.indexOf(options[i].label) === 0
                            && options[i].label.length > noofMatches) {
                            index = i
                            noofMatches = options[i].label.length
                        }
                    }
                    if (index === -1) {
                        window.alert('Incoming phone number is corrupted!')
                    } else {
                        result.prefix = options[index].value,
                            result.value = phoneNumber.substring(noofMatches)
                    }
                })
        }
        return result
    }

}