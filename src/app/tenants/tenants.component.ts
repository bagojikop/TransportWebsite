import { Component } from '@angular/core';
import { Tenant } from '../Models/Tenant';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent {
  tenantData: Tenant = {} as Tenant;

formMessage: string = '';
isError: boolean = false;

  constructor(private authService: AuthService ,private http: HttpClient,  private fb: FormBuilder,private router: Router) {
    
    const user = this.authService.getUser();
    this.tenantData.customerId = user?.customerId || 0;  // Set customerId from logged-in user
  }


  isLicenseVisible: boolean = false;

  toggleLicenseVisibility(): void {
    this.isLicenseVisible = !this.isLicenseVisible;
  }

  createTenant(): void {
    this.http.post(`${environment.API_URL}tenant/create`, this.tenantData).subscribe({
          next: (response) => {
            this.isError=false;
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.formMessage = error.error || 'Tenant creation failed. Please try again.';
            this.isError = true;
          }
        });
         
          
       

  }
  

  cancel(): void {
    this.resetForm();
    console.log('Cancelled tenant creation');
  }

  

  private resetForm(): void {
    
    this.isLicenseVisible = false;
  }
}