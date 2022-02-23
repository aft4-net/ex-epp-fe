import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { ProjectStatus } from '../models/get/projectStatus';

@Injectable({
  providedIn: 'root',
})
export class ProjectStatusService extends ApiService<ProjectStatus> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'ProjectStatus';
  }

  getProjecUS(): ProjectStatus[] {
    return [] as ProjectStatus[];
  }
}
