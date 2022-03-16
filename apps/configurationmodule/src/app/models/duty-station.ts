export interface DutyStation {
    Guid: string;
    CountryId: string;
    Name: string;
}

export interface DutyStationAndCountry extends DutyStation {
    CountryName: string;
}

interface Response {
    ResponseStatus: string;
    Message: string;
    Ex?: any;
}

export interface DutyStationResponse extends Response {
    Data: DutyStation
}