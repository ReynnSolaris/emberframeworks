import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { PoliciesComponent } from './policies/policies.component';
import { PaymentComponent } from './billing/payment/payment.component';
import { LoginComponent } from './employee/login/login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { ProfiledetailsComponent } from './employee/profiledetails/profiledetails.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ChangePasswordComponent } from './employee/change-password/change-password.component';
import { UpdateProfileComponent } from './employee/update-profile/update-profile.component';
import { EmployeedebugComponent } from './developer/employeedebug/employeedebug.component';
import { NgprimedebugComponent } from './developer/ngprimedebug/ngprimedebug.component';
import { ModpageComponent } from './modpage/modpage.component';
import { ItemviewComponent } from './mod/itemview/itemview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'billing/payment', component: PaymentComponent},
  { path: 'employee', redirectTo: 'employee/login'},
  { path: 'unauthorized', component: UnauthorizedComponent },
  { 
    path: 'developer/ngprime', 
    component: NgprimedebugComponent,
    canActivate: [authGuard],
    data: {
        role: 'Developer',
      }
  },
  {
    path: 'mod/trial_eldritch',
    component: ModpageComponent,
  },
  {
    path: 'mod/model_view',
    component: ItemviewComponent,
  },
  { 
    path: 'developer/employeedebug', 
    component: EmployeedebugComponent,
    canActivate: [authGuard],
    data: {
        role: 'Developer',
      }
  },
  { 
    path: 'employee/profile', 
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { 
    path: 'employee/profile/change-password', 
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  { 
    path: 'employee/profile/update', 
    component: UpdateProfileComponent,
    canActivate: [authGuard],
  },
  { 
    path: 'employee/profile/:userId', 
    component: ProfiledetailsComponent,
    canActivate: [authGuard],
    data: {
        role: 'Manager',
      }
  },
  { path: 'employee/login', component: LoginComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
