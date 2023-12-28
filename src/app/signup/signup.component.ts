import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: [''],
      interests: [''],
      bio: ['']
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted:', this.signupForm.value);
      // You can send the data to a backend API or perform further actions
    }
  }
}
