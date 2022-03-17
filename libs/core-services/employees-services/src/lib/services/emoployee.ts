import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService } from "@exec-epp/core-services/a-base-services";

@Injectable()
export class EmployeeApiService extends BaseApiService {

    private readonly _extraExtendedUrls = {
        checkIdNumber: 'checkidnumber',
        getByEmail: 'GetEmployeeSelectionByEmail',
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
            { name: 'idNumber', value: employeeNumber},
            this._extraExtendedUrls.checkIdNumber
        )
    }

    public getByEmail(email: string) {
        return this._getOneByParameter<boolean>(
            { name: 'employeeEmail', value: email},
            this._extraExtendedUrls.getByEmail
        )
    }
}