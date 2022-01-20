import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@exec-epp/core-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    url="http://localhost:14696";
  loginCount=0;
  position:string="";
  empGuid:string="";

    constructor(private http: HttpClient, private errHandler: ErrHandleService, private router: Router) {}

   loginStatus(){
       return this.isLogin();
   }

   getUser(email:string){
     this.http.get<any>(this.url+'/api/v1/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase()).subscribe(
      (response) => {
        console.log("empguid is " + response["Guid"]);
       this.position  = response["EmployeeOrganization"]["JobTitle"];
       this.empGuid = response["Guid"];
      }
    );
   }
    
   getLoggedInUserAuthToken(email?: string){
    return this.http.get<any>('http://localhost:14696/api/v1/User/UserAuthToken?email=' + email?.toLowerCase());
   }

   storeLoginUser(user:any){
    console.log("sdsddddddddddddddddddddddddd",user)
    window.sessionStorage.removeItem('name');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('isLogin');
    window.sessionStorage.removeItem('email');

    window.sessionStorage.setItem("name",user.name);
    window.sessionStorage.setItem("username",user.username);
    window.sessionStorage.setItem('isLogin','true');
    //this.router.navigateByUrl('');
    window.location.replace('http://localhost:4200/');
   }

   getEmail(){
     return window.sessionStorage.getItem('username');
   }
   getUserFullName(){
     return window.sessionStorage.getItem('name');
   }
   getUsername(){
    return window.sessionStorage.getItem('username');
  }
  isLogin(){

   let result= window.sessionStorage.getItem('isLogin');
   if(!result){
     return false;
   }
   else{
     return true;
   }
  }
   isFromViewProfile(){
    return window.sessionStorage.getItem('fromViewer');
  }
  setFromViewProfile(){
    window.sessionStorage.setItem('fromViewer','true');
  }
  setFromViewProfile2(){
    window.sessionStorage.setItem('fromViewer','false');
  }
    } 