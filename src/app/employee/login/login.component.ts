import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
    errorMessage: string = '';
    signingIn: boolean = false;
    loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });
    ngOnInit(): void {
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.errorMessage = ''
        this.signingIn = true;
        this.authService.login(username || '', password || '').subscribe(
            
          response => {
           
            this.signingIn = false;
            var token = response?.token || '';
            var refreshToken = response?.refreshToken || ''
            if (token === '' || refreshToken === '') {
                this.errorMessage = 'Invalid Data Retrieved. (Report to IT)'
                console.error('Data Misread:', response);
                return false;
            }
            console.log('Login successful:', response);
            this.authService.setToken(token, refreshToken);
            this.router.navigate(['employee/profile']);
            // Handle successful login (e.g., redirect to dashboard)
          },
          error => {
            this.errorMessage = error;
            this.signingIn = false;
            console.error('Login error:', error);
          }
        );
      }
    }
}
