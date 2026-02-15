import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent {
  
  constructor(private router: Router) {} 

  userData = {
    name: '',
    mobileNo: '',
    email: '',
    username: '',
    password: ''
  };

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  generatePassword(): void {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    this.userData.password = password;
  }

  getPasswordStrengthClass(): string {
    const password = this.userData.password;
    if (!password) return '';
    
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    
    if (password.length < 6) return 'weak';
    if (hasLetters && hasNumbers && hasSpecial && isLongEnough) return 'strong';
    if ((hasLetters && hasNumbers) || (hasLetters && hasSpecial) || (hasNumbers && hasSpecial)) return 'medium';
    return 'weak';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrengthClass();
    switch(strength) {
      case 'strong': return 'Strong password';
      case 'medium': return 'Medium password';
      case 'weak': return 'Weak password';
      default: return '';
    }
  }

  saveUser(): void {
    if (this.userData.name && this.userData.mobileNo && this.userData.email && 
        this.userData.username && this.userData.password) {
      console.log('Saving user:', this.userData);
      alert(`User "${this.userData.name}" created successfully!`);
      this.resetForm();
      this.router.navigate(['/users']); // Navigate back to users page after save
    }
  }

  cancel(): void {
    this.resetForm();
    this.router.navigate(['/users']); // Navigate back to users page on cancel
    console.log('Form cancelled');
  }

  private resetForm(): void {
    this.userData = {
      name: '',
      mobileNo: '',
      email: '',
      username: '',
      password: ''
    };
    this.isPasswordVisible = false;
  }
}