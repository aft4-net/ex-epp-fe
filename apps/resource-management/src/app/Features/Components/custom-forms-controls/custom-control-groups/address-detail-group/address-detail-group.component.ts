import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressCountryStateService } from "../../../../Services/external-api.services/countries.mock.service";
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

    isEthiopia = false
    country: string | null | undefined

    stateName = 'State/Province'
    subcityName = 'Address Line 1'
    weredaName = 'Address Line 2'
    postalCodeName = 'Postal/Zip Code'


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressCountryStateService: AddressCountryStateService
    ) {
        this.country = ''
        this.countries$ = this._addressCountryStateService.countries$
        this.stateRegions$ = this._addressCountryStateService.stateRegions$
        
        // const address: Addresss = {
        //     ...{} as Address,
        //     Country: 'Ethiopia'
        // } as Address

        // this._formGenerator.generateAddressForm(address)
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
        console.log('Address Custom Component')
        this.country = this.formGroup.value.country as string
        if(this.country === 'Ethiopia') {
            this.stateName = 'Region'
            this.subcityName = 'Subcity/Zone'
            this.weredaName = 'Woreda'
            this.isEthiopia = true
        } else {
            this.stateName = 'State/Province'
            this.subcityName = 'Address Line 1'
            this.weredaName = 'Address Line 2'
            this.isEthiopia = false
        }
        this._addressCountryStateService.country = this.country
        console.log(this.country)
        this.countries$.subscribe((response: any) => { console.log(response)})
    }
    
    onStateSelect() {}

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}