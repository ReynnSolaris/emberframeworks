import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {
  employeeForm!: FormGroup;
  roles: any[] = [];
  jobTitles: any[] = [];
  isEditMode: boolean;
  permissions: string[] = []; // Read-only permissions

  constructor(
    private fb: FormBuilder,
    private employeeService: AuthService,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.initializeEmptyForm();
  }

  initializeEmptyForm() {
    this.employeeForm = this.fb.group({
      userId: [null], // Can be null for new users
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      preferredName: [''],
      roleId: ['', Validators.required], // Will be set after roles are loaded
      jobId: ['', Validators.required], // Will be set after jobs are loaded
      salaryRate: [null, [Validators.required, Validators.min(0)]],
      positionType: ['Full-Time', Validators.required],
      address: ['', Validators.required],
      emergencyContacts: this.fb.array([])
    });
  }

  async ngOnInit() {
    // Load Roles & Job Titles before setting form values
    await this.loadRoles();
    await this.loadJobTitles();

    if (this.isEditMode && this.data) {
      this.updateFormWithData();
    }
  }

  async loadRoles() {
    try {
      this.roles = (await this.employeeService.getRoles().toPromise()) || [];
    } catch (error) {
      console.error('Error fetching roles:', error);
      this.roles = [];
    }
  }

  async loadJobTitles() {
    try {
      this.jobTitles = (await this.employeeService.getJobTitles().toPromise()) || [];
    } catch (error) {
      console.error('Error fetching job titles:', error);
      this.jobTitles = [];
    }
  }

  getRoleByName(roleName: string): any | null {
    return this.roles.find(role => role.roleName === roleName) || { roleId: 0 };
  }

  getJobByName(jobName: string): any | null {
    return this.jobTitles.find(job => job.name === jobName) || { jobId: 0 };
  }

  updateFormWithData() {
    this.permissions = this.data.permissions || []; // Set permissions (read-only)

    this.employeeForm.patchValue({
      userId: this.data?.userId || null,
      userName: this.data?.userName || '',
      firstName: this.data?.firstName || '',
      lastName: this.data?.lastName || '',
      preferredName: this.data?.preferredName || '',
      roleId: this.getRoleByName(this.data?.roleName).roleId || '',
      jobId: this.getJobByName(this.data?.jobTitle).jobId || '',
      salaryRate: this.data?.salaryRate ?? null,
      positionType: this.data?.positionType || 'Full-Time',
      address: this.data?.address || ''
    });

    // Populate Emergency Contacts
    if (this.data?.emergencyContacts) {
      this.emergencyContacts.clear();
      this.data.emergencyContacts.forEach((contact: any) => {
        this.emergencyContacts.push(
          this.fb.group({
            contactId: [contact.contactId || 0],
            fullName: [contact.fullName || '', Validators.required],
            phone: [contact.phone || '', [Validators.required, Validators.pattern('^\\(\\d{3}\\) \\d{3}-\\d{4}$')]]
          })
        );
      });
    }
  }

  get emergencyContacts(): FormArray {
    return this.employeeForm.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact() {
    this.emergencyContacts.push(
      this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^\\(\\d{3}\\) \\d{3}-\\d{4}$')]]
      })
    );
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }
}
