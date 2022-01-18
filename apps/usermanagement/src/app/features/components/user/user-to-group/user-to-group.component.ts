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
  isLoadng = false;

  isGroupModalVisible = false;
  groupfrm: any;

  selectedUserId = '00be94a8-09fe-41c8-8151-7d9cc771996b';

  groupList: GroupSetModel[] = [];
  selectedGroups: string[] = [];
  constructor(private userService: AddUserService, private notifier: NotifierService) { ; }

  ngOnInit(): void {
      this.groupfrm = new FormGroup({
          Groups: new FormControl([], Validators.required),
      });
  }
  onAddGroups() {
      this.selectedGroups = [];
      this.isGroupModalVisible = true;
      this.isLoadng = true;
      this.userService.getGroups().subscribe(
          (r:  GroupSetModel[]) => {

              this.groupList = r;
              this.userService.getUserGroups(this.selectedUserId).subscribe(
                  (r: ResponseDTO<GroupSetModel[]>) => {
                      r.Data.forEach(el => {
                          this.selectedGroups.push(el.Guid);
                      });
                      this.groupfrm.setValue({'Groups': this.selectedGroups});
                  },
                  (error: any) => {
                      console.log(error);
                  }
              );
              this.isLoadng = false;
          },
          (error: any) => {
              console.log(error);
              this.onShowError(error.Error);
          }
      );

  }
  onShowError(err: any) {
      let errMsg = 'Some error occured. Please review your input and try again. ';
      this.notifier.notify(NotificationType.error, errMsg);
      this.isLoadng = false;
  }
  onSaveGroups() {
      this.selectedGroups = [];
      this.isLoadng = true;
          const x = this.groupfrm.get('Groups').value;
          
          x.forEach((el: string) => {
              this.selectedGroups.push(el as string);
          });

      this.userService.addGroups(this.selectedUserId, this.selectedGroups).subscribe(
          () => {
              this.notifier.notify(
                  NotificationType.success,
                  'User is created successfully'
              );
              this.isLoadng = false;
              this.isGroupModalVisible = false;
              this.selectedGroups = [];
              this.groupfrm.reset();
          },
          (err: any) => this.onShowError(err)
      );

  }

  handleCancel() {
      this.isGroupModalVisible = false;
      this.groupfrm.reset();
  }
}
