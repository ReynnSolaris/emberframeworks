import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormapiService } from '../formapi.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  sending = false;
  onSubmit = false;
  showAlert = false;
  alertMessage = '';
  color: string = '';

    contactFormValues = {
    name: '',
    email: '',
    body: '',
    number: '',
    };

  constructor(private mailService: FormapiService) {}

  get alertColor() {
    return `text-${this.color}-400`;
  }

  hideAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  async submitEmail(contactForm: NgForm) {
    this.onSubmit = true;

    const formData = new FormData();
    formData.append('fullName', this.contactFormValues.name);
    formData.append('phone', this.contactFormValues.number);
    formData.append('email', this.contactFormValues.email);
    formData.append('message', this.contactFormValues.body);

    try {
      const res = await this.mailService.sendEmail(formData).toPromise();

      this.alertMessage = 'Email sent successfully!';
      this.color = 'green';
      contactForm.resetForm();
    } catch (err) {
      this.alertMessage = 'Something went wrong, try again later!';
      this.color = 'red';
    }

    this.onSubmit = false;
    this.showAlert = true;
    this.hideAlert();
  }
}
