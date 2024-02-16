import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class SignupComponent {

  async whitespacecontrol(control: FormControl): Promise<{ [s: string]: boolean }> {
    if (control.value != null) {
      if (control.value.indexOf(' ') != -1) {

        return { 'whitespace': true };
      }
    }

    return null;
  }

  signupForm: FormGroup = this.fb.group({
    displayName: ['', Validators.required, this.whitespacecontrol.bind(this)],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signupForm_2: FormGroup = this.fb.group({
    bio: ['', [Validators.required,Validators.minLength(0), Validators.maxLength(500)]]
  });

  constructor(private router: Router, private fb: FormBuilder, private _auth: FirebaseIntegrationService) { }

  async onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission logic here
      var success = await this._auth.createUser(this.signupForm.controls["email"]?.value || "", this.signupForm.controls["password"]?.value || "", this.signupForm_2.controls['bio'].value || "", this.signupForm.controls['displayName'].value || "")
      if (success == "Success") {
        await this.router.navigateByUrl("/email/welcome")
      } else {
        //Error
      }
    }
  }

  isValid() {
    return (this.signupForm.valid && this.signupForm_2.valid);
  }
}
