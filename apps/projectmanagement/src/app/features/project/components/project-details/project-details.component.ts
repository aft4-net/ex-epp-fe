import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AddProjectStateService,
  EditProjectStateService,
  ProjectResourceStateService,
  ProjectService,
} from '../../../../core';
import { PermissionListService } from '../../../../../../../../libs/common-services/permission.service';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'exec-epp-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  position: NzTabPosition = 'left';
  isOnEditstate = false;
  disallowResource = false;
  enableUpdateButton = false;
  activeTabIndex = 0;
  cancelModal = false;
  forrmvalid = false;
  isLoading=false;
  constructor(
    private  notification: NzNotificationService,
    private router: Router,
    private projectService: ProjectService,
    private projectResourceStateService: ProjectResourceStateService,
    private projectCreateState: AddProjectStateService,
    private editProjectStateService: EditProjectStateService,
    private _permissionService: PermissionListService
  ) {}

  ngOnInit(): void {
    this.projectResourceStateService.disallowResourceSource$.subscribe(
      (res) => {
        this.disallowResource = res;
      }
    );
    this.projectCreateState.isCreateProjectValid().subscribe((res) => {
      this.forrmvalid = res;
    });
  }
  ngOnDestroy(): void {
    this.projectCreateState.restAddProjectDetails();
    this.editProjectStateService.restUpdateProjectState();
  }

  showDeleteConfirm(): void {
    if (!this.enableUpdateButton && this.isOnEditstate)
      this.confimeresredirect();
    else if (!this.forrmvalid) this.confimeresredirect();
    this.activeTabIndex = 0;
    this.cancelModal = true;
  }

  confimeresredirect() {
    this.cancelModal = false;
    this.router.navigateByUrl('projectmanagement');
  }

  confirmCancel() {
    this.cancelModal = false;
  }

  authorize(key: string) {
    return this._permissionService.authorizedPerson(key);
  }

  rediretCancel() {
    this.cancelModal = false;
  }

  createProject() {
    this.isLoading=true;
    this.projectService.createProject().subscribe(()=>{  
        this.router.navigateByUrl('projectmanagement');
        this.notification.success('Project Added successfully','');
    },()=>
      {
        this.isLoading=false;
        this.notification.error('Project Not saved','Please try again  ');
      }
    )

  }
}
