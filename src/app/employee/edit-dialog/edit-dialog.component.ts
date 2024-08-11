import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.fullName || !!data.address || !!data.phoneNumber;

    this.editForm = this.fb.group({
        fullName: [data.fullName || ''],
      phone: [data.phone || ''],
      address: [data.address || ''],
      phoneNumber: [data.phoneNumber || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.editForm.value);
  }
}
