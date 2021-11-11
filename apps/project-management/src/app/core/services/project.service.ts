import { ApiService } from '../models/apiService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/get/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {




  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'projects';
  }


}
