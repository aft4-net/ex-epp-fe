import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../../../libs/common-services/Authentication.service';


@Injectable({
  providedIn: 'root'
})
export class  HttpInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    if(this.authService.isLogin())
    req=req.clone({ headers: req.headers.set( 'Authorization',  `Bearer ${localStorage.getItem('token')}`)})
          return next.handle(req)
    }
}





