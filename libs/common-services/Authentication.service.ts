import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../environments/environment";
import { ErrHandleService } from './error-handle.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
loginCount=0;
    constructor(private http: HttpClient, private errHandler: ErrHandleService, private router: Router) {}

   loginStatus(){
       return this.isLogin();
   }

    
   storeLoginUser(user:any){
    window.sessionStorage.removeItem('name');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('isLogin');
    window.sessionStorage.setItem("name",user.name);
    window.sessionStorage.setItem("username",user.username);
    window.sessionStorage.setItem('isLogin','true');
    //this.router.navigateByUrl('');
    window.location.replace('http://localhost:4200/');
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
    } 