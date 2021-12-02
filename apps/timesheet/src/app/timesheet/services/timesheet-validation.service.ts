import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetValidationService {

  constructor() { }
  dateSelectionInWeek(fromDate:Date,toDate:Date,weekStart:Date,weekEnd:Date) {
  
    return fromDate< weekStart && toDate> weekEnd;
    
  }
}

