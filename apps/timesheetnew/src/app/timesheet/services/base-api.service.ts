import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export abstract class BaseQueryOnlyAPIService<TModel> {

    constructor(
        protected readonly _httpClient: HttpClient,
        protected readonly _url: string
    ) {}

    protected abstract _extractMultiple(response: any): TModel[];

    /**
     * get
     */
    public get(): Observable<TModel[]> {
        return this._httpClient.get<any>(
            this._url
        )
        .pipe(
            map((response: any) => {
                return this._extractMultiple(response);
            })
        )
    }
}