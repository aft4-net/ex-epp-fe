import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService, ResponseDTO } from "@exec-epp/core-services/a-base-services";
import { Employee } from "../..";

@Injectable()
export class EmployeeApiService extends BaseApiService {

    private readonly _extraExtendedUrls = {
        getByEmail: 'GetEmployeeSelectionByEmail',
        checkIdNumber: 'checkidnumber',
        checkEmail: 'checkemail',
        checkPhone: 'checkphone'
        // ...
    }
    /**
     *
     */
    constructor(
        httpClient: HttpClient
    ) {
        super(
            httpClient,
            'Employee',
            {
                getList: 'GetEmployeeSelection',
                getListOne: 'GetEmployeeSelectionById',
                get: 'GetAllEmployeeDashboardFilter',
                getById: 'GetEmployeeWithID',
                // add: undefined,
                // update: undefined,

            }
        );

    }

    public checkId(employeeNumber: string) {
        return this._getOneByParameter<boolean>(
            { name: 'idNumber', value: employeeNumber },
            this._extraExtendedUrls.checkIdNumber
        )
    }

    public checkEmailExistence(email: string, guid?: string) {
        return this._get<any>({
            params: { email: email, guid: guid },
            extendedUrl: this._extraExtendedUrls.checkEmail
        });
    }
}