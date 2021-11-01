import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';

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

  generalSubmitCheck: boolean = false;
  aofSubmitCheck: boolean = false;
  educationSubmitCheck: boolean = false;
  wExperienceSubmitCheck: boolean = false;
  linkSubmitCheck: boolean = false;
  addDocumentSubmitCheck: boolean = false;

  // generalInfo = {} as PersonalInformation[];
  // profile = <PersonalInformation>{}
  checker1: any = false;
  counter: any = 1;
  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

  personalCheck() {
    // this.accountService.generalInfo(32).subscribe(res => {
    //   this.generalInfo = res.data;
    //   this.profile = this.department[0];
    //   if (this.dept.departmentName) {this.generalSubmitCheck = true;}
    //   console.log(this.dept);
    // }, error =>{
    //   console.log(error);
    // });
  }

  constructor(private router: Router, private accountService: AccountService) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) this.route = evt.url;
    });
  }

  ngOnInit(): void {
    this.personalCheck();
  }
}
