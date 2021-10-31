import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/user/account.service';

@Component({
  selector: 'exec-epp-area-interest',
  templateUrl: './area-interest.component.html',
  styleUrls: ['./area-interest.component.scss']
})
export class AreaInterestComponent implements OnInit {
  // generalInfo = {} as PersonalInformation[];
  // profile = <PersonalInformation>{}
  constructor(private router: Router, private accountService: AccountService) { }

  personalCheck(){
    // this.accountService.generalInfo(32).subscribe(res => {
    //   this.generalInfo = res.data;
    //   this.profile = this.generalInfo[0];
    //   if (this.dept.departmentName) {this.router.navigateByUrl('application/personal-info');}
    //   console.log(this.dept);
    // }, error =>{
    //   console.log(error);
    // });
  }

  ngOnInit(): void {
    this.personalCheck();
  }
  }


