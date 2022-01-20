import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUserInfo') ?? '' 
          ); 
        const isApiUrl = request.url.startsWith(environment.apiUrl);
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