import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "./Interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  constructor(private httpClient: HttpClient) {
  }

  public CheckAuth(): Observable<boolean> {
    return this.httpClient.get<boolean>(`/client-api/Auth/Verification`);
  }

  public GetUserInformation() {
    return this.httpClient.get<User>(`/client-api/User/GetInformation`);
  }


  async CreateUser(uid: any, bio: any) {
    return this.httpClient.post(`/client-api/User/Registration`, {
      biography: bio
    })
  }
}
