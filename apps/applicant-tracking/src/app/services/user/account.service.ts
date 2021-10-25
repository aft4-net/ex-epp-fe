import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseDTO } from '../../models/ResponseDTO';
import { SignInRequest } from '../../models/user/signInRequest';
import { SignInResponse } from '../../models/user/signInResponse';
import { SignUpRequest } from '../../models/user/signUpRequest';
import { SignUpResponse } from '../../models/user/signUpResponse';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userSubject :BehaviorSubject<SignInResponse|any>;
  public user: Observable<SignInResponse>;
  baseUrl = 'http://localhost:14696/api/v1/';

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<SignInResponse|null>(JSON.parse(localStorage.getItem('loggedInUserInfo')||'{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userInfo(): SignInResponse {
      return this.userSubject.value;
  }

  signIn(signInRequest: SignInRequest) {
    console.log('testing2');
      return this.http.post<ResponseDTO<SignInResponse>>(this.baseUrl + 'SignUp', signInRequest).pipe(
        map((user) => {
          console.log(user);
          if(user.data && user.data.token){
            localStorage.setItem('loggedInUserInfo', JSON.stringify(user.data ||'{}'));
            this.userSubject.next(user.data);
            return user;
          }
          return user;
        }
      ));
  };
  

  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<ResponseDTO<SignUpResponse>>(this.baseUrl + 'SignUp', signUpRequest);
  };

  signOut() {
    localStorage.removeItem('loggedInUserInfo');
    this.userSubject.next(null);
    this.router.navigate(['user/signin']);
  }
  
}
