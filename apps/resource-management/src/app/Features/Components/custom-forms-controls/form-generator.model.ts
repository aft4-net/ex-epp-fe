import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Address, Addresss } from "../../Models/address.model";
import { EmergencyContact, EmergencyContacts } from "../../Models/emergencycontact";
import { Employee } from "../../Models/Employee";
import { EmployeeOrganization } from "../../Models/EmployeeOrganization/EmployeeOrganization";
import { FamilyDetail } from "../../Models/FamilyDetail/FamilyDetailModel";
import { FamilyDetails } from "../../Models/FamilyDetails";
import { Nationality } from "../../Models/Nationality";
import { Relationship } from "../../Models/Relationship";
import { AddressCountryStateService, CountriesMockService } from "../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../Services/external-api.services/employee-static-data.mock.service";
import { commonErrorMessage, resetError, validateEmailAddress, validateEmployeeIdNumber, validateFirstName, validateLastName, validateMiddleName, validateNationality, validatePhoneNumber, validateRequired } from "../../Services/supporting-services/custom.validators";
import { FormGeneratorAssistant } from "./form-generator-assistant.service";


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
export class FormGenerator extends FormGeneratorAssistant {

    private _defaultEmployeeIdNumberPrefix: any
    private _defaultPhonePrefix: any

    public readonly countriesData$: Observable<string[]> = of(['+1', '+251'])

    public personalDetailsForm: FormGroup
    public organizationalForm: FormGroup
    public addressForm: FormGroup
    public emergencyContact: FormGroup
    public emergencyAddress: FormGroup
    public familyDetail: FormGroup

    public readonly address: Address[] = []


    constructor(
        private readonly _formBuilder: FormBuilder,
        employeeStaticDataMockService: EmployeeStaticDataMockService,
        addressCountryStateService: CountriesMockService
    ) {
        super(
            employeeStaticDataMockService,
            addressCountryStateService
        )
        this.personalDetailsForm = this._createPersonalDetailsForm()
        this.organizationalForm = this._createOrganizationalnalDetailsForm()
        this.addressForm = this._createAddressDetailsForm()
        this.emergencyContact = this._createEmergencyContactDetailsForm()
        this.emergencyAddress = this._createEmergencyAddressDetailsForm()
        this.familyDetail = this._createFamilyDetailsForm()

    }

    getModelPersonalDetails() {
        const value = this.personalDetailsForm.value
        return {
            employeeNumber: value.employeeIdNumber.prefix + value.employeeIdNumber.idNumber,
            FirstName: value.fullName.firstName,
            FatherName: value.fullName.middleName,
            GrandFatherName: value.fullName.lastName,
            Gender: value.gender,
            PersonalEmail: value.emailAddresses[0],
            PersonalEmail2: value.emailAddresses.lenght > 1? value.emailAddresses[1]: undefined,
            PersonalEmail3: value.emailAddresses.lenght > 2? value.emailAddresses[2]: undefined,
            MobilePhone: value.phoneNumbers[0].prefix + value.phoneNumbers[0].phone,
            Phone1: value.phoneNumbers.lenght > 1? value.phoneNumbers[1].prefix + value.phoneNumbers[1]: undefined,
            Phone2: value.phoneNumbers.lenght > 2? value.phoneNumbers[2].prefix + value.phoneNumbers[2]: undefined,
            Nationality: value.nationalities.map((nationality: string)=>{
                return {
                    ...{} as Nationality,
                    ...{
                        Name: nationality
                    } as Partial<Nationality>
                }
            })
        } as Partial<Employee>
    }
    getModelOrganizationDetails() {
        const value = this.organizationalForm.value
        return {
            Country: value.country,
            DutyBranch: value.dutyStation,
            CompaynEmail:  value.companyEmail[0],
            PhoneNumber: value.phoneNumber[0].prefix + value.phoneNumber[0].phone,
            JobTitle: value.jobTitle,
            BusinessUnit: value.businessUnit,
            Department: value.department,
            ReportingManager: value.reportingManager,
            EmploymentType: value.employeementType,
            JoiningDate: value.JoiningDate,
            TerminationDate: value.terminationDate,
            Status: value.status
        } as Partial<EmployeeOrganization>
    }
    getModelAddressDetails() {
        const value = this.addressForm.value
        return {
            Country: value.country,
            StateRegionProvice: value.state,
            City: value.city,
            SubCityZone: value.subCityZone,
            Woreda: value.woreda,
            HouseNumber: value.houseNumber,
            PostalCode: value.postalCode,
            PhoneNumber: value.phoneNumber[0].prefix + value.phoneNumber[0].phone
        } as Partial<Address>
    }
    getModelFamilyDetails() {
        const value = this.familyDetail.value
        return {
            FullName: value.fullName.firstName + ' ' + value.fullName.middleName + ' ' + value.fullName.lastName,
            Relationship: {Name: value.relationship } as Relationship,
            Gender: value.gender,
            DoB: value.dateofBirth
        } as Partial<FamilyDetails>

    }
    getModelEmergencyContactDetails() {
        const value = this.emergencyContact.value
        const valueAddress = this.emergencyAddress.valid
        return {

            FirstName: value.fullName.firstName,
            MiddleName:value.fullName.middleName ,
            LastName:value.fullName.lastName,
            Relationship:value.relationship ,
            Gender: value.gender,
            DoB: value.dateofBirth,
            PhoneNumber:value.phoneNumber,
            Country:value.country
        } as Partial<EmergencyContacts>

    }

    private _createPersonalDetailsForm() {
        return this._formBuilder.group({
            employeeIdNumber: this._createEmployeeIdNumberFormGroup(),
            fullName: this._createFullNameFormGroup(),
            gender: [null, validateRequired],
            dateofBirth: [null, validateRequired],
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
            country: [null, validateRequired],
            dutyStation: [null, validateRequired],
            companyEmail: this._formBuilder.array([
                this.createEmailControl()
            ]),
            phoneNumber: this._formBuilder.array([
                this.createPhoneNumberFormGroup()
            ]),
            jobTitle: [null, validateRequired],
            businessUnit: [null, validateRequired],
            department: [null, validateRequired],
            reportingManager: [null, validateRequired],
            employeementType: [null, validateRequired],
            joiningDate: [null, validateRequired],
            terminationDate: [null],
            status: ['Active', validateRequired]
        });
    }

    private _createAddressDetailsForm() {
        return this._formBuilder.group({
            country: [null, validateRequired],
            state: [null],
            city: [null, validateRequired],
            subCityZone: [null, validateRequired],
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
            relationship: [null, validateRequired],
            fullName: this._createFullNameFormGroup(),
            gender: [null],
            dateofBirth: [null]
        });
    }

    private _createEmergencyContactDetailsForm() {
        return this._formBuilder.group({
            fullName: this._createFullNameFormGroup(),
            relationship: [null, validateRequired],
            emailAddresses: this._formBuilder.array([
                this.createEmailControl()
            ]),
            phoneNumbers: this._formBuilder.array([
                this.createPhoneNumberFormGroup()
            ]),
        });
    }

    private _createEmergencyAddressDetailsForm() {
        return this._formBuilder.group({
            country: [null, validateRequired],
            state: [null],
            city: [null, validateRequired],
            subCityZone: [null, validateRequired],
            woreda: [null],
            houseNumber: [null],
            postalCode: [null],
        });
    }


    private _createEmployeeIdNumberFormGroup() {
        return this._formBuilder.group({
            prefix: ['EDC/DT'],
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
        const segments = this._extractPhoneNumber()
        return this._formBuilder.group({
            prefix: [segments.prefix],
            phone: [segments.value, [validatePhoneNumber]],
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

        if(employee.FirstName && employee.FatherName) {
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
            employee.Nationality?.map(nationality => nationality.Name),
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

    private _setEmergencyContactDetail(emergencyContact: EmergencyContacts) {
        if(emergencyContact.FirstName && emergencyContact.MiddleName) {
            this._setNames(
                emergencyContact.FirstName,
                emergencyContact.MiddleName,
                'X',
                this.getFormGroup('fullName', this.emergencyContact)
            )
        }
        this._setControlValue(
            emergencyContact.Relationship,
            this.getFormControl('relationship', this.emergencyContact)
        )
        this._setEmailArray(
            [

            ],
            this.getFormArray('emailAddresses', this.emergencyContact)
        )

        this._setPhoneArray(
            [
            ],
            this.getFormArray('phoneNumbers', this.emergencyContact)
        )
        this._setControlValue(
            emergencyContact.Country,
            this.getFormControl('country', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.stateRegionProvice,
            this.getFormControl('state', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.city,
            this.getFormControl('city', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.subCityZone,
            this.getFormControl('subCityZone', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.woreda,
            this.getFormControl('woreda', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.houseNumber,
            this.getFormControl('houseNumber', this.emergencyAddress)
        )
        this._setControlValue(
            emergencyContact.postalCode,
            this.getFormControl('postalCode', this.emergencyAddress)
        )
    }

    private _setFamilyDetail(familyDetail: FamilyDetail) {
        const names = familyDetail.FullName.split(' ')
        this._setNames(
            names[0],
            (names.length === 3? names[1]: null),
            (names.length === 3? names[2]: names[1]),
            this.getFormGroup('fullName', this.familyDetail)
        )
        this._setControlValue(
            familyDetail.Relationship,
            this.getFormControl('relationship', this.familyDetail)
        )
        this._setControlValue(
            familyDetail.Gender,
            this.getFormControl('gender', this.familyDetail)
        )
        this._setControlValue(
            familyDetail.DateofBirth,
            this.getFormControl('dateofBirth', this.familyDetail)
        )
    }

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
            if(employee.EmployeeOrganization) {
                this._setOrganizationalDetail(employee.EmployeeOrganization)
            }
        }
    }

    generateAddressForm(address?: Addresss) {
        this.addressForm = this._createAddressDetailsForm()
        if(address) {
            this._setAddressDetail(address)
        }
    }

    generateEmergencyContactForm(emergencyContact?: EmergencyContacts) {
        this.emergencyContact = this._createEmergencyContactDetailsForm()
        this.emergencyAddress = this._createEmergencyAddressDetailsForm()
        if(emergencyContact) {
            this._setEmergencyContactDetail(emergencyContact)
        }
    }

    generateFamilyDetailForm(familyDetail?: FamilyDetail) {
        this.familyDetail = this._createFamilyDetailsForm()
        if(familyDetail) {
            this._setFamilyDetail(familyDetail)
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

}
