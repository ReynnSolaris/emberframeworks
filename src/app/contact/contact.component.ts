import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainApiService } from '../main-api.service';
import { catchError, of } from 'rxjs';
import { ok } from 'assert';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';
  
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });;

  sending = false;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private api: MainApiService) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {

  }

 submitForm() {
    if (this.contactForm.valid) {
      // Handle form submission
      var msg = "";
      var errored = false;
      this.sending = true;
      try {
        var a = (this.api.submitContactReq(JSON.stringify(this.contactForm.getRawValue()))).subscribe({ 
            next: (result: any) => {
                msg = result.msg;
            },
            error: (err: any) => {
                    errored = true;
                    msg = err.message;
                },
            complete: () => {
                this.sending = false;
                this.dialog.open(ContactDialog, {
                    data: {
                      message: msg,
                      error: errored
                    },
                  });
                  this.contactForm.reset();
            }
        });
      } catch(exception) {

      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}


@Component({
    selector: 'contact-dialog',
    templateUrl: 'contact-dialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent],
  })
  export class ContactDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  }