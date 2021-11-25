import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exec-epp-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrls: ['./company-contacts-form.component.scss']
})
export class CompanyContactsFormComponent implements OnInit {
  projects:string[]=[];
  total = 10;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  totalPage!:number;
  searchKey='';
  searchStateFound=false;

  constructor() { }

  ngOnInit(): void {
  }

}
