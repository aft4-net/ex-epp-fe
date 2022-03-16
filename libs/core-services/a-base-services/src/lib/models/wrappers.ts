/* eslint-disable @typescript-eslint/no-empty-interface */
import { ResponseStatus } from "../..";

export interface  Pagination {
    TotalRecord:number;
    PageIndex:number ;
    PageSize:number;
    TotalRows:number;
  }

  export interface CriteriaResult<T> {
    Data: T;
    pagination: Pagination;
    search?: any;
    filters: any[];
    orders: any[];
  }

export interface ResponseDTO<T> {
    ResponseStatus: ResponseStatus;
    Message: string;
    Mata: T;
    Ex: any;
}
