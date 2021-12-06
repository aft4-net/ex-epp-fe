import { AbstractControl } from "@angular/forms";
import { ValidatorResponse } from "../../Models/supporting-models/validator-response.model";
import { maxNumberofCharactersinName, minNumberofCharactersinName, nearestEmployeeDateofBirth } from "./basic-data.collection";


export const commonErrorMessage = {
    required: true,
    message: ''
} as ValidatorResponse


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Validators
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

export function validateEmployeeIdNumber(
    control: AbstractControl
) {
    commonErrorMessage.required = true
    if (!commonErrorMessage.required && !control.value) {
        return null
    }
    const parameters = [control, commonErrorMessage, null, 'Employee ID number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        }
    )
}

export function validateFirstName(
    control: AbstractControl
) {
    commonErrorMessage.required = true
    return validateName(control, commonErrorMessage, 'First name')
}

export function validateMiddleName(
    control: AbstractControl
) {
    commonErrorMessage.required = false
    return validateName(control, commonErrorMessage, 'Middle name')
}

export function validateLastName(
    control: AbstractControl
) {
    commonErrorMessage.required = true
    return validateName(control, commonErrorMessage, 'Last name')
}

export function validateName(
    control: AbstractControl,
    errorLog: ValidatorResponse,
    kind: string
) {
    if (!errorLog.required && !control.value) {
        return null
    }
    const parameters = [control, errorLog, null]
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkLetter,
            parameters: modifyParameters(parameters, null)
        },
        {
            method: checkLength,
            parameters: modifyParameters(
                parameters,
                {
                    min: minNumberofCharactersinName,
                    max: maxNumberofCharactersinName
                })
        }
    )
}

export function validateGender(
    control: AbstractControl,
    errorLog: ValidatorResponse,
    genders: string[]
) {
    if (!errorLog.required && !control.value) {
        return null
    }
    const parameters = [control, errorLog, null, 'Employee ID number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkFromList,
            parameters: modifyParameters(parameters, genders)
        }
    )

}

export function validateEmployeeDateofBirth(
    control: AbstractControl,
    errorLog: ValidatorResponse,
) {
    if (!errorLog.required && !control.value) {
        return null
    }
    const parameters = [control, errorLog, null, 'Employee\'s date of birth']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkDateRange,
            parameters: modifyParameters(
                parameters,
                {
                    max: nearestEmployeeDateofBirth
                }
            )
        }
    )

}

export function validatePhonePrefix(
    control: AbstractControl,
    errorLog: ValidatorResponse,
    prefices: string[]
) {
    if (!errorLog.required && !control.value) {
        return null
    }
    const parameters = [control, errorLog, null, 'Phone prefix number']
    return checkMultiple(
        {
            method: checkrequired,
            parameters: parameters
        },
        {
            method: checkFromList,
            parameters: modifyParameters(parameters, prefices)
        }
    )
}

// export function validatePhoneNumber(params:type) {
    
// }


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Checking Functions
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function checkMultiple(
    ...methods: Argument[]
) {
    for (let i = 0; i < methods.length; i++) {
        const result = methods[i].method(
            methods[i].parameters[0],
            methods[i].parameters[1],
            methods[i].parameters[2],
            methods[i].parameters[3]
        )
        if (result !== null) {
            return result
        }
    }
    return null
}

function checkrequired(
    control: AbstractControl,
    errorLog: { message: string },
    condition: null,
    controlName?: string
) {
    controlName
        = controlName ?
            controlName[0].toLocaleUpperCase() + controlName.substring(1)
            : 'Input'
    if (!control.value) {
        errorLog.message = controlName + ' is required! Please provide a value.'
        return { required: true }
    }
    return null
}

function checkFromList(
    control: AbstractControl,
    errorLog: { message: string },
    condition: any[],
    controlName: string
) {
    if (condition.indexOf(control.value) >= 0) {
        errorLog.message = 'Invalid employee ID prefix!'
        return { invalid: true }
    }
    return null;
}

function checkLetter(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (!(/^[A-Za-z]+$/).test(control.value)) {
        errorLog.message = 'Contains an invalid character(s)!'
        return { invalidCharacter: true }
    }
    return null
}

function checkLength(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: number, max?: number },
    controlName: string
) {
    if (condition.min) {
        if (control.value.length < condition.min) {
            errorLog.message
                = 'Input contains less than the minimum number of characters allowed! i.e. '
                + condition.min + ' letters'
            return { minLength: true }
        }
    }
    if (condition.max) {
        if (control.value.length > condition.max) {
            errorLog.message
                = 'Input exceeds the maximum number of characters allowed! i.e. '
                + condition.max + ' letters'
            return { minLength: true }
        }
    }
    return null
}

function checkDateRange(
    control: AbstractControl,
    errorLog: { message: string },
    condition: { min?: Date, max?: Date },
    controlName: string
) {
    if (condition.min) {
        if (control.value < condition.min) {
            errorLog.message
                = 'Input is before the farthest date allowed! i.e. '
                + condition.min + ' letters'
            return { minLength: true }
        }
    }
    if (condition.max) {
        if (control.value > condition.max) {
            errorLog.message
                = 'Input after the nearest date allowed! i.e. '
                + condition.max + ' letters'
            return { minLength: true }
        }
    }
    return null
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Supporting Functions
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function capitalizeFirstLetterOnly(value: string) {
    return value[0].toLocaleUpperCase() + value.substring(1)
}

function modifyParameters(params: any[], condition: any) {
    return [
        params[0],
        params[1],
        condition,
        params[3]
    ]
}

type Argument = {
    method: any,
    parameters: any[]
}