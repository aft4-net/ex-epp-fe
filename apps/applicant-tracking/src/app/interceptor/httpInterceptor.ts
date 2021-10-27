import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

 let loggedInUserInfo = JSON.parse(localStorage.getItem('loggedInUserInfo')??'');

    if (loggedInUserInfo && loggedInUserInfo.token) {
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${loggedInUserInfo.token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
        });
    }

    return newRequest.handle(request);
 }
}