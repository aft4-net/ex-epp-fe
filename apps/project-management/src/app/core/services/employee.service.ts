import { ApiService } from '../models/apiService';
import { Employee } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {
  private readonly Url = environment.baseApiUrl + this.getResourceUrl();
  protected _mapToModel:((respone:any)=>Employee)=((respone:any)=>respone.data);


  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'Employees';
  }
  override getAll(): Observable<Array<Employee>>
  {

    return this.httpClient.get<any>(this.Url)
    .pipe(
      map(response=>{
        return response.data
        map(element=>{
          return this._mapToModel(element)
        })
      })
    );

  }

}





