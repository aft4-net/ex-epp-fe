import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable()
export class httpJWTInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUserInfo') ?? '{}' 
          ); 
        const baseUrl = environment.apiUrl;
        const isApiUrl = request.url.startsWith(baseUrl);
        if ((Object.keys(loggedInUser).length > 0) && isApiUrl) {
            if(this.tokenExpired(loggedInUser.Token)){
                console.log('token expired and need logging out');

                window.sessionStorage.clear(); 
                localStorage.removeItem('loggedInUserInfo');
                window.location.origin;
                window.location.reload();
            
            }
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedInUser.Token}`
                }
            }); 
        }

        return next.handle(request);
    }
    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}