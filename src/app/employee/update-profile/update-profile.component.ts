import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
  user: any = {
    userId: 0,
    userName: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    roleName: '',
    createdTime: '',
    address: '',
    emergencyContacts: [],
    jobTitle: '',
    permissions: [],
    salaryRate: 0,
    positionType: '',
    announcements: []
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  /** Load User Data */
  private async loadUserProfile() {
    try {
     this.user = await this.authService.fetchUserDetails();
    } catch (error) {
      this.showSnackBar('Failed to load profile data.', 'error');
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-' + type : 'snack-error'
    });
  }

  addEmergencyContact() {
    this.user.emergencyContacts.push({ fullName: '', phone: '' });
  }

  deleteEmergencyContact(index: number) {
    this.user.emergencyContacts.splice(index, 1);
  }

  saveProfile() {

  }
}
