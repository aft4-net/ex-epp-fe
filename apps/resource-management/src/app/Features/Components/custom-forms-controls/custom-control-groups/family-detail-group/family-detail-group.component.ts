import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-family-detail-group',
    templateUrl: './family-detail-group.component.html',
    styleUrls: ['./family-detail-group.component.scss']
})
export class FamilyDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    relationships$: Observable<SelectOptionModel[]>
    genders$:  Observable<SelectOptionModel[]>

    isChild = true
    isOther = false


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _employeeStaticDataervice: EmployeeStaticDataMockService
    ) {
        this.genders$=this._employeeStaticDataervice.genders$
        this.relationships$=this._employeeStaticDataervice.relationships$
        this.formGroup
            = this._formGenerator.familyDetail

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    onChange() {
        const control = this.getControl('relationship')
        if(control.value === 'Child') {
            this.isChild = true
            this.isOther = false
        } else if (control.value === 'Other') {
            this.isOther = true
            this.isChild = false
        } else {
            this.isOther = false
            this.isChild = false
        } 
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}