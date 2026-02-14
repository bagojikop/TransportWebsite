import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 http = inject(HttpClient);
 loginForm: FormGroup;
 formMessage: string = '';
 isError: boolean = false;
  constructor(
      private fb: FormBuilder,
      private router: Router,
       private authService: AuthService
    ) {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
  
      });
    }
  isPasswordVisible: boolean = false;
  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }
  login() {
    
    const entity = this.loginForm.value;

    this.http.post(`${environment.API_URL}register/login`, entity).subscribe({
      next: (response) => {
         this.authService.setUser(response);
        
          this.isError = false;
          this.formMessage = '';
        // Handle successful login, e.g., navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isError = true;
       
        this.formMessage = error.error?.message || 'Login failed. Please try again.';
        // Handle login error, e.g., show error message
      }
    });
  }
   
}
