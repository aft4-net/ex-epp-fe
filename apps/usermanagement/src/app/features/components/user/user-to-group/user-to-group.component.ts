import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotificationType, NotifierService } from "../../../../shared/services/notifier.service";

import { GroupSetModel } from "../../../Models/group-set.model";
import { ResponseDTO } from "../../../Models/ResponseDTO";
import { AddUserService } from "../../../services/add-user.service";

@Component({
    selector: 'exec-epp-add-group',
    templateUrl: './user-to-group.component.html',
    styleUrls: ['./user-to-group.component.scss'],
  })
  export class UserToGroupComponent implements OnInit {
    
    isVisible = false;
    isLoadng = false;
    groupfrm: any;
    selectedUserId = '19a91684-0559-455e-89fc-b49a7cfa59ae';

    groupList: GroupSetModel[] = [];
    selectedGroups: string []  = [];
    constructor(private userService: AddUserService, private notifier: NotifierService){;}
    
    ngOnInit(): void {
      this.groupfrm = new FormGroup({
          Groups: new FormControl([], Validators.required),
        });
    }
    onAddGroups()
    {
      this.selectedGroups = [];
      this.isVisible = true;
      this.isLoadng = true;
      this.userService.getGroups().subscribe(
        (r:ResponseDTO<[GroupSetModel]>) => {

          this.groupList= r.Data;
          this.userService.getUserGroups(this.selectedUserId).subscribe(
            (r:ResponseDTO< [string]>) => {
              this.selectedGroups= r.Data;
            },
            (error: any)=>{
                ;
            }
          );
          this.isLoadng =false;
        },
        (error: any)=>{
          console.log(error);
          this.onShowError(error.Error);
        }
      );

      
      

    }
    onShowError(err: any) {
      let errMsg = 'Some error occured. Please review your input and try again. ';
      errMsg = err ? errMsg + `<br/><br/><hr/>${err}` : errMsg;
      console.log(err);
      this.notifier.notify(NotificationType.error, errMsg);
      this.isLoadng = false;
    }
    onSaveGroups()
    {
      if(this.selectedGroups == null || '')
        this.onShowError('Select employee');

      this.isLoadng = true;

          this.userService.addGroups(this.selectedUserId, this.selectedGroups).subscribe(
            () => {
              this.notifier.notify(
                NotificationType.success,
                'User is created successfully'
              );
              this.isLoadng = false;
              this.isVisible = false;
              this.selectedGroups = [];
            },
            (err: any) => this.onShowError(err)
          )

        }
      
        handleCancel()
        {
            this.isVisible = false;
        }
    }
    

