import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { commonErrorMessage, validateFirstName } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    @Input() personalDetailGroup?: FormGroup
    formGroup: FormGroup


    constructor(
        private readonly _formBuilder: FormBuilder
    ) {
        if (this.personalDetailGroup !== undefined) {
            this.formGroup = this.personalDetailGroup
        } else {
            this.formGroup = this.createBasicForm()
        }
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
            firstName: [null, this.validateFirstName],
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
    validateFirstName(control: AbstractControl) {
        commonErrorMessage.required = true
        return validateFirstName(control, commonErrorMessage)
    }

    // validateMiddleName(control: AbstractControl) {
    //     commonErrorMessage.required = false
    //     return this.validateMiddleName(control)
    // }

    validateLastName(control: AbstractControl) {
        commonErrorMessage.required = true
        return validateFirstName(control, commonErrorMessage)
    }

    showData() {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }


}