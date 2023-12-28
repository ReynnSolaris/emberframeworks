// Auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: FirebaseIntegrationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Replace this with your actual authentication logic
    var isAuthenticated = false; // Assuming the user is authenticated
    if (this.auth.auth.currentUser != null)
      isAuthenticated = true;
    if (!isAuthenticated) {
      // If not authenticated, navigate to the home page
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
