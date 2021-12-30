import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../../services/user/account.service';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { FormValidator } from '../../../utils/validator';
import { Router } from '@angular/router';


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent  {

constructor(
  private accountService: AccountService,
  private router: Router,
  private notification: NotificationBar,
  private validator: FormValidator
) {}
  
//

}

