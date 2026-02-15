import { Component, OnInit } from '@angular/core';

interface User {
  username: string;
  fullName: string;
  mobileNo: string;
  email: string;
  systemAdmin: string;
  permissions: {
    add: boolean;
    edit: boolean;
    delete: boolean;
    print: boolean;
  };
}

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  originalUsers: User[] = [];
  searchTerm: string = '';
  hasChanges: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Get users from localStorage or use default data
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      this.users = parsedUsers.map((user: any) => ({
        ...user,
        permissions: user.permissions || {
          add: false,
          edit: false,
          delete: false,
          print: false
        }
      }));
    } else {
      // Default users
      this.users = [
        {
          username: 'admin',
          fullName: 'aarti',
          mobileNo: '+91 98765 43210',
          email: 'aarti@company.com',
          systemAdmin: 'Yes',
          permissions: { add: true, edit: true, delete: false, print: true }
        },
        {
          username: 'user',
          fullName: 'abhi',
          mobileNo: '+91 87654 32109',
          email: 'abhi@gmail.com',
          systemAdmin: 'No',
          permissions: { add: false, edit: true, delete: false, print: false }
        },
       
      ];
    }
    
    this.originalUsers = JSON.parse(JSON.stringify(this.users));
    this.filteredUsers = [...this.users];
  }

  getUserInitials(fullName: string): string {
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterUsers();
  }

  filterUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => 
      user.fullName.toLowerCase().includes(term) || 
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  updatePermissions(user: User): void {
    this.hasChanges = true;
  }

  savePermissions(): void {
    localStorage.setItem('userPermissions', JSON.stringify(this.users));
    this.originalUsers = JSON.parse(JSON.stringify(this.users));
    this.hasChanges = false;
    alert('Permissions saved successfully');
  }

  cancelChanges(): void {
    this.users = JSON.parse(JSON.stringify(this.originalUsers));
    this.filterUsers();
    this.hasChanges = false;
    alert('Changes cancelled');
  }
}