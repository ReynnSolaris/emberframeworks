import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";

@Injectable()
export class AuthGateInterceptor implements HttpInterceptor {

  constructor(private Firebase: FirebaseIntegrationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.Firebase.auth.idToken.pipe(
      take(1), // <-------------- Only emit the first value!

      switchMap((token: any) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
        return next.handle(request);
      })

    );
  }
}
