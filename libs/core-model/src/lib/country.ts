export interface CountryListResponse {
    error: boolean;
    msg:   string;
    data: [
        {
            country: string;
            iso2:    string;
            iso3:    string;
        }
    ]
}

export interface CountryAndStateListResponse {
    error: boolean;
    msg: string;
    data:  [
        {
            name: string;
            iso2: string;
            iso3: string;
            states: [
                {
                    name: string;
                    state_code: string;
                }
            ]
        }
    ];
}

export interface CountryAndCodeListResponse {
    error: boolean;
    msg: string;
    data: [
        {
            name: string;
            code: string;
            dial_code: string;
        }
    ]
}