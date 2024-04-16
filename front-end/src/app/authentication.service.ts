import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey = 'authToken';
  private sessionTimeout = 60 * 60 * 1000; // 30 minutes in milliseconds
  private timer: any;

  constructor(private router:Router) {}

  login(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
    this.startSessionTimer();
  }

  logout() {
    // sessionStorage.removeItem(this.tokenKey);
    // clearTimeout(this.timer);
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  private startSessionTimer() {
    this.timer = setTimeout(() => {
      this.logout();
      // Optionally: navigate to logout page or display session timeout message
    }, this.sessionTimeout);
  }

  resetSessionTimer() {
    clearTimeout(this.timer);
    this.startSessionTimer();
  }

  getToken(): any {
    return sessionStorage.getItem(this.tokenKey);
  }
}
