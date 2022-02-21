import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Employee } from '@exec-epp/core-models';
import { ErrHandleService } from './error-handle.service';
import { Injectable } from '@angular/core';
import { LogInRequest } from 'apps/usermanagement/src/app/models/user/logInRequest';
import { LogInResponse } from 'apps/usermanagement/src/app/models/user/logInResponse';
import { ResponseDTO } from 'apps/usermanagement/src/app/models/ResponseDTO';
import { Router } from '@angular/router';
import { environment } from "./../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
  private userSubject :BehaviorSubject<LogInResponse|any>;
  public users: Observable<LogInResponse>;

  private changPassdataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isChangePass: Observable<boolean> = this.changPassdataSource.asObservable();

  loggedInUser:any;
  useEmails = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');

    httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })

    };
    url=environment.apiUrl;
    user:any
  loginCount=0;
  position="";
  empGuid:string="";
  fullName:string='';

    constructor(private http: HttpClient, private errHandler: ErrHandleService, private router: Router) {

      this.userSubject = new BehaviorSubject<LogInResponse|null>(JSON.parse(localStorage.getItem('loggedInUserInfo')||'{}'));
      this.users = this.userSubject.asObservable();

      //this.positionSubject = new BehaviorSubject<string>('');
     // this.position2 = this.positionSubject.asObservable();
    }



   loginStatus(){
       return this.isLogin();
   }

   getUser(email:string){
     email = this.useEmails.Email;
     this.http.get<any>(this.url+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase()).subscribe(

      (response) => {
       this.user=response;
       this.position  = response["EmployeeOrganization"]["Role"]["Name"];
       this.empGuid = response["Guid"];

      }
    );
    return this.position;
   }
   getPosition(email:string){
    email = this.useEmails.Email;
    this.http.get<any>(this.url+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase()).subscribe(
   
     (response) => {
      this.user=response;
      this.position  = response["EmployeeOrganization"]["Role"]["Name"];
      console.log(this.position + 'addUSerPosition')
      this.empGuid = response["Guid"];
      return response["EmployeeOrganization"]["Role"]["Name"];
     }
   );
   return this.position;
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
    //window.location.replace('http://localhost:4200');
   }


   storeLoginUsers(users:any)
   {
    window.sessionStorage.getItem('email');
    window.sessionStorage.getItem('password');
    window.sessionStorage.setItem('isLogin','true');
    //window.location.replace('http://localhost:4200');
   }
   getEmail(){
     //return window.sessionStorage.getItem('username');
     var userInfo = JSON.parse(localStorage.loggedInUserInfo);
     return userInfo.Email;
   }
   getUserFullName(){
     return localStorage.getItem('name')
    // return window.sessionStorage.getItem('name');

   }

   getFullName(){
    this.fullName = ((this.loggedInUser.FirstName) + (this.loggedInUser.LastName));
    console.log(this.fullName);
    return this.fullName
  }
   getUsersName(){
    return  window.sessionStorage.getItem('username');
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

  signIn(logInRequest: LogInRequest) {

    return this.http.post<ResponseDTO<LogInResponse>>(environment.apiUrl + '/User/logIn', logInRequest).pipe(
      map((users) => {
        if(users.Data && users.Data.Token){
          localStorage.setItem('loggedInUserInfo', JSON.stringify(users.Data ||'{}'));
          this.loggedInUser = users.Data;
          console.log(users.Data);
          this.userSubject.next(users.Data);
          return users;
        }
        return users;
      }
    ));
};

  hasData(value: boolean) {
    this.changPassdataSource.next(value);
  }

  //hasPosition(value: string) {
   // this.positionSubject.next(value);
 // }

    }
