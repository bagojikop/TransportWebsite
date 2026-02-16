import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
   constructor(private router: Router) {}
  users = [
    {
      username: 'admin',
      fullName: 'aarti',
      mobileNo: '+91 98765 43210',
      email: 'aarti@gmail.com',
      systemAdmin: 'Yes'
    },
    {
      username: 'user',
      fullName: 'Abhi',
      mobileNo: '+91 87654 32109',
      email: 'abhi@gmail.com',
      systemAdmin: 'No'
    },
    
    
  ];

  // Method to navigate to user creation page
  navigateToUserCreation(): void {
    this.router.navigate(['/user-creation']);
  }
}