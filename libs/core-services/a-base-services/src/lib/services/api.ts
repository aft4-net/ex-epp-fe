import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../../../../environments/environment';

export abstract class BaseSeedApiService {

    constructor(
        protected readonly _httpClient: HttpClient,
        protected readonly _baseUrl: string,
        protected readonly _httpOption: { [key: string]: any } = {}
    ) {
    }

    private _getURL(extentedURL?: string) {
        return this._baseUrl + (extentedURL ? '/' + extentedURL : '');
    }

    private _getParams(params?: { [key: string]: any }) {
        if (params) {
            const newParams = {} as any;
            Object.entries(params).forEach(kV => {
                newParams[kV[0]] = JSON.stringify(kV[1]);
            });
            return newParams;
        } else {
            return {};
        }
    }

    private _getExtractor<TResponse>(extractor?: (response: any) => TResponse) {
        return (
            extractor ? extractor : (response: any) => response as TResponse
        );
    }

    protected _get<TResponse>(options: {
        extendedUrl?: string,
        params?: { [key: string]: any },
        extractor?: (response: any) => TResponse
    }): Observable<TResponse> {
        return this._httpClient.get<any>(
            this._getURL(options.extendedUrl),
            { ...this._getParams(options.params) }
        )
            .pipe(
                map(this._getExtractor<TResponse>(options.extractor))
            )
    }

    protected _post<TModel, TResponse>(options: {
        extendedUrl?: string,
        item: TModel,
        extractor?: (response: any) => TResponse
    }): Observable<TResponse> {
        return this._httpClient.post<any>(
            this._getURL(options.extendedUrl),
            options.item
        )
            .pipe(
                map(this._getExtractor<TResponse>(options.extractor))
            )
    }

    protected _put<TModel, TResponse>(options: {
        extendedUrl?: string,
        item: TModel,
        extractor?: (response: any) => TResponse
    }): Observable<TResponse> {
        return this._httpClient.put<any>(
            this._getURL(options.extendedUrl),
            options.item
        )
            .pipe(
                map(this._getExtractor<TResponse>(options.extractor))
            )
    }

    protected _patch<TModel, TResponse>(options: {
        extendedUrl?: string,
        item: TModel,
        extractor?: (response: any) => TResponse
    }): Observable<TResponse> {
        return this._httpClient.patch<any>(
            this._getURL(options.extendedUrl),
            options.item
        )
            .pipe(
                map(this._getExtractor<TResponse>(options.extractor))
            )
    }

    protected _delete<TResponse>(options: {
        extendedUrl?: string,
        params?: { [key: string]: any },
        extractor?: (response: any) => TResponse
    }): Observable<TResponse> {
        return this._httpClient.delete<any>(
            this._getURL(options.extendedUrl),
            { ...this._getParams(options.params) }
        )
            .pipe(
                map(this._getExtractor<TResponse>(options.extractor))
            )
    }

}

export abstract class BaseApiService extends BaseSeedApiService {

    constructor(
        httpClient: HttpClient,
        controllerUrl: string,
        private readonly _extendedURLs: Partial<{
            getList: string;
            getListOne: string;
            get: string;
            getById: string;
            add: string;
            update: string;
            deleteById: string;
        }> = {}
    ) {
        super(
            httpClient,
            environment.apiUrl + '/' + controllerUrl
        );
    }

    public getList<TResponse>(criteria?: any) {
        return this._get<TResponse>({
            extendedUrl: this._extendedURLs.get,
            params: criteria ? criteria as { [key: string]: any } : undefined,
            extractor: (response: any) => response as TResponse
        });
    }

    public getListOne<TResponse>(criteria?: any) {
        return this._get<TResponse>({
            extendedUrl: this._extendedURLs.get,
            params: criteria ? criteria as { [key: string]: any } : undefined,
            extractor: (response: any) => response as TResponse
        });
    }


    public get<TResponse>(criteria?: any) {
        return this._get<TResponse>({
            extendedUrl: this._extendedURLs.get,
            params: criteria ? criteria as { [key: string]: any } : undefined,
            extractor: (response: any) => response as TResponse
        });
    }


    public getById<TResponse>(guid: string) {
        return this._get<TResponse>({
            extendedUrl: this._extendedURLs.getById,
            params: { guid: guid },
            extractor: (response: any) => response as TResponse
        });
    }

    protected _getOneByParameter<TResponse>(
        parameter: { name: string, value: any },
        extendedUrl?: string
    ) {
        const param = {} as any;
        param[parameter.name] = parameter.value
        return this._get<TResponse>({
            extendedUrl: extendedUrl,
            params: param,
            extractor: (response: any) => response as TResponse
        });
    }

    public add<TModel, TResponse>(item: TModel) {
        return this._post<any, TResponse>({
            extendedUrl: this._extendedURLs.getOneByParameter,
            item: item,
            extractor: (response: any) => response as TResponse
        });
    }

    public update<TModel, TResponse>(item: TModel) {
        return this._put<TModel, TResponse>({
            extendedUrl: this._extendedURLs.getOneByParameter,
            item: item,
            extractor: (response: any) => response as TResponse
        });
    }

    public deleteById<TResponse>(guid: string) {
        return this._delete<TResponse>({
            extendedUrl: this._extendedURLs.deleteById,
            params: { guid: guid },
            extractor: (response: any) => response as TResponse
        });
    }
    
    protected _deleteOneByParameter<TResponse>(
        parameter: { name: string, value: any },
        extendedUrl?: string
    ) {
        const param = {} as any;
        param[parameter.name] = parameter.value
        return this._delete<TResponse>({
            extendedUrl: extendedUrl,
            params: param,
            extractor: (response: any) => response as TResponse
        });
    }

}

