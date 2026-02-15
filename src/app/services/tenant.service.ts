import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private currentTenant: any;

  constructor() {
    const saved = localStorage.getItem('tenant');
    if (saved) {
      this.currentTenant = JSON.parse(saved);
    }
  }

  setTenant(tenant: any) {
    this.currentTenant = tenant;
    localStorage.setItem('tenant', JSON.stringify(tenant));
  }

  getTenant() {
    return this.currentTenant;
  }

  getToken(): string | null {
    return this.currentTenant?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentTenant;
  }

  logout() {
    this.currentTenant = null;
    localStorage.removeItem('tenant');
  }
}
