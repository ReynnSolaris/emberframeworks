import { Component } from '@angular/core';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public _auth: FirebaseIntegrationService, private router: Router, private matDialog: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    var st = navigation.extras.state;
    if (st != null) {
      if (st.hasOwnProperty('reason')) {
        if (st['reason'] == "resentEmail") {
          console.log("was resent an email.")
        }
      }
    }
  }

  async sendEmailVerification() {
    if (this._auth.user != null) {
      var log = await this._auth.sendEmailVerification(this._auth.user);
      console.log(log);
    }
  }
}
