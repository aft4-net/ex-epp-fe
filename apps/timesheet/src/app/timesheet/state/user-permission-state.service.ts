import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IntialdataService } from '../../../../../../libs/common-services/intialdata.service'

@Injectable({
  providedIn: 'root'
})
export class UserPermissionStateService {
  private permissionListSource = new BehaviorSubject<any[]>([]);
  permissionList$ = this.permissionListSource.asObservable();
  userPermissionList: any[] = [];

  constructor(private initialDataService: IntialdataService) {
    this.permissionList$.subscribe((permissionList: any[]) => {
      this.userPermissionList = permissionList;
    });
  }

  getUserPermission() {
    this.initialDataService.getUserPermission().subscribe((response: any) => {
      this.permissionListSource.next(response.Data);
    }, error => {
      console.log(error);
    });
  }

  authorizedPerson(key: string) {
    let found=false; 
    this.userPermissionList.forEach(element => {      
        if(element.KeyValue==key){
          found= true;
        }
    });
    return found;
  }
}
