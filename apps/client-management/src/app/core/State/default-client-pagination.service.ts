import { Injectable } from '@angular/core';
import { StateService } from '..';

@Injectable({
  providedIn: 'root'
})
export class DefaultClientPaginationService extends StateService<>{

  constructor() { }
}
