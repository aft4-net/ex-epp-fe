import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {

  @Input() active = 0
  constructor(private router:Router) {}
  title = 'Side-bar';
  route = '';
  activeRoute(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
