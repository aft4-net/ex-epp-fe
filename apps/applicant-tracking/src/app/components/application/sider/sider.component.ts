import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
interface RouteLinks {
  name: string;
  link: string;
}

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent implements OnInit {
  route: string = '';
  menu_links = [
    {
      name: 'Personal Information',
      link: '/application/personal-profile',
    },
    {
      name: 'Areas of Interst',
      link: '/application/area-of-interest',
    },
    {
      name: 'Education',
      link: '/application/education',
    },
    {
      name: 'Work Experiance',
      link: '/application/work-experiance',
    },
    {
      name: 'Links',
      link: '/application/links',
    },
    {
      name: 'Additional Documents',
      link: '/application/additional-documents',
    },
    {
      name: 'Review and Submit',
      link: '/application/review',
    },
  ];

  constructor(private router: Router) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) this.route = evt.url;
    });
  }

  ngOnInit(): void {}
}
