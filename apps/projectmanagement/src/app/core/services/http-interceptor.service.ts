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
 
    
      //    const tokenizedReq=req.clone({ headers: req.headers.set( 'Authorization', `Bearer ${window.sessionStorage.getItem('secret')}`)})
       
       const  authreq=req.clone({ headers: req.headers.set( 'Authorization',  `Bearer ${localStorage.getItem('userId')}`)})
          return next.handle(authreq)
      
  

  }
}





