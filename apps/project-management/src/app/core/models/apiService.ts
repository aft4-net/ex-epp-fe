import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {
  private readonly APIUrl = environment.baseApiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient ) {
  }

  abstract getResourceUrl(): string;



  getAll(): Observable<Array<T>>
  {

    return this.httpClient.get<T[]>(this.APIUrl);

  }
  getSearch(optional:any)
  {

    return this.httpClient.get<T[]>(this.APIUrl+'/search/'+optional);

  }

  getList(params:any): Observable<any[]> {

    return this.httpClient.get<any[]>(this.APIUrl+"?" +params.toString())

  }

  get(id: string | number): Observable<[T]> {
    return this.httpClient.get<[T]>(this.APIUrl+"/" +id);
  }

  getById(id: string ): Observable<T> {
    return this.httpClient.get<T>(this.APIUrl+"/" +id);
  }


  post(resource:any) {
    return this.httpClient.post(this.APIUrl, resource);
  }

  delete(id: string | number) {
    return this.httpClient.delete(this.APIUrl+"/" +id);
  }

  update(resource: T) {
    return this.httpClient.put(`/${this.APIUrl}`, resource)

  }


}
