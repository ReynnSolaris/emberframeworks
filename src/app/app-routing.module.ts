import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {VerifyComponent} from "./email/verify/verify.component";
import {SignupComponent} from "./signup/signup.component";
import {ResendComponent} from "./email/resend/resend.component";

const routes: Routes = [
  //Authentication
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  //Main Hub
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // Email
  {
    path: 'email/verify',
    component: VerifyComponent
  },
  {
    path: 'email/resend',
    component: ResendComponent
  },
  // General
  {
    path: '*',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
