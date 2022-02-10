import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@exec-epp/core-models';
import { ResponseDTO } from 'apps/usermanagement/src/app/models/ResponseDTO';
import { LogInRequest } from 'apps/usermanagement/src/app/models/user/logInRequest';
import { LogInResponse } from 'apps/usermanagement/src/app/models/user/logInResponse';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "./../environments/environment";
import { ErrHandleService } from './error-handle.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
  private userSubject :BehaviorSubject<LogInResponse|any>;
  public users: Observable<LogInResponse>;
  loggedInUser:any;
  useEmails = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      
    };
    url=environment.apiUrl;
    user:any
  loginCount=0;
  position:string="";
  empGuid:string="";

    constructor(private http: HttpClient, private errHandler: ErrHandleService, private router: Router) {

      this.userSubject = new BehaviorSubject<LogInResponse|null>(JSON.parse(localStorage.getItem('loggedInUserInfo')||'{}'));
      this.users = this.userSubject.asObservable();
    }
    


   loginStatus(){
       return this.isLogin();
   }

   getUser(email:string){
     this.http.get<any>(this.url+'/Employee/GetEmployeeSelectionByEmail?employeeEmail=' + email.toLowerCase()).subscribe(
    
      (response) => {
       this.user=response;
       this.position  = response["EmployeeOrganization"]["JobTitle"];
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
    window.location.replace('http://localhost:4200');
   }
   

   storeLoginUsers(users:any)
   {
    window.sessionStorage.getItem('email');
    window.sessionStorage.getItem('password');
    window.sessionStorage.setItem('isLogin','true');
    window.location.replace('http://localhost:4200');
   }
   getEmail(){
     return window.sessionStorage.getItem('username');
   }
   getUserFullName(){
     return window.sessionStorage.getItem('name');
     
   }

   getFullName(){
    return this.loggedInUser.getFullName()
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

    } 