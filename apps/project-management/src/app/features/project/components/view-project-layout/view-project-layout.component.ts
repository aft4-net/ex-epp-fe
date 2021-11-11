import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Project } from 'apps/project-management/src/app/core/models/get/project';
import { ProjectData } from 'apps/project-management/src/app/core/models/get/project';
import { catchError } from 'rxjs/operators';

export interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}
@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';
  url='http://localhost:14696/api/v1/Project'

  getRealData(id?:string,searchKey?:string, pageIndex?:number,pageSize?:number){
     return this.http.get<ProjectData>(this.url+ '?searchKey='+searchKey+'&pageindex='+pageIndex+'&pageSize='+pageSize);

    }
  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,

  ): Observable<{ results: RandomUser[] }> {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);

    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }

  constructor(private http: HttpClient) {
    this.getRealData();
  }
}


@Component({
  selector: 'exec-epp-view-project-layout',
  templateUrl: './view-project-layout.component.html',
  styleUrls: ['./view-project-layout.component.scss']
})
export class ViewProjectLayoutComponent implements OnInit {

  projects:Project[]=[]

  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  searchKey='';
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,

  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      //this.total = 200;
      this.listOfRandomUser = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder);
  }

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null);

    this.randomUserService.getRealData(this.idParam,this.searchKey, this.pageIndex-1, this.pageSize).subscribe((projectMetaData:ProjectData)=>{
      this.projects=projectMetaData.Data;
      this.total=projectMetaData.TotalRecord;
      console.log(projectMetaData);
    })



  }



  startEdit()
  {

  }
  startDelete()
  {

  }



}




