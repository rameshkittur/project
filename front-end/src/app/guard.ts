// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInUser()) {
      return true;
    } else {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
