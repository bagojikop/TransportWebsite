import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeMenu: string = 'dashboard';
  isUserManagementOpen: boolean = false;
  isPermissionsOpen: boolean = false;

  constructor(private router: Router) {}

  // Dashboard click event
  onDashboardClick(): void {
    this.activeMenu = 'dashboard';
    this.closeAllDropdowns();
    this.router.navigate(['/dashboard']);
    console.log('Navigating to Dashboard');
  }

  // Profile click event
  onProfileClick(): void {
    this.activeMenu = 'profile';
    this.closeAllDropdowns();
    this.router.navigate(['/profile']);
    console.log('Navigating to Profile');
  }

  // Tenants click event
  onTenantsClick(): void {
    this.activeMenu = 'tenants';
    this.closeAllDropdowns();
    this.router.navigate(['/tenants']);
    console.log('Navigating to Tenants');
  }

  // Transporters click event
  onTransportersClick(): void {
    this.activeMenu = 'transporters';
    this.closeAllDropdowns();
    this.router.navigate(['/transport-dashboard']);
    console.log('Navigating to Transporters');
  }

  // Users click event
  onUsersClick(): void {
    this.activeMenu = 'users';
    this.router.navigate(['/users']);
    console.log('Navigating to Users');
  }

  // User Access click event
  onUserAccessClick(): void {
    this.activeMenu = 'user-access';
    this.router.navigate(['/user-access']);
    console.log('Navigating to User Access');
  }

  // Module Access click event
  onModuleAccessClick(): void {
    this.activeMenu = 'module-access';
    this.router.navigate(['/module-access']);
    console.log('Navigating to Module Access');
  }

  // Toggle User Management dropdown
  toggleUserManagement(): void {
    this.isUserManagementOpen = !this.isUserManagementOpen;
    if (!this.isUserManagementOpen) {
      this.isPermissionsOpen = false;
    }
  }

  // Toggle Permissions dropdown
  togglePermissions(event: Event): void {
    event.stopPropagation();
    this.isPermissionsOpen = !this.isPermissionsOpen;
  }

  // Close all dropdowns
  closeAllDropdowns(): void {
    this.isUserManagementOpen = false;
    this.isPermissionsOpen = false;
  }

  // Logout click event
  onLogoutClick(): void {
    console.log('Logging out');
    this.router.navigate(['/home']);
  }
}