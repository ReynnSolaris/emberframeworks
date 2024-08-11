import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, MaybeAsync, GuardResult } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
  })
export class authGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['employee/login']);
            return false;
        }
        var user = this.authService.getTokenInformation();
        return (this.authService.getUserInfo(user.get('EmployeeName')).pipe(map( _u => {
            console.log(_u);
            if (route.data['role'] && _u?.permissions.indexOf(route.data['role']) === -1) {
                this.router.navigate(['unauthorized'], {queryParams: {errorMsg: "User doesn't have the right permissions to view content."}});
                return false;
            }
            if (route.data['roles']) {
                var found = false;
                route.data['roles'].forEach((_role: any) => {
                    if(_u?.permissions.indexOf(_role) !== -1) {
                       found = true;
                       return true;
                    }
                });
                if (!found) {
                    this.router.navigate(['unauthorized'], {queryParams: {errorMsg: "User doesn't have the right permissions to view content."}});
                    return false;
                }
            }
            return true;
        })));
    }
  
  }
