import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  constructor(private httpClient: HttpClient) {
  }

  public CheckAuth(): boolean {
    this.httpClient.get(`/client-api/Auth/UserAuthenticationVerification`).subscribe((v: boolean) => {
      return v;
    }, err => {
      return false;
    });
    return false;
  }
}
