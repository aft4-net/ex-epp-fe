import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/user/account.service';
import { environment } from '../../environments/environment';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userInfo;
        const isLoggedIn = user && user.Token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.Token}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            });
        }

        return next.handle(request);
    }
}