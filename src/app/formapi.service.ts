import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormapiService {

  constructor(private http: HttpClient) { }

sendEmail(formData: FormData): Observable<any> {
    const body = {
      fullName: formData.get("fullName") || "nonamesupplied",
      phone: formData.get("phone") || "nophonesupplied",
      email: formData.get("email") || "noemailsupplied",
      message: formData.get("message") || "No message supplied"
    };

    return this.http.post(`${environment.AUTH_API}/contact`, body);
  }
}
