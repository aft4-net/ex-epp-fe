import { CountryPhoneData, ErrorStates, FormControlErrorMessage, ParameterSegment } from "./models-types";


export function setControlError(initial: boolean, errorMessage?: string) {
    return {
        valid: (initial || !errorMessage) ? false : true,
        state: initial ? ErrorStates.validating.toString()
            : errorMessage ? ErrorStates.error.toString()
                : ErrorStates.success.toString(),
        message: errorMessage ? errorMessage : ''
    } as FormControlErrorMessage
}

export function extractEmployeeIdNumberPrefix(employeeIdNumber: string, employeeIdNumberPrefices: string[]) {
    let index = -1
    let noofMatches = 0
    for (let i = 0; i < employeeIdNumberPrefices.length; i++) {
        if (employeeIdNumber.substring(0, employeeIdNumberPrefices[i].length) === employeeIdNumberPrefices[i]) {
            if (noofMatches < employeeIdNumberPrefices[i].length) {
                index = i;
                noofMatches = employeeIdNumberPrefices[i].length
            }
        }
    }
    return {
        prefix: (index === -1? null: employeeIdNumberPrefices[index]),
        value: (index === -1? null : (noofMatches >= employeeIdNumber.length? null: employeeIdNumber.substring(noofMatches)))
    } as ParameterSegment
}

export function extractPhonePrefix(phone: string, countries: CountryPhoneData[]) {
    let index = -1
    let noofMatches = 0
    for (let i = 0; i < countries.length; i++) {
        if (phone.substring(0, countries[i].prefix.length) === countries[i].prefix) {
            if (noofMatches < countries[i].prefix.length) {
                index = i;
                noofMatches = countries[i].prefix.length
            }
        }
    }
    return {
        prefix: (index === -1? null: countries[index].prefix),
        value: (index === -1? null : (noofMatches >=phone.length? null: phone.substring(noofMatches)))
    } as ParameterSegment
}

