import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PermissionListService } from "libs/common-services/permission.service";
import { Observable, Subscription } from "rxjs";
import { NotificationType, NotifierService } from "../../../../shared/services/notifier.service";

import { IEmployeeModel } from "../../../Models/employee.model";
import { ResponseDTO } from "../../../Models/ResponseDTO";
import { IUserGetModel } from "../../../Models/User/user-get.model";
import { IUserPostModel } from "../../../Models/User/user-post.model";
import { AddUserService } from "../../../services/add-user.service";


@Component({
  selector: 'exec-epp-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {

  isVisible = false;
  isLoadng = false;
  userfrm: any;
  isLogin=false;
  private eventsSubscription: Subscription = new Subscription();
  @Input() addUserEvents: Observable<void> = new Observable<void>();
  employeeList: IEmployeeModel[] = [];
  selectedUserValue = '';
  constructor(private userService: AddUserService,
    //private _authenticationService:AuthenticationService,
    private _permissionService:PermissionListService,
    private notifier: NotifierService){
      //this.isLogin=_authenticationService.loginStatus();
    }

  ngOnInit(): void {
    this.eventsSubscription= this.addUserEvents.subscribe(()=>this.onAddUser());
    this.eventsSubscription.add();
    this.userfrm = new FormGroup({
        UserName: new FormControl(null, [Validators.required]),
      });
  }
  authorize(key:string){

    return this._permissionService.authorizedPerson(key);
  }
  ngOnDestroy(): void {
      this.eventsSubscription.unsubscribe();
  }
  onAddUser()
  {
    this.selectedUserValue = '';
    this.isVisible = true;
    this.isLoadng = true;

    console.log('addUser');
    this.userService.getEmployeesNotInUsers().subscribe(
      (r:ResponseDTO<[IEmployeeModel]>) => {
        this.employeeList= r.Data;
        this.isLoadng =false;
        this.userfrm.reset();
      },
      (error: any)=>{
        console.log(error);
        this.onShowError(error);
      }
    )
  }
  onShowError(err: any) {
    const errMsg = 'Some error occured. Please review your input and try again. ';
    console.log(err);
    this.notifier.notify(NotificationType.error, errMsg);
    this.isLoadng = false;
  }


  onSaveUser()
  {
    if(this.selectedUserValue == null || '')
      this.onShowError('Select employee');

    this.isLoadng = true;
    const empId = this.selectedUserValue;
    this.userService.getEmployeeById(empId).subscribe(
      (res: ResponseDTO<IEmployeeModel>) => {
        const user: IUserPostModel =   {
          EmployeeId: res.Data.Guid,
          FirstName: res.Data.FirstName,
          MiddleName: res.Data.FatherName,
          LastName: res.Data.GrandFatherName,
          Tel: res.Data.MobilePhone,
          Email: res.Data.PersonalEmail,
          UserName:res.Data?.EmployeeOrganization?.CompaynEmail,
          GroupIds: []
        }

        this.userService.add(user).subscribe(
          () => {
            this.notifier.notify(
              NotificationType.success,
              'User is created successfully'
            );
            this.isLoadng = false;
            this.isVisible = false;
            this.selectedUserValue = '';
          },
          (err: any) => this.onShowError(err)
        )
      }
    )
    return;
  }
  handleCancel()
  {
    this.isVisible = false;
    this.userfrm.reset();
  }
}
