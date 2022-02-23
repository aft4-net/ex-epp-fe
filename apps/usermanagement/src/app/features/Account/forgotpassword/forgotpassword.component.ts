import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../utils/validator';

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
  constructor(private fb: FormBuilder,
    private validator: FormValidator) { }
  submit(){;}
  
  
  get email() { return this.pForgotForm.get('email'); }

 
}
