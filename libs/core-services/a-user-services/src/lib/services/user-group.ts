import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService, ResponseDTO } from "@exec-epp/core-services/a-base-services";
import { UserGroup } from "../..";

@Injectable()
export class UserGroupApiService extends BaseApiService {

    private readonly _extraExtendedUrls = {
        getGroupSetByUserId: 'GetGroupSetByUserId',
        deleteUserFromGroup: 'RemoveUserFromGroup'
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

    public deleteUserFromGroup(userId: string, groupId: string) {
        this._deleteOneByParameter<boolean>(
            { name: 'userId', value: userId }
        )
    }

    public getGroupSetByUserId(id: string) {
        this._getOneByParameter<ResponseDTO<UserGroup[]>>(
            { name: 'guid', value: id },
            this._extraExtendedUrls.getGroupSetByUserId
        )
    }
}