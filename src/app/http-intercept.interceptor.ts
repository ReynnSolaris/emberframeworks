import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

const platformId = PLATFORM_ID;

export const httpInterceptInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.match(environment.API_Endpoint)) {
        req = req.clone({
            setHeaders: { 'x-api-key': environment.API_X_KEY, uid: environment.API_UID, 'Accept': '*'}
        })
    } else if (req.url.match(environment.AUTH_API)) {
    }
  return next(req);
};
