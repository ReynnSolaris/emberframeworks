import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {from, map, Observable} from "rxjs";
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginValid = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  })
  errorMsg = "";
  private readonly returnUrl: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: FirebaseIntegrationService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      var result = await this._authService.LoginUser(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      if (result == "no-error") {
        this._router.navigateByUrl("/dashboard");
      } else {
        this.errorMsg = result;
      }
    }
  }
}
