import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isEditing: boolean = false;

  profileData = {
    fullName: 'Admin User',
    email: 'admin@dsserp.com',
    contactNo: '+91 98765 43210',
    address: '123, DSS Tower, Electronic City, Bangalore, Karnataka - 560100'
  };

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    console.log('Profile updated:', this.profileData);
    alert('Profile updated successfully!');
    this.isEditing = false;
  }

  getInitials(): string {
    return this.profileData.fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  }
}