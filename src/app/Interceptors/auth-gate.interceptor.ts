import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, from, mergeMap, Observable, ObservableInput, switchMap, take} from 'rxjs';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthGateInterceptor implements HttpInterceptor {

  constructor(private Firebase: FirebaseIntegrationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* Firebase will refresh token automatically if expired */
    req = req.clone({
      setHeaders : {
        "Content-Type": "application/json",
        "Accept": "*",
        "Access-Control-Allow-Origin": 'http://localhost:4200,https://management.emberframeworks.xyz',
      }
    })
    if (req.url.match("/client-api/")) {
      return from(this.getCurrentIdToken()).pipe(

        mergeMap(token => {
          if (token) {
            req = req.clone({
              setHeaders: {
                "ID_TOKEN": `${token}`,
                "UID": this.Firebase.auth.currentUser != null ? this.Firebase.auth.currentUser.uid : ""
              }
            });
          }
          return next.handle(req);
        })
      )
    }
    return next.handle(req);
  }

  getCurrentIdToken() {
    return new Promise((resolve, reject) => {
      const auth = this.Firebase.auth;
      const unsubscribe = auth.onIdTokenChanged(user => {
        unsubscribe();
        if (user) {
          user.getIdToken().then(token => {
            resolve(token);
          });
        } else {
          reject(null);
        }
      }, reject);
    });
  }
}
