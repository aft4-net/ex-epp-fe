// export class ExecEppFormAccessories {
//     public static createFullName()
// }

// import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
// import { BehaviorSubject } from "rxjs";

// export type ExecEPPFormControlType
//     = ExecEPPNameControlType
//     | 'email' | 'phone' | 'multi-email' | 'multi-phone'
//     | 'selector' | 'multi-selector'
//     | 'date' | 'date-range';

//     export type ExecEPPNameControlType
//     = 'default' | 'fullName' | 'partialName' | 'singleName';

// export type ExecEPPRMFormControlType
//     = ExecEPPFormControlType | 'nationality' | 'partialName' | 'email' | 'phone' | 'selector' | 'employee-dateofBirth';

// export abstract class ExecEPPAbstractFormControl<T> {

//     protected readonly _value: BehaviorSubject<{
//         readonly default: any;
//         initial: any;
//         current: any;
//     }>;
//     protected _errorMessage: string | null = null;

//     public get type(): ExecEPPFormControlType {
//         return this._type;
//     }
//     public get value(): T {
//         return this._extractValue();
//     }
//     public get Error
//     constructor(
//         private readonly _type: ExecEPPFormControlType,
//         protected readonly _formControl: FormControl | FormGroup,
//         defaultValue: any,
//         private readonly _validators: {
//             [key: string]: ValidatorFn | AsyncValidatorFn;
//         }
//     ) {
//         this._value = new BehaviorSubject({
//             default: defaultValue,
//             initial: defaultValue,
//             current: defaultValue
//         });
//     }



//     protected _extractValue() {
//         return this._formControl.value as unknown as T;
//     }

//     public reinitialize(value: T) {

//     }
// }

// type FullName = {
//     firstName?: string;
//     middleName?: string;
//     lastName?: string;
// }

// export class ExecEPPFullNameControl extends ExecEPPAbstractFormControl {
//     /**
//      *
//      */
//     constructor(
//         private readonly _type: ExecEPPNameControlType,
//     ) {
//         super();
        
//     }

//     private static createNameControl()
// }

// export class ExecEPPFormGroup {

//     private
//     /**
//      *
//      */
//     constructor(options: ) {
//         super();

//     }
// }