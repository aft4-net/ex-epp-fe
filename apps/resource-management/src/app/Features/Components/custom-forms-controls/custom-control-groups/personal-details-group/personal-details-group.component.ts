import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { commonErrorMessage, validateFirstName } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    @Input() personalDetailGroup?: FormGroup
    formGroup: FormGroup


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _formGenerator: FormGenerator
    ) {
        this.formGroup = this._formGenerator.getPersonalDetailsForm()
    }

    ngOnInit(): void {
    }

    getControl(name: string): FormControl {
        return this.formGroup.get(name) as FormControl
    }

    createBasicForm() {
        const form = this._formBuilder.group({
            employeeIdNumberPrefix: [null],
            employeeIdNumber: [null],
            firstName: [null],
            middleName: [null],
            lastName: [null],
            gender: [null],
            dateofBirth: [null],
            phoneNumbers: this._formBuilder.array([]),
            EmailAddresses: this._formBuilder.array([]),
            nationalities: [null]
        });
        return form
    }

    showData() {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }


}