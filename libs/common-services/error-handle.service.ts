import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrHandleService {

    formatErrors(error:any) {
    return throwError(error);
  }

  log(data: any) {
    console.log(data);
  }
}
