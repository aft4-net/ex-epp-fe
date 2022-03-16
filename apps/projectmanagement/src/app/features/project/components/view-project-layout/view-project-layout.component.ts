import { Component, OnInit } from '@angular/core';
import {
  EditProjectStateService,
  PaginatedResult,
  Project,
  ProjectResourceStateService,
  ProjectService,
} from '../../../../core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { PermissionListService } from '../../../../../../../../libs/common-services/permission.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-view-project-layout',
  templateUrl: './view-project-layout.component.html',
  styleUrls: ['./view-project-layout.component.scss'],
})
export class ViewProjectLayoutComponent implements OnInit {
  paginatedprojects$!: Observable<PaginatedResult<Project[]>>;
  projects: Project[] = [];
  deleteProjectPermission = false;
  cleints: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  supervisors: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  statuses: { text: string; value: string }[] = [] as {
    text: string;
    value: string;
  }[];
  deleteProjectModal = false;
  editProjectPermission = false;
  searchProject = new FormControl();
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  totalPage!: number;
  searchKey = '';
  projectToDelete: Project = {} as Project;
  id!: string;
  clientlist: string[] = [];
  superVisorlist: string[] = [];
  statuslist: string[] = [];
  searchStateFound = false;
  intiaload = true;
  loggedInUserInfo?: any;
  nzSortDirections = Array<'Ascending' | 'Descending' | null>();

  SortColumn: string | null = null;
  sortDirection: string | null = null;

  PageIndexChange(index: any): void {
    this.pageIndex = index;
    this.loading = true;
    this.getProjects();
  }

  constructor(
    private router: Router,
    private projectResourceStateService: ProjectResourceStateService,
    private editProjectStateService: EditProjectStateService,
    private permissionList: PermissionListService,
    private projectService: ProjectService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.valuechangeSearchProject();
  }

  nzSortOrderChange(SortColumn: string, direction: string | null) {
    if (direction == 'ascend') {
      this.sortDirection = 'Ascending';
    } else if (direction == 'descend') {
      this.sortDirection = 'Descending';
    } else {
      this.sortDirection = null;
    }
    this.SortColumn = SortColumn;
    this.getProjects();
  }

 

  valuechangeSearchProject() {
    this.searchProject.valueChanges.pipe(debounceTime(1500)).subscribe(() => {
      if (this.searchProject.value?.length > 1) {
        this.loading = true;
        this.searchKey = this.searchProject.value;
        this.getProjects();
        if (this.projects.length > 0) {
          this.loading = false;
          this.searchStateFound = true;
        } else {
          this.projects = [] as Project[];
          this.loading = false;
          this.total = 0;
          this.totalPage = 0;
          this.searchStateFound = false;
        }
      } else {
        this.searchKey = '';
        this.getProjects();
      }
    });
  }

  authorize(key: string) {
    return this.permissionList.authorizedPerson(key);
  }
  ClientFilter(key: string[]) {
    this.clientlist = key;
    this.searchKey = '';
    this.getProjects();
  }
  supervisorFilter(key: string[]) {
    this.superVisorlist = key;
    this.searchKey = '';
    this.getProjects();
  }
  statusFilter(key: string[]) {
    this.statuslist = key;
    this.searchKey = '';
    this.getProjects();
  }
  getProjects() {
    if (this.authorize('Projects_Admin')) {
      this.id = '';
    }
    this.projectService
      .getWithPagnationResut(
        this.pageIndex,
        this.pageSize,
        this.id,
        this.clientlist,
        this.superVisorlist,
        this.statuslist,
        this.searchKey,
        this.SortColumn,
        this.sortDirection
      )
      .subscribe((response:any) => {
        this.projects = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;

        if (Object.keys(response.pagination.filter).length != 0) {
          this.cleints = response.pagination.filter.clientNameFliter;
          this.supervisors = response.pagination.filter.supervisorFilter;
          this.statuses = response.pagination?.filter.projectStatusFliter;
        }
        this.loading = false;
      });
  }
  editProject(data: Project) {
    this.editProjectStateService.editProjectState(data);
  }

  deleteProjectConformation(data: Project) {
    this.projectToDelete = data;
    this.deleteProjectModal = true;
  }

  deleteProject() {
    this.loading = true;
    this.deleteProjectModal = false;
    this.projectService
      .deleteProjectByState(this.projectToDelete.Guid)
      .subscribe((result: any) => {
        if (result.success === true) {
          this.notification.success( result.message,'');
          this.searchKey = '';
          this.getProjects();
        } else {
          this.notification.error(result.message,'');
        }
        this.loading = false;
      });
    this.projectToDelete = {} as Project;
  }
  hidedeleteProjectModal() {
    this.deleteProjectModal = false;
    this.projectToDelete = {} as Project;
  }
  confirmCancel() {
    this.deleteProjectModal = false;
  }

  assignResource(data: Project) {
    this.projectResourceStateService.projectResources(data);
  }

  addProjectPage() {
    this.router.navigateByUrl('projectmanagement/add-project');
  }
}
