import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionListService } from '../../../../../../libs/common-services/permission.service';

@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit {

  constructor(private router: Router, private permissionList: PermissionListService) {
  }

  ngOnInit(): void {
    
  }

  authorize(key: string) {
    return this.permissionList.authorizedPerson(key)
  }

  addProjectPage() {
    this.router.navigateByUrl('projectmanagement/add-project');
  }

}
