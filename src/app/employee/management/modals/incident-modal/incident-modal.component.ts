import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incident-modal',
  templateUrl: './incident-modal.component.html',
  styleUrl: './incident-modal.component.css'
})
export class IncidentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<IncidentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public incident: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
