import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, provideRoutes } from '@angular/router';
//import { ApplicantGeneralInfoService } from '../../../services/applicant/applicant-general-info.service';
//import { AreasOfInterestService } from '../../../services/applicant/areas-of-interest.service';
//import { EducationService } from '../../../services/applicant/education.service';
//import { AccountService } from '../../../services/user/account.service';

interface RouteLinks {
  name: string;
  link: string;
}

@Component({
  selector: 'exec-epp-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent implements OnInit {
  route = '';

  userSubmitCheck = false;
  groupSubmitCheck = false;
  educationSubmitCheck = false;
  

  checker1: any = false;
  counter: any = 1;

  //user = this.accountService.userInfo;

  activePath(routePath: string) {
    if (this.route === '') this.route = this.router.url;
    return this.route == routePath;
  }

 /* educationCheck() {
    this.educationService.data.subscribe((response) => {
      this.educationSubmitCheck = response;
    });
    this.educationService.getByApplicantId(this.user.Guid).subscribe((response) => {
      this.educationSubmitCheck = response.Data.length > 0 ? true : false;
    });
  } **/

  constructor(private router: Router){}
  //  private accountService: AccountService, 
   // private aoiService: AreasOfInterestService, 
   // private educationService: EducationService,
   /* private generalInfoService: ApplicantGeneralInfoService) {
    router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) this.route = evt.url;
    }); **/
  //}

  ngOnInit(): void {
   // this.personalCheck();
  }
}
