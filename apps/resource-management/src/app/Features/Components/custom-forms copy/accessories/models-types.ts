export type FormControlErrorMessage = {
  valid: boolean,
  state: string,
  message: string
}

export type FormControlsErrorMessage = {
  [key: string]: FormControlErrorMessage
}

export type FormArraysErrorMessage = {
  [key: string]: FormControlErrorMessage[]
}

export type FormErrorMessage = {
  controls: FormControlsErrorMessage,
  arrays: FormArraysErrorMessage,
  forms: FormErrorMessage
}

export enum ErrorStates {
  validating,
  warning,
  error,
  success
}

export type CountryPhoneData = {
  icon?: string,
  name: string,
  nationality: string,
  prefix: string,
  digits?: number
}

export type ParameterSegment = {
  prefix: any,
  value: any,
  suffix: any
}
