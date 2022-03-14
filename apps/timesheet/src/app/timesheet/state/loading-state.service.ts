import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  loadingCount: number;
  loadingSource: BehaviorSubject<number>;
  loading$: Observable<number>;

  constructor() {
    this.loadingCount = 0;
    this.loadingSource = new BehaviorSubject<number>(0);
    this.loading$ = this.loadingSource.asObservable();
  }

  loading() {
    this.loadingCount++;

    this.loadingSource.next(this.loadingCount);
  }

  finishedLoading() {
    this.loadingCount--;
    if(this.loadingCount < 0) {
      this.loadingCount = 0;
    }
    
    this.loadingSource.next(this.loadingCount);
  }


}
