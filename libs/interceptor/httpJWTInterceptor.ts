import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
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
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedInUser.Token}`,
                    ReferrerPolicy: "no-referrer"
                }             
            }); 
        }
        else {
            request = request.clone({
                setHeaders: {
                    ReferrerPolicy: "no-referrer"
                }             
            });
        }

        return next.handle(request);
    }
}