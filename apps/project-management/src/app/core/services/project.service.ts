import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from '../models';
import { ApiService } from '../models/apiService';

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
