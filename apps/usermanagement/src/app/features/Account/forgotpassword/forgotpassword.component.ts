import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationBar } from '../../../utils/feedbacks/notification';
import { AccountService } from '../../Services/logIn/account.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'exec-epp-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent {
  pForgotForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,Validators.email])});
  loading = false;
  redirectUrl = environment.redirectUri;
  disable = false;

  constructor(private fb: FormBuilder,
    private actService: AccountService,
    private notification: NotificationBar,) { }
  submit(){
    this.loading = true;
    this.actService.ApplyRequestForPasswordReset(this.email?.value)
    .subscribe(
      (res: any) => 
      {
        this.notification.showNotification({
          type: 'success',
          content: 'A password reset link has been sent to your email. Please complete the task from your email in 30 minutes duration.',
          duration: 20000,
        });
        this.pForgotForm.reset();
        this.loading = false;
        this.disable=true;

      },
      (err: any) => 
      {
        this.notification.showNotification({
          type: 'error',
          content: 'Some error seems to occur from the server. Please try again or contact the admin',
          duration: 5000,
        });
      }
    )
    }
  
  
  get email() { return this.pForgotForm.get('email'); }

 
}
