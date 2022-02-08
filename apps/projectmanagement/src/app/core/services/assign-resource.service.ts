import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignResource } from '..';
import { ApiService } from '../models/apiService';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssignedResoureEdit, AssignResoureCreate } from '../models';
@Injectable({
  providedIn: 'root'
})
export class AssignResourceService extends ApiService<AssignResource> {

  getResourceUrl(): string {
    return 'AssignResource';
  }

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }
  getResourceOfProject(projectId:string):Observable<AssignResource[]>
  {
    const params = new HttpParams()
    .set('projectGuid', projectId)
    return  this.httpClient.get(environment.baseApiUrl+'AssignResource/ByProject'+"?"+params.toString()).pipe(map((response:any)=>{ 
  
      return response.Data;     
  }));
  }
  updateAssignResource(resourseEdit:AssignedResoureEdit)
  {
  return this.httpClient.put(environment.baseApiUrl+'AssignResource',resourseEdit)
  }
  
  addResource(resource:AssignResoureCreate)
  {
    return this.httpClient.post(environment.baseApiUrl+'AssignResource',resource)
  }

}