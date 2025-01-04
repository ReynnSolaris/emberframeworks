import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptInterceptor } from './http-intercept.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips'
import { PoliciesComponent } from './policies/policies.component';
import { PaymentComponent } from './billing/payment/payment.component';
import { LoginComponent } from './employee/login/login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { ProfiledetailsComponent } from './employee/profiledetails/profiledetails.component';
import { DecimalPipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventDetailsComponent } from './event-details/event-details.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ChangePasswordComponent } from './employee/change-password/change-password.component';
import { UpdateProfileComponent } from './employee/update-profile/update-profile.component';
import { EditDialogComponent } from './employee/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from './employee/confirm-dialog/confirm-dialog.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { NgprimedebugComponent } from './developer/ngprimedebug/ngprimedebug.component';
import { EmployeedebugComponent } from './developer/employeedebug/employeedebug.component';
import { ModpageComponent } from './modpage/modpage.component';
import { ItemviewComponent } from './mod/itemview/itemview.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ServicesComponent,
    PoliciesComponent,
    PaymentComponent,
    LoginComponent,
    ProfileComponent,
    ProfiledetailsComponent,
    EventDetailsComponent,
    UnauthorizedComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    ChatComponent,
    NgprimedebugComponent,
    EmployeedebugComponent,
    ModpageComponent,
    ItemviewComponent
  ],
  imports: [
    EditorModule,
    FormsModule,
    DecimalPipe,
    BrowserModule, 
    AppRoutingModule,     
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FullCalendarModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatTooltipModule,
    HttpClientModule
],
  providers: [provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withInterceptors([httpInterceptInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
