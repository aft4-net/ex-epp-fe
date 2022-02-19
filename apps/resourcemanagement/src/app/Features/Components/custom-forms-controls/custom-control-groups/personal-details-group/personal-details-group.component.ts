import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { EmployeeService } from "../../../../Services/Employee/EmployeeService";
import { CountriesMockService } from "../../../../Services/external-api.services/countries.mock.service";
import { FormGenerator } from "../../form-generator.model";
import { genders$ } from "../../shared/static-data";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss', '../../excel-styles/excel-single-control.style.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    formGroup: FormGroup
    genders$: Observable<SelectOptionModel[]> = genders$;
    nationalities$: Observable<SelectOptionModel[]>
    maxDateofBirth = new Date(Date.now());
    maxEmailQty = 3
    maxPhoneQty = 3
    maxNationality = 3
    birthEndDate = new Date(Date.now())
    

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _countriesMockService: CountriesMockService,
        private _employeeService : EmployeeService
    ) {
        this.genders$ = genders$;
        this.nationalities$ = this._countriesMockService.getCountries();
        this.formGroup = this._formGenerator.personalDetailsForm
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

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}