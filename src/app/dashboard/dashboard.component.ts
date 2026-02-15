import { Component } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Domain Information
  public entity: any = {};
  
  constructor(private authService: AuthService, 
    private tenantService: TenantService,
     private http: HttpClient, 
     private router: Router) {
       
  }
  ngOnInit(): void {
    const id = this.authService.getUser()?.customerId;
    this.http.get(`${environment.API_URL}tenant`, { params: { id: id } }).subscribe({
      next: (data) => {
        this.entity = data;
        this.tenantService.setTenant({ tenantId: this.entity.tenantId, customerId: this.entity.customerId, tenantName: this.entity.name });
      },
      error: (error) => {
        console.error('Error loading domain information:', error);
      }
    })
  }
  createFirm() {
    this.router.navigate(['/transporters']);
  }
  editFirm(firm: any) {
    this.router.navigate(['/transporters',{id:firm.firmCode}]);
  }

  toggleFirmStatus(firm: any) {
    firm.active = !firm.active;
    this.http.post(`${environment.API_URL}tenant/firm-disable`,firm).subscribe({
      next:(res)=>{

      }
    })
     
  }

}