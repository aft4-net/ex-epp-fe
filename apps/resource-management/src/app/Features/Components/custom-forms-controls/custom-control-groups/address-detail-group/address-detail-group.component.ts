import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Address, Addresss } from "../../../../Models/address.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { ExternalCountryApiService, ExternalStateRegionApiService } from "../../../../Services/external-api.services/external-countries.api.service";
import { AddressDataStateService } from "../../../../state-services/address.detail.state.service";
import { OrganizationDetailStateService } from "../../../../state-services/organization-details-data.state-service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-address-detail-group',
    templateUrl: './address-detail-group.component.html',
    styleUrls: ['./address-detail-group.component.scss']
})
export class AddressDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    countries$: Observable<SelectOptionModel[]>
    stateRegions$: Observable<SelectOptionModel[]>
    cities$: Observable<SelectOptionModel[]>
    phonePrefices$: Observable<SelectOptionModel[]>

    isEthiopia = false

    stateName = 'State/Province'
    subcityName = 'Address Line 1'
    weredaName = 'Address Line 2'


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressDetailStateService: AddressDataStateService,
        private readonly _externalCountryApiService: ExternalCountryApiService,
        private readonly _externalStateRegionApiService: ExternalStateRegionApiService
    ) {
        this.countries$ = this._externalCountryApiService.get()
        this.stateRegions$ = of([])
        this.cities$ = this._addressDetailStateService.cities$
        this.phonePrefices$ = this._addressDetailStateService.phonePrefices$
        
        const address: Addresss = {
            ...{} as Address,
            Country: 'Ethiopia'
        } as Address

        this._formGenerator.generateAddressForm(address)
        this.formGroup
            = this._formGenerator.addressForm

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormArray(name: string): FormArray {
        return this._formGenerator.getFormArray(name, this.formGroup)
    }

    onCountrySelect() {
        console.log('AddressChanged')
        const control = this.getControl('country')
        if(control.value === 'Ethiopia') {
            this.stateName = 'Region'
            this.subcityName = 'Subcity/Zone'
            this.weredaName = 'Wereda'
            this.isEthiopia = true
        } else {
            this.stateName = 'State/Province'
            this.subcityName = 'Address Line 1'
            this.weredaName = 'Address Line 2'
            this.isEthiopia = false
        }
        const country: string = this.formGroup.value.country
        this.stateRegions$ = this._externalStateRegionApiService.getByPost(country)
        // .pipe(
        //     map((response: any)=> {
        //         console.log('AddressChanged')
        //         return response.data.map((country: any)=>country.name)
        //         // .states.map((state:any)=> state.name)
        //         // return (response.data.map((country: any)=>country.name===this.getControl('country').value))[0]
        //         // .states.map((state:any)=> state.name)
        //     })
        // )
    }
    
    onStateSelect() {

    }

    getStates() {

    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}