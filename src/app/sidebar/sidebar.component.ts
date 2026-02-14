import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeMenu: string = 'dashboard';

  constructor(private router: Router) {}

  // Dashboard click event
  onDashboardClick(): void {
    this.activeMenu = 'dashboard';
    this.router.navigate(['/dashboard']);
    console.log('Navigating to Dashboard');
  }

  // Profile click event
  onProfileClick(): void {
    this.activeMenu = 'profile';
    this.router.navigate(['/profile']);
    console.log('Navigating to Profile');
  }

  // Tenants click event
  onTenantsClick(): void {
    this.activeMenu = 'tenants';
    this.router.navigate(['/tenants']);
    console.log('Navigating to Tenants');
  }

  // Transporters click event
  onTransportersClick(): void {
    this.activeMenu = 'transporters';
    this.router.navigate(['/transporters']);
    console.log('Navigating to Transporters');
  }

  // Logout click event
  onLogoutClick(): void {
    console.log('Logging out');
    this.router.navigate(['/login']);
  }
}