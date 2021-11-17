import { Injectable } from "@angular/core";
import { NotificationBar } from "../../utils/feedbacks/notification";
export enum NotificationType {
    'success' ,'message', 'error'
}

@Injectable({
    providedIn: 'root',
  })

export class NotifierService
{
    constructor(private notification: NotificationBar){}
    
    notify(type: NotificationType | 'undefined', msg: string) {
    this.notification.showNotification({
        type: type?type.toString():'success',
        content: msg,
        duration: 5000,
      });
    }
}