import { Component, OnInit } from '@angular/core';
import {
  EditProjectStateService,
  PaginatedResult,
  PermissionService,
  Project,
  ProjectService,
} from '../../../../core';

import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { PermissionListService } from '../../../../../../../../libs/common-services/permission.service';
import { debounceTime } from 'rxjs/operators';

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

  editProjectPermission = false;
  searchProject = new FormControl();
  total = 9;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  totalPage!: number;
  searchKey = '';
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
    if (this.searchProject.value?.length > 1 && this.searchStateFound == true) {
      this.projectService
        .getWithPagnationResut(index, this.pageSize, this.searchProject.value)
        .subscribe((response: PaginatedResult<Project[]>) => {
          this.projects = response.data;

          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;
        });
    } else {
      this.projectService
        .getWithPagnationResut(index, 10)
        .subscribe((response: PaginatedResult<Project[]>) => {
          this.projects = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
        });
      this.searchStateFound = false;
    }
  }

  constructor(
    private  editProjectStateService: EditProjectStateService,
    private permissionList: PermissionListService,
    private projectService: ProjectService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getfilterDataMenu();
    this.projectService
      .getWithPagnationResut(1, 10)
      .subscribe((response: PaginatedResult<Project[]>) => {
        this.projects = response.data;
        this.intiaload = false;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;

        this.projectService.setFristPageOfProjects(response);
      });

    this.valuechangeSearchProject();
  }

  nzSortOrderChange(SortColumn: string,direction: string| null) {
    if(direction == 'ascend'){
    this.sortDirection = 'Ascending';
    }
    else if(direction == 'descend'){
      this.sortDirection = 'Descending';
    }
    else {
      this.sortDirection = null;
    }
    this.SortColumn = SortColumn;
    this.getProjects();
  }

  getfilterDataMenu(): void {
    this.projectService.getFilterData().subscribe((data) => {
      this.cleints = data.ClientFilter;
      this.supervisors = data.supervisorFilter;
      this.statuses = data.StatusFilter;
    });
  }
  getCurrentUser() {
    if (localStorage.getItem('loggedInUserInfo')) {
      // eslint-disable-next-line prefer-const
      this.loggedInUserInfo = localStorage.getItem('loggedInUserInfo');
      const user = JSON.parse(this.loggedInUserInfo);

      this.id = user['EmployeeGuid'];

    }
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
        }
        else {
          this.loading = false;

          this.projects = [] as Project[];
          this.pageIndex = 0;
          this.pageSize = 0;
          this.total = 0;
          this.totalPage = 0;
          this.searchStateFound = false;
          this.notification.blank('  Project not found', '', {
            nzPlacement: 'bottomLeft',
          });
        }
        // this.projectService
        //   .getWithPagnationResut(1, 9, this.searchKey)
        //   .subscribe((response: PaginatedResult<Project[]>) => {
        //     if (response?.data.length > 0) {
        //       this.loading = false;
        //       this.projects = response.data;
        //       this.pageIndex = response.pagination.pageIndex;
        //       this.pageSize = response.pagination.pageSize;
        //       this.total = response.pagination.totalRecord;
        //       this.totalPage = response.pagination.totalPage;
        //       this.searchStateFound = true;
        //     } else {
        //       this.loading = false;
        //       this.projects = [] as Project[];
        //       this.pageIndex = 0;
        //       this.pageSize = 0;
        //       this.total = 0;
        //       this.totalPage = 0;
        //       this.searchStateFound = false;
        //       this.notification.blank('  Project not found', '', {
        //         nzPlacement: 'bottomLeft',
        //       });
        //     }
        //   });
      } else {
        this.projects = this.projectService.getFirsttPageValue().data;

        this.pageIndex =
          this.projectService.getFirsttPageValue().pagination.pageIndex;
        this.pageSize =
          this.projectService.getFirsttPageValue().pagination.pageSize;
        this.total =
          this.projectService.getFirsttPageValue().pagination.totalRecord;
        this.totalPage =
          this.projectService.getFirsttPageValue().pagination.totalPage;
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
      this.id = ''
    }
    this.projectService.getWithPagnationResut(
      this.pageIndex,
      this.pageSize,
      this.id,
      this.clientlist,
      this.superVisorlist,
      this.statuslist,
      this.searchKey,
      this.SortColumn,
      this.sortDirection
    ).subscribe(response => {
      this.loading = false;
      this.projects = response.data;
      this.pageIndex = response.pagination.pageIndex;
      this.pageSize = response.pagination.pageSize;
      this.total = response.pagination.totalRecord;
      this.totalPage = response.pagination.totalPage;
    })
  }
  editProject(data:Project)
  {
    this.editProjectStateService.editProjectState(data);
  }
}
