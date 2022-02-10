import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Employee } from '@exec-epp/core-models';
import { ErrHandleService } from './error-handle.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "./../environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    url=environment.apiUrl;
    user:any
  loginCount=0;
  position:string="";
  empGuid:string="";

    constructor(private http: HttpClient, private errHandler: ErrHandleService, private router: Router) {}

   loginStatus(){
       return this.isLogin();
   }

   getUser(email:string){
     this.http.get<any>(this.url+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase()).subscribe(
      (response) => {
       //debugger
       this.user=response;
       this.position  = response["EmployeeOrganization"]["Role"]['Name'];
       this.empGuid = response["Guid"];

      }
    );
    return email;
   }

   getLoggedInUserAuthToken(email?: string){
    return this.http.get<any>(this.url + '/User/UserAuthToken?email=' + email?.toLowerCase());
   }

   storeLoginUser(user:any){

    window.sessionStorage.removeItem('name');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('isLogin');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('fromViewer');

    window.sessionStorage.setItem("name",user.name);
    window.sessionStorage.setItem("username",user.username);
    window.sessionStorage.setItem('isLogin','true');
    window.sessionStorage.setItem('fromViewer','false');
    //this.router.navigateByUrl('');
<<<<<<< HEAD
    window.location.replace('https://localhost:4200/');
=======
    window.location.replace('http://localhost:4200/');
>>>>>>> 15715d7815c438eba67aced8084fff90c2b6e76e
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
