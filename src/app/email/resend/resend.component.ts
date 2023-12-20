import { Component, OnInit } from '@angular/core';
import {FirebaseIntegrationService} from "../../Firebase/firebase-integration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrl: './resend.component.css'
})
export class ResendComponent implements OnInit {
  constructor(private _auth: FirebaseIntegrationService, private route: Router) {

  }
  async ngOnInit() {
    setTimeout(async ()=>{
      var result = await this._auth.sendEmailVerification(this._auth.user);
      if(result=="Success") {
        this.route.navigateByUrl("/dashboard", {
          state: {
            reason: "resentEmail"
          }
        })
      }
    }, this._auth.user != null ? 0 : 500)
  }
}
