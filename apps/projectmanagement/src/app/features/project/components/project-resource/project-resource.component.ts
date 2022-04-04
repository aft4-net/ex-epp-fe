import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProjectResourceStateService } from 'apps/projectmanagement/src/app/core';

@Component({
  selector: 'exec-epp-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss'],
})
export class ProjectResourceComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private projectResourceStateService: ProjectResourceStateService
  ) {}
  ngOnInit(): void {
    if (!this.projectResourceStateService.isOnEditstate)
      this.router.navigateByUrl('projectmanagement');
  }

  ngOnDestroy(): void {
    this.projectResourceStateService.restUpdateProjectState();
  }
  navaigateToProject() {
    this.router.navigateByUrl('projectmanagement');
    this.projectResourceStateService.restUpdateProjectState();
  }
}
