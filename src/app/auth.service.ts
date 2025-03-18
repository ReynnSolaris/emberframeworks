import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, firstValueFrom, map, switchMap } from 'rxjs';
import { throwError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private token: string = '';
  private refreshTokenV: string = '';
  private userData = new Map<string, any>();

  public employeeInfo: any = {
    jobTitle: '',
    userId: null,
    roleName: '',
    permissions: [],
    userName: '',
  };

  constructor(private http: HttpClient, private router: Router) { 
    this.loadStoredToken();
  }

  /** Load token from local storage if available */
  private loadStoredToken() {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token') || '';
      this.refreshTokenV = localStorage.getItem('refreshToken') || '';
      if (this.token) {
        this.decodeToken();
      }
    }
  }

   getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.AUTH_API}/employee-management/roles`);
  }

  getJobTitles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.AUTH_API}/employee-management/jobTitles`);
  }

  refreshToken(): Observable<string> {
    const accessToken = this.getToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      this.logOut();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<{ token: string; refreshToken: string }>(
      `${environment.AUTH_API}/Authentication/RefreshToken`, // C# API endpoint
      { token: accessToken, refreshToken: refreshToken }, // Send tokens in the request body
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      map(response => {
        // ✅ Save new tokens
        this.setToken(response.token, response.refreshToken);
        return response.token;
      }),
      catchError(error => {
        this.logOut();
        return throwError(() => error);
      })
    );
  }

  /** Store tokens and update user state */
  setToken(token: string, refreshToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.token = token;
      this.refreshTokenV = refreshToken;
      this.decodeToken();
    }
  }

  /** Decode JWT Token & Extract Data */
  private decodeToken() {
    try {
      if (!this.token) return;
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      this.userData.set('EmployeeId', Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || 0));
      this.userData.set('EmployeeName', payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || '');
      this.userData.set('EmployeeRole', payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'User');
    } catch (error) {
      console.error("Error decoding JWT token", error);
      this.logOut();
    }
  }

  /** Retrieve token data */
  getTokenInformation(): Map<string, any> {
    return this.userData;
  }

  /** Fetch full user details */
  async fetchUserDetails(): Promise<any> {
    try {
      const username = this.userData.get('EmployeeName');
      if (!username) return null;
      const userInfo = await firstValueFrom(this.getUserInfo(username));
      this.employeeInfo = userInfo;
      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }


  
  /** Fetch user details from API */
  getUserInfo(username: string): Observable<any> {
    const url = `${environment.AUTH_API}/Authentication/GetUserInfo`;
    return this.http.get(url, {
      headers: new HttpHeaders({ username, token: this.token })
    }).pipe(catchError(this.handleError));
  }

  /** Logout user */
  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      this.token = '';
      this.refreshTokenV = '';
      this.userData.clear();
      this.router.navigate(['employee/login']);
    }
  }

  /** Check if user is logged in */
  async isLoggedIn(): Promise<boolean> {
    const token = this.getToken();
  
    if (!token) return false; // No token, user is not logged in
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      if (payload.exp > Date.now() / 1000) {
        return true; // Token is still valid
      } else {
       // console.warn("Token expired, attempting refresh...");
        const newToken = await firstValueFrom(this.refreshToken());
  
        return !!newToken; // Returns true if refresh is successful
      }
    } catch (error) {
      return false; // Invalid token, return false
    }
  }
  

  /** Login user */
  login(username: string, password: string): Observable<any> {
    const url = `${environment.AUTH_API}/Authentication/GetToken`;
    return this.http.post(url, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.AUTH_API}/employee-management/employees/${id}`);
  }
  

  /** Change Password */
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${environment.AUTH_API}/Authentication/ChangePassword`;
    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        oldPassword, 
        newPassword,
        authorization: `Bearer ${this.token}`
      })
    }).pipe(catchError(this.handleError));
  }

  /** Handle API Errors */
  private handleError(error: HttpErrorResponse) {
    console.error("AuthService Error:", error);
    return throwError('Something went wrong; please try again later.');
  }
}
