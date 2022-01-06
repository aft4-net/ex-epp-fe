import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Permission{
   GroupSetId:string,
      GroupSet:string,
      PermissionId:string,
      Permission:string,
      Guid:string,
      IsActive:string,
      IsDeleted:string,
      CreatedDate:string,
      CreatedbyUserGuid:string
    }
    
@Injectable({
  providedIn: 'root'
})
export class IntializeService {

}
