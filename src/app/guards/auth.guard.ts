import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const loggedIn = await this.authService.isLoggedIn();

        if (!loggedIn) {
          this.router.navigate(['employee/login']);
          return false;
        }
  
      try {
        const user = this.authService.getTokenInformation();
        const userInfo = await firstValueFrom(this.authService.getUserInfo(user.get('EmployeeName')));
  
        if (!userInfo) {
          console.error("User data could not be fetched.");
          this.router.navigate(['employee/login']);
          return false;
        }

        if (route.data['role'] && !userInfo?.permissions.includes(route.data['role'])) {
          this.router.navigate(['unauthorized'], {queryParams: {errorMsg: "User doesn't have the right permissions to view content."}});
          return false;
        }
  
        return true;
      } catch (error) {
        console.error("Error fetching user info:", error);
        this.router.navigate(['employee/login']);
        return false;
      }
    }
  }