import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sys00201, Sys00203 } from '../Models/Users';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TenantService } from '../services/tenant.service';
import { messageType, MsgBox } from '../services/MsgBox';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent {

  constructor(private router: Router, private http: HttpClient, private tenantService: TenantService,private msgBox:MsgBox) {

  }

  userData = {} as Sys00203;

  formMessage: string = '';
  isError: boolean = false;
  currentUserId = history.state?.id;
  customerId = this.tenantService.getTenant()?.customerId;

  isPasswordVisible: boolean = false;

  ngOnInit() {
    if (this.currentUserId) {

      this.http.get(`${environment.API_URL}appUser/user-by-id`,
        { params: { customerId: this.customerId, id: this.currentUserId } }).subscribe({
          next: (res) => this.userData = res as Sys00203
        })
    }
  }
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
    if (!this.userData.cred)
      this.userData.cred = {} as Sys00201

    this.userData.cred.password = password;

  }

  getPasswordStrengthClass(): string {

    const password = this.userData.cred?.password;
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
    switch (strength) {
      case 'strong': return 'Strong password';
      case 'medium': return 'Medium password';
      case 'weak': return 'Weak password';
      default: return '';
    }
  }

  saveUser(): void {
    const url= this.userData.userId  ?'appUser/update' :'appUser/create' ;

      this.http.post(`${environment.API_URL}${url}`, this.userData, { params: { customerId: this.customerId } }).subscribe({
        next: (res) => {
        
          this.router.navigate(['/users']); // Navigate back to users page after save
        }, error: (err) => {
          this.msgBox.Show(messageType.Information,"Information",err.error);
        
          
        }
      })
  }

  cancel(): void {
    this.resetForm();
    this.router.navigate(['/users']); // Navigate back to users page on cancel
    console.log('Form cancelled');
  }

  private resetForm(): void {
    this.userData = {} as Sys00203;
    this.userData.cred = {} as Sys00201;
    this.isPasswordVisible = false;
  }
}