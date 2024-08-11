import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    errorMessage: string = "";
    successMessage: string = "";
    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
      this.changePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
    }
  
    ngOnInit(): void {}
  
    passwordMatchValidator(form: FormGroup) {
      const newPassword = form.get('newPassword')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
  
      return newPassword === confirmPassword ? null : { passwordMismatch: true };
    }
  
    strongPasswordValidator(control: any) {
        const password = control.value || '';
        const hasNumber = password.replace(/[^0-9]/g, '').length >= 2; // At least two digits anywhere
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character
        const isLengthValid = password.length >= 8;
    
        if (!hasNumber) {
          return { passwordWeak: 'Password must contain at least 2 digits' };
        }
    
        if (!hasSpecialCharacter) {
          return { passwordWeak: 'Password must contain at least 1 special character' };
        }
    
        if (!isLengthValid) {
          return { passwordWeak: 'Password must be at least 8 characters long' };
        }
    
        return null;
      }
    
      onSubmit() {
        if (this.changePasswordForm.valid) {
          const oldPassword = this.changePasswordForm.controls['oldPassword'].value;
          const newPassword = this.changePasswordForm.controls['newPassword'].value;
          this.errorMessage = "";
          this.successMessage = "";
          this.authService.changePassword(oldPassword, newPassword).subscribe(
            response => {
              // Handle the different response messages
              switch(response.msg) {
                case 'pass_error':
                  this.errorMessage = 'The old password is incorrect.';
                  break;
                case 'pass_changed':
                  this.successMessage = 'Password changed successfully!';
                  this.router.navigate(['employee/profile']);
                  break;
                case 'pass_notvalid':
                  this.errorMessage = 'The new password does not meet the requirements.';
                  break;
                default:
                  this.errorMessage = 'An unknown error occurred.';
              }
            },
            error => {
              if (error.status === 401) {
                this.errorMessage = 'Unauthorized: Unable to change password.';
              } else {
                this.errorMessage = 'An error occurred while changing the password.';
              }
            }
          );
        }
      }
      
  }
