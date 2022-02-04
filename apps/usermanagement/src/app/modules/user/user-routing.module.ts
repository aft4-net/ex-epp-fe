import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../../components/user/signup/signup.component';
import { SigninComponent } from '../../components/user/signin/signin.component';
import { unAuthorizedCheck } from '../../services/autherization/unAuthorizedCheck';
import { LoginComponent } from '../../features/Account/user/login/login.component';

const routes: Routes = [
  { path: '', component: SigninComponent, canActivate: [unAuthorizedCheck] },
  { path: 'signin', component: SigninComponent, canActivate: [unAuthorizedCheck]},
 
  { path: 'signup', component: SignupComponent, canActivate: [unAuthorizedCheck] },

  { path: 'login', component: LoginComponent, canActivate: [unAuthorizedCheck] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
