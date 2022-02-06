import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUserInfo') ?? '{}'
    );
    if (loggedInUser){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.Token}`
        }
      })
    }
    return next.handle(req)
  }
}





