import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FirebaseIntegrationService} from "../../Firebase/firebase-integration.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  invalidCode = false;
  otherError = false;
  enabled = false;
  constructor(public _auth: FirebaseIntegrationService, public router: Router, private activatedRouter: ActivatedRoute) {
    var oobCode = this.activatedRouter.snapshot.queryParamMap.get('oobCode');
    var action = this.activatedRouter.snapshot.queryParamMap.get('mode');
    if (oobCode==null || action==null) {
      this.router.navigateByUrl("/dashboard");
    }
    switch (action) {
      case "verifyEmail":
        var r = this._auth.verifyEmail(oobCode).then((b) => {
          if (b == "Success") {

          } else if (b == "auth/invalid-action-code") {
            this.invalidCode = true;
          } else {
            this.otherError = true;
          }
        });
        break;
      default:
        break;
    }
    setTimeout(()=> {
      this.router.navigateByUrl("/dashboard")
    }, 10000)
    this.enabled = true;
  }

  ngOnInit() {

  }
}
