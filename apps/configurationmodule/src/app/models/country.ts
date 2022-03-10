export interface Country {
    Guid: string;
    Name: string;
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface CountryResponse extends Response {
    Data: Country;
}

export interface SelectOption {
    value: string;
    label: string;
}

