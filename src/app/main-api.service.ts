import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  constructor(private hc: HttpClient) { }

  async getCatalog(): Promise<any> {
    return this.hc.get(`${environment.API_Endpoint}/square/CatalogItems`).toPromise();
  }

  submitContactReq(info: any): Observable<any> {
    return this.hc.post(`${environment.API_Endpoint}/auth/contact/SendEmail`, info, {headers: {'Content-Type': 'application/json'}});
  }

  

}
