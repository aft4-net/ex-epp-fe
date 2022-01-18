import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class httpJWTInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUserInfo') ?? '' 
          ); 
        const baseUrl = 'http://localhost:14696/api/v1'
        const isApiUrl = request.url.startsWith(baseUrl);
        if (loggedInUser && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedInUser.Token}`
                }
            }); 
        }

        return next.handle(request);
    }
}