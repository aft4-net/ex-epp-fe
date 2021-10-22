import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface Validator {
    validateConfirmPassword(c: AbstractControl): ValidationErrors | null;
}