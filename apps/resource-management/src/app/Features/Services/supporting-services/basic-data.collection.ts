
// Data and FormControls
export const employeeIdNumberSeparator = '/'

export const minNumberofCharactersinName = 3
export const maxNumberofCharactersinName = 25

export const maxNumberofEmailandPhoneNumbers = 3

export const minNumberofCharactersinEmail = 8
export const maxNumberofCharactersinEmail = 255
export const minNumberofCharactersinEmailSegment = 2

export const minNumberofDigitsinPhoneNumber = 9
export const maxNumberofDigitsinPhoneNumber = 14
export const charatersIngnoredinPhoneNumber = [' ', '(', ')']
export const orderofIngnoredCharctersinPhoneNumber = ['(', ')']
export const nearestEmployeeDateofBirth
    = new Date(
        (new Date()).getMonth()
        + '/' + (new Date()).getDate()
        + '/' + ((new Date()).getFullYear() - 21)
    )

export const separatorsinDescriptions = {
    space: ' ',
    backSlash: '/',
    at: '@',
    period: '.',
    hyphen: '-'
}

export const defaultEmployeeIdNumberPrefices = ['EDC/DT', 'EDC/QA', 'EDC/HR', 'EDC/FD', 'EDC/LT']

// Usefull data

export const countriesURL = 'https://countriesnow.space/api/v0.1/countries/states'
export const statesURL = 'https://countriesnow.space/api/v0.1/countries/states'
/*
{
    "country": "Nigeria"
}
*/
export const citiesURL = 'https://countriesnow.space/api/v0.1/countries/state/cities'
/*
{
    "country": "Nigeria",
    "state": "Lagos"
}
*/
export const phonePreficesURL = 'https://countriesnow.space/api/v0.1/countries/codes'

export const employeeIdNumberPreficesURL = ''

