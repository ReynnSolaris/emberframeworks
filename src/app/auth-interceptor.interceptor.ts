import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

// Prevent multiple refresh requests at the same time
const isRefreshing = new BehaviorSubject<boolean>(false);
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let modifiedReq = req;
  if (token) {
    modifiedReq = addToken(req, token);
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing.getValue()) {
        return handle401Error(authService, modifiedReq, next);
      }
      return throwError(() => error);
    })
  );
};

// Handle Token Refresh
const handle401Error = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (!isRefreshing.getValue()) {
    isRefreshing.next(true);
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((newToken) => {
        isRefreshing.next(false);
        refreshTokenSubject.next(newToken);
        return next(addToken(req, newToken));
      }),
      catchError((error) => {
        isRefreshing.next(false);
        authService.logOut();
        return throwError(() => error);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next(addToken(req, token!)))
    );
  }
};

// Attach Token to Request
const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
};
