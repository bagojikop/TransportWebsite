import { Component, OnInit } from '@angular/core';

interface User {
  username: string;
  fullName: string;
  mobileNo: string;
  email: string;
  systemAdmin: string;
}

interface Module {
  name: string;
  role: string;
  access: boolean;
}

@Component({
  selector: 'app-module-access',
  templateUrl: './module-access.component.html',
  styleUrls: ['./module-access.component.scss']
})
export class ModuleAccessComponent implements OnInit {
  users: User[] = [];
  modules: Module[] = [];
  originalModules: Module[] = [];
  selectedUser: string = '';

  ngOnInit(): void {
    this.loadUsers();
    this.loadModules();
  }

  loadUsers(): void {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      this.users = [
        {
          username: 'admin',
          fullName: 'aarti',
          mobileNo: '+91 98765 43210',
          email: 'aarti@gmail.com',
          systemAdmin: 'Yes'
        },
        {
          username: 'user',
          fullName: 'abhi',
          mobileNo: '+91 87654 32109',
          email: 'abhi@gmail.com',
          systemAdmin: 'No'
        },
        
       
      ];
    }
  }

  loadModules(): void {
    this.modules = [
      { name: 'Administrator', role: 'Full system access', access: false },
      { name: 'Auditor', role: 'View only + audit logs', access: false },
      { name: 'Finance', role: 'Financial modules access', access: false },
      { name: 'Transport', role: 'Transport management access', access: false }
    ];
    this.originalModules = JSON.parse(JSON.stringify(this.modules));
  }

  onUserChange(): void {
    if (this.selectedUser) {
      const savedAccess = localStorage.getItem(`module_access_${this.selectedUser}`);
      if (savedAccess) {
        this.modules = JSON.parse(savedAccess);
      } else {
        this.modules = [
          { name: 'Administrator', role: 'Full system access', access: false },
          { name: 'Auditor', role: 'View only + audit logs', access: false },
          { name: 'Finance', role: 'Financial modules access', access: false },
          { name: 'Transport', role: 'Transport management access', access: false }
        ];
      }
      this.originalModules = JSON.parse(JSON.stringify(this.modules));
    }
  }

  getSelectedUserName(): string {
    const user = this.users.find(u => u.username === this.selectedUser);
    return user ? user.fullName : '';
  }

  getSelectedUserRole(): string {
    const user = this.users.find(u => u.username === this.selectedUser);
    return user?.systemAdmin === 'Yes' ? 'System Administrator' : 'Standard User';
  }

  getSelectedUserInitials(): string {
    const user = this.users.find(u => u.username === this.selectedUser);
    if (!user) return '';
    return user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getGrantedCount(): number {
    return this.modules.filter(m => m.access).length;
  }

  updateModuleAccess(module: Module): void {
    console.log(`Module ${module.name} access: ${module.access}`);
  }

  saveModuleAccess(): void {
    if (this.selectedUser) {
      localStorage.setItem(`module_access_${this.selectedUser}`, JSON.stringify(this.modules));
      this.originalModules = JSON.parse(JSON.stringify(this.modules));
      
      // Show success message (you can use a toast notification here)
      alert(`Permissions saved for ${this.getSelectedUserName()}`);
    }
  }

  cancelChanges(): void {
    this.modules = JSON.parse(JSON.stringify(this.originalModules));
    alert('Changes reverted');
  }
}