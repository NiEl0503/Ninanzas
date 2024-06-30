import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() { }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken'); 
  }
}
