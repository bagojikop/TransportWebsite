import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  showPassword: boolean = false;
  formMessage: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  http = inject(HttpClient);


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  // Getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Fill demo credentials
  // fillDemoCredentials(): void {
  //   this.loginForm.patchValue({
  //     fullName: 'Demo User',
  //     email: 'demo@dsserp.com',
  //     mobile: '9876543210',
  //     password: 'demo123',
  //     rememberMe: true
  //   });

  //   this.formMessage = 'Demo credentials loaded. Click Sign In to continue.';
  //   this.isError = false;
  // }

  // Form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.formMessage = 'Signing in...';
      this.isError = false;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;

        const formData = this.registerForm.value;
        console.log('Login Data:', formData);

        this.http.post(`${environment.API_URL}register/create`, formData).subscribe({
          next: (response) => {

            this.formMessage = 'Sign up successful! Redirecting...';
            this.router.navigate(['/register-success']);
          },
          error: (error) => {
            console.error('API Error:', error); // 👈 ADD THIS

            this.isError = true;
            this.markFormGroupTouched(this.registerForm);
          }
        });


      }, 1500);
    } else {

    }
  }

  // Mark all fields as touched to show validation errors
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }



}