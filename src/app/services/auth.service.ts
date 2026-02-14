import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any;

  constructor() {
    const saved = localStorage.getItem('user');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.currentUser;
  }

  getToken(): string | null {
    return this.currentUser?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}
