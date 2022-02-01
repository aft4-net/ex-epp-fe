import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../libs/common-services/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetHttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUserInfo') ?? '{}');

    if (loggedInUser && this.authService.isLogin()){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.Token}`
        }
      })
    }
    
    return next.handle(req);
  }
}
