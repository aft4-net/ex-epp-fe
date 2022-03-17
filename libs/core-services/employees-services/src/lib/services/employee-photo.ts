import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "@exec-epp/core-services/a-base-services";

export class EmployeePhotoApiService extends BaseApiService {

    constructor(
        httpClient: HttpClient
    ) {
        super(
            httpClient,
            'EmployeePhoto'
        );
    }
}