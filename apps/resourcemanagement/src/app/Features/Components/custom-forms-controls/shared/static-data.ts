import { of } from "rxjs"
import { SelectOptionModel } from "../../../Models/supporting-models/select-option.model"

export const genders$ = of(['Female', 'Male'].map(convertStringToSelectOption));
export const relationships$ = of(['Spouse', 'Child', 'Mother', 'Father', 'Other'].map(convertStringToSelectOption));


function convertStringsToSelectOptions(params:string[]) {
    return params.map(param => {
        return { value: param, label: param } as SelectOptionModel
    })
}

function convertStringToSelectOption(param:string) {
    return { value: param, label: param } as SelectOptionModel
}

