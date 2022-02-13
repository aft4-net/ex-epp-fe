import { AbstractControl, FormGroup } from "@angular/forms"
import { NzNotificationService } from "ng-zorro-antd/notification"
import { Observable, of } from "rxjs"
import { Address } from "../../../Models/address.model"
import { EmergencyContacts } from "../../../Models/emergencycontact"
import { Employee } from "../../../Models/Employee"
import { EmployeeOrganization } from "../../../Models/EmployeeOrganization/EmployeeOrganization"
import { FamilyDetail } from "../../../Models/FamilyDetail/FamilyDetailModel"
import { SelectOptionModel } from "../../../Models/supporting-models/select-option.model"
import { EmployeeService } from "../../../Services/Employee/EmployeeService"
import { CountriesMockService } from "../../../Services/external-api.services/countries.mock.service"
import { EmployeeStaticDataMockService } from "../../../Services/external-api.services/employee-static-data.mock.service"
import { FormExtractor } from "./form-extrator"
import { FormCreator } from "./form.creator"

export class FormStateManager {
    private _phonePrefices: string[] = ['+251'];
    public personalDetailsForm: AbstractControl = new FormGroup({});
    public organizationalForm: AbstractControl = new FormGroup({});
    public addressForm: AbstractControl = new FormGroup({});
    public emergencyContactForm: AbstractControl = new FormGroup({});
    public emergencyAddressForm: AbstractControl = new FormGroup({});
    public familyDetailForm: AbstractControl = new FormGroup({});

    public _addresses: Address[] = []
    public _familyDetails: FamilyDetail[] = []
    public _emergencyContacts: EmergencyContacts[] = []

    private _selectedId?: string;
    private _isEdit = false
    private _employee?: Employee

    get IsEdit(): boolean {
        return this._isEdit
    }

    constructor(
        protected readonly _employeeService: EmployeeService,
        protected readonly _phoneService: CountriesMockService,
        protected readonly _notification: NzNotificationService
    ) {
        this._phoneService.getCountriesPhonePrefices()
            .subscribe((response: SelectOptionModel[]) => {
                this._phonePrefices = response.map(option => option.value as string)
            });
    }

    loadEmployee(id?: string) {
        if (id) {
            this._isEdit = true;
            this._employeeService.getEmployeeData(id)
                .subscribe(r => {
                    if (r) {
                        this._employee = r;
                        this.personalDetailsForm = FormCreator.createPersonalDetail(this._phonePrefices, this._employee);
                        this.organizationalForm = FormCreator.createOrganizationalDetail(this._employee.EmployeeOrganization);
                        this._addresses = this._employee.EmployeeAddress ? this._employee.EmployeeAddress : [];
                        this._familyDetails = this._employee.FamilyDetails ? this._employee.FamilyDetails : [];
                        this._emergencyContacts = this._employee.EmergencyContact ? this._employee.EmergencyContact : [];
                    } else {
                        this._employee = undefined;
                        this.personalDetailsForm = FormCreator.createPersonalDetail(this._phonePrefices);
                        this.organizationalForm = FormCreator.createOrganizationalDetail();
                        this._addresses = [];
                        this._familyDetails = [];
                        this._emergencyContacts = [];
                        this._notification.error('Employee', 'It doesnot exist!')
                    }
                });
        } else {
            this._employee = undefined;
            this._isEdit = false;
            this.personalDetailsForm = FormCreator.createPersonalDetail(this._phonePrefices);
            this._addresses = [];
            this._familyDetails = [];
            this._emergencyContacts = [];
            this.organizationalForm = FormCreator.createOrganizationalDetail();
        }
    }

    loadPersonalAddress(id?: string) {
        if (id && this._employee && this._employee.EmployeeAddress) {
            const filtered = this._employee.EmployeeAddress.filter(a => a.Guid === id);
            const address = filtered.length > 0 ? filtered[0] : undefined;
            this._selectedId = address?.Guid;
            this.addressForm = FormCreator.createAddressDetail(address);
        } else {
            this._selectedId = undefined;
            this.addressForm = FormCreator.createAddressDetail();
        }
    }

    addPersonalAddress() {
        if (this._selectedId && this._employee && this._employee.EmployeeAddress) {
            let i = 0;
            while (i < this._employee.EmployeeAddress.length) {
                if (this._selectedId === this._employee.EmployeeAddress[i].Guid) {
                    this._employee.EmployeeAddress[i] = {
                        ...this._employee.EmployeeAddress[i],
                        ...FormExtractor.extractAddress(this.addressForm)
                    }
                }
                i += 1;
            }
        } else {
            this._addresses.concat([{
                ...FormExtractor.extractAddress(this.addressForm)
            } as Address]);
            this._selectedId = undefined;
        }
    }

    loadFamilyDetail(id?: string) {
        if (id && this._employee && this._employee.FamilyDetails) {
            const filtered = this._employee.FamilyDetails.filter(a => a.Guid === id);
            const familyDetail = filtered.length > 0 ? filtered[0] : undefined;
            this._selectedId = familyDetail?.Guid;
            this.familyDetailForm = FormCreator.createFamilyDetails(familyDetail);
        } else {
            this._selectedId = undefined;
            this.familyDetailForm = FormCreator.createFamilyDetails();
        }
    }

    addFamilyDetail() {
        if (this._selectedId && this._employee && this._employee.FamilyDetails) {
            let i = 0;
            while (i < this._employee.FamilyDetails.length) {
                if (this._selectedId === this._employee.FamilyDetails[i].Guid) {
                    this._employee.FamilyDetails[i] = {
                        ...this._employee.FamilyDetails[i],
                        ...FormExtractor.extractFamilyDetail(this.familyDetailForm)
                    }
                }
                i += 1;
            }
        } else {
            this._familyDetails.concat([{
                ...FormExtractor.extractFamilyDetail(this.familyDetailForm)
            } as FamilyDetail]);
            this._selectedId = undefined;
        }
    }

    loadEmergencyDetail(id?: string) {
        if (id && this._employee && this._employee.EmergencyContact) {
            const filtered = this._employee.EmergencyContact.filter(a => a.guid === id);
            const emergency = filtered.length > 0 ? filtered[0] : undefined;
            this._selectedId = emergency?.guid;
            const ef = FormCreator.createEmergecyContact(this._phonePrefices, emergency);
            this.emergencyContactForm = ef[0];
            this.emergencyAddressForm = ef[1];
        } else {
            this._selectedId = undefined;
            const ef = FormCreator.createEmergecyContact(this._phonePrefices);
            this.emergencyContactForm = ef[0];
            this.emergencyAddressForm = ef[1];
        }
    }

    addEmergencyDetail() {
        if (this._selectedId && this._employee && this._employee.EmergencyContact) {
            let i = 0;
            while (i < this._employee.EmergencyContact.length) {
                if (this._selectedId === this._employee.EmergencyContact[i].guid) {
                    this._employee.EmergencyContact[i] = {
                        ...this._employee.EmergencyContact[i],
                        ...FormExtractor.extractEmergencyContact(this.emergencyContactForm, this.emergencyAddressForm)
                    }
                }
                i += 1;
            }
        } else {
            this._emergencyContacts.concat([{
                ...FormExtractor.extractEmergencyContact(this.emergencyContactForm, this.emergencyAddressForm)
            } as EmergencyContacts]);
            this._selectedId = undefined;
        }
    }

    saveEmployee() {
        let request: Observable<any> = of()
        if (this._isEdit && this._employee) {
            request = this._employeeService.update({
                ...this._employee,
                ...FormExtractor.extractPersonalDetail(this.personalDetailsForm),
                EmployeeOrganization: {
                    ...({} as EmployeeOrganization),
                    ...(this._employee.EmployeeOrganization ? this._employee.EmployeeOrganization : {}),
                    ...FormExtractor.extractOrganizationalDetail(this.organizationalForm)
                },
                EmployeeAddress: this._addresses,
                FamilyDetails: this._familyDetails,
                EmergencyContact: this._emergencyContacts
            });
        } else {
            request = this._employeeService.add({
                ...FormExtractor.extractPersonalDetail(this.personalDetailsForm),
                EmployeeOrganization: FormExtractor.extractOrganizationalDetail(this.organizationalForm),
                EmployeeAddress: this._addresses,
                FamilyDetails: this._familyDetails,
                EmergencyContact: this._emergencyContacts
            } as Employee)
        }
        request.subscribe(
            ((response: any) => {
                if (response.ResponseStatus === 'Success') {
                    this._notification.success('Success', response.Message);
                } else {
                    this._notification.error('Error', response.Message);
                }

            }),
            ((error) => {
                this._notification.error('Error', 'Internal server error has occured!');
            }),
            (() => {
                this._isEdit = false;
                this._employee = undefined;
                this._addresses = [];
                this._familyDetails = [];
                this._emergencyContacts = [];
                this.personalDetailsForm = FormCreator.createPersonalDetail(this._phonePrefices);
                this.organizationalForm = FormCreator.createOrganizationalDetail();
                this.addressForm = FormCreator.createAddressDetail();
                this.familyDetailForm = FormCreator.createFamilyDetails();
                const ef = FormCreator.createEmergecyContact(this._phonePrefices);
                this.emergencyContactForm = ef[0];
                this.emergencyAddressForm = ef[1];
            })
        );
    }
}
