import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingStateService } from '../state/loading-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingIntercptorService implements HttpInterceptor {

  constructor(private loadingStateService: LoadingStateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingStateService.loading();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingStateService.finishedLoading();
      })
    );
  }
}
