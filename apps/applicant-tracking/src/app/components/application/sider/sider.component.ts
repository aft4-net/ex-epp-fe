import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
import { AreasOfInterestService } from '../../../services/applicant/areas-of-interest.service';
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
  route = '';

  generalSubmitCheck = false;
  aofSubmitCheck = false;
  educationSubmitCheck = false;
  wExperienceSubmitCheck = false;
  linkSubmitCheck = false;
  addDocumentSubmitCheck = false;

  checker1: any = false;
  counter: any = 1;

  user = this.accountService.userInfo;

  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

  personalCheck() {
    this.generalInfoService.getPersonalInfo({ email: this.user.Email })
    .subscribe((response) => {
      if(response.Data.ContactNumber){
        this.generalSubmitCheck = true;
      }
    });
  }

  aoiCheck() {
    this.aoiService.data.subscribe((response) => {
      this.aofSubmitCheck = response;
    });
  }

  educationCheck() {
    this.generalInfoService.getPersonalInfo({ email: this.user.Email })
    .subscribe((response) => {
      if(response.Data.ContactNumber){
        this.generalSubmitCheck = true;
      }
    });
  }

  constructor(private router: Router, 
    private accountService: AccountService, 
    private aoiService: AreasOfInterestService, 
    private generalInfoService: ApplicantGeneralInfoService) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) this.route = evt.url;
    });
  }

  ngOnInit(): void {
    this.personalCheck();
    this.aoiCheck();
  }
}
