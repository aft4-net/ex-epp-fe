import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.scss'],
})
export class ViewSubmissionsComponent implements OnInit {
  total = 10;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  searchKey = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navaigateToTimeSheet() {
    this.router.navigateByUrl('timesheet');
  }

  PageSizeChange(pageSize: Event) {}
  PageIndexChange(index: any): void {
    console.log(index);
    this.pageIndex = index;
    this.loading = true;
  }
}
