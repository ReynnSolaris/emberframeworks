import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Hash } from 'crypto';
import { UserInfo } from './models/UserInfo';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   constructor(private http: HttpClient, private route: Router) { }
   public employeeInfo: any = {
    jobTitle: '',
    userId: 1,
    roleName: '',
    permissions: [],
    userName: '',
   };
   private token: string = "";
   public v = new Map<string, any>();
    setToken(token: any, refreshToken: any) {
    if (isPlatformBrowser(this.platformId)) {
        const tokenStorage = localStorage.getItem('token'); 
        if (tokenStorage) {
            console.log("detected token change ~~ do something");
            
        }
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        const payload = atob(token.split('.')[1]); 
        const parsedPayload = JSON.parse(payload);
        this.setTokenInformation();
        return true;
    }
  }

  setTokenInformation(): Map<string, any> {
    this.v.set('EmployeeId', 0);
    this.v.set('EmployeeRole', 'User');
    this.v.set('EmployeeName', 'Username');

    if (isPlatformBrowser(this.platformId)) {
        const tokenStorage = localStorage.getItem('token'); 
        if (tokenStorage) {
            const payload = atob(tokenStorage.split('.')[1]); 
            const parsedPayload = JSON.parse(payload);
            this.v.set('EmployeeId', Number.parseInt(parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]));
            this.v.set('EmployeeName', parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            this.v.set('EmployeeRole', parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

            this.getUserInfo(this.v.get('EmployeeName')).subscribe( 
                response => {
                    this.employeeInfo = response;
                    console.log(this.employeeInfo, response);
                },
                error => {
                    console.log(error);
                }
            )
        }
    }

    return this.v;
  }

  getTokenInformation(): Map<string, any> {
    if (isPlatformBrowser(this.platformId)) {
        const tokenStorage = localStorage.getItem('token'); 
        if (tokenStorage) {
            const payload = atob(tokenStorage.split('.')[1]); 
            const parsedPayload = JSON.parse(payload);
            this.v.set('EmployeeId', Number.parseInt(parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]));
            this.v.set('EmployeeName', parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            this.v.set('EmployeeRole', parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        }
    }
    return this.v;
  }

  getEmployeeDetails(): any {
    // This should ideally make an HTTP request to fetch employee details
    // For now, we'll return a mock employee
    var Name = `${this.employeeInfo?.firstName || ''} ${this.employeeInfo?.preferredName ? '"' + this.employeeInfo?.preferredName + '" ' : ''}${this.employeeInfo?.lastName}`;
    return {
        name: Name,
        userName: this.employeeInfo.userName,
        photoUrl: `/assets/EmployeePhotos/${this.employeeInfo.userName}_${this.employeeInfo.userId}.jpg`,
        roleName: this.employeeInfo.roleName || '',
        title: this.employeeInfo.jobTitle || '',
        permissions: this.employeeInfo.permissions || [''],
        id: this.employeeInfo.userId || '',
        address: this.employeeInfo?.address || '',
        emergencyContacts: this.employeeInfo?.emergencyContacts || [],
        payRate: this.employeeInfo?.hourlyRate || 0.00,
        employmentStatus: this.employeeInfo?.positionType || '',
        salary: this.employeeInfo?.salaryRate || 0.00,
        announcements: this.employeeInfo?.announcements,
        schedule: [
            { title: 'Task 1', start: '2024-06-17T07:30:00' },
            { title: 'Task 2', start: '2024-06-17T11:45:00', end: '2024-06-10T14:15:00' },
            { title: 'Task 3', start: '2024-06-19T09:00:00' },
            { title: 'Task 4', start: '2024-06-19T17:30:00' },
            { title: 'Task 5', start: '2024-06-20T13:15:00' }
      ]
    };
  }
  private readonly platformId = inject(PLATFORM_ID);

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("token", "");
        this.route.navigate(['employee/login']);
    }
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token'); 
        if (token) {
            this.token = token;
            const payload = atob(token.split('.')[1]); 
            const parsedPayload = JSON.parse(payload); 
            var loggedIn = (parsedPayload.exp > Date.now() / 1000);
            const refreshToken = localStorage.getItem('refreshToken'); 
            if (!loggedIn && refreshToken) {

            }
            return loggedIn;
        } else {
            this.token = "";
        }
    }
    return false;
  }

  login(username: string, password: string): Observable<any> {
    const url = `${environment.AUTH_API}/Authentication/GetToken`;
    return this.http.post(url, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  getUserInfo(username: string): Observable<any> {
    const url = `${environment.AUTH_API}/Authentication/GetUserInfo`;
    return this.http.get(url, { headers: { username: username, token: this.token }}).pipe(
        catchError(this.handleError)
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
        const tokenStorage = localStorage.getItem('token'); 
        if (tokenStorage) {
            this.token = tokenStorage;
        }
    }
    const url = `${environment.AUTH_API}/Authentication/ChangePassword`;
    return this.http.post(url, {}, { headers: { oldPassword: oldPassword, newPassword: newPassword, token: this.token, authorization: `Bearer ${this.token}` } }).pipe(
        catchError(this.handleError)
    );
}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
