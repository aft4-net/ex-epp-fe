import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../models/ResponseDTO';
import { ChangePasswordRequest } from '../../../models/user/changePasswordRequest';
import { LogInRequest } from '../../../models/user/logInRequest';
import { LogInResponse } from '../../../models/user/logInResponse';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userSubject :BehaviorSubject<LogInResponse|any>;
  public user: Observable<LogInResponse>;
  loggedInUser:any;

  header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router,private location: Location) {
    this.userSubject = new BehaviorSubject<LogInResponse|null>(JSON.parse(localStorage.getItem('loggedInUserInfo')||'{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userInfo(): LogInResponse {
      return this.userSubject.value;
  }

  signIn(logInRequest: LogInRequest) {
    
      return this.http.post<ResponseDTO<LogInResponse>>(environment + 'usermanagement/logIn', logInRequest).pipe(
        map((user) => {
          if(user.Data && user.Data.Token){
            localStorage.setItem('loggedInUserInfo', JSON.stringify(user.Data ||'{}'));
            this.loggedInUser = user.Data;
            this.userSubject.next(user.Data);
            return user;
          }
          return user;
        }
      ));
  };

  changePassword(body: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/User/ChangePassword`, body, {headers:this.header});
  }
  resetPassword(body: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/User/ResetPasswordByUser`,body, {headers:this.header});
  }
  ApplyRequestForPasswordReset(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/PasswordReset/ApplyRequestForPasswordReset?Email=${email}&&resetHandlingURL=${environment.redirectUri}/usermanagement/resetpassword`, {headers:this.header});
  }
  ValidatePasswordResetToken(email: string, token:string): Observable<ResponseDTO<any>> {
    return this.http.get<ResponseDTO<any>>(`${environment.apiUrl}/PasswordReset/VerifyResetPassword?Email=${email}&&Token=${token}`, {headers:this.header});
  }
  
}
