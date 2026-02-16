import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { messageType, MsgBox } from '../services/MsgBox';
import { environment } from 'src/environments/environment';
import { Mst004 } from '../Models/Firms';

@Component({
  selector: 'app-transport-dashboard',
  templateUrl: './transport-dashboard.component.html',
  styleUrls: ['./transport-dashboard.component.scss']
})
export class TransportDashboardComponent {
 constructor(private router: Router, private http: HttpClient,
    private tenantService: TenantService,
    private msgBox: MsgBox
  ) {


  }
  firms = [] as Mst004[];
  private customerId = this.tenantService.getTenant()?.customerId;

  ngOnInit() {

    this.http.get(`${environment.API_URL}tenant/firm-list`, { params: { tenantId: this.customerId } }).subscribe({
      next: (res) => {
        this.firms = res as Mst004[];
      }
    })

  }
  editFirm(firm: any) {
    this.router.navigate(['/transport-create'],{state:{ id:firm.firmCode}});
  }

   toggleFirmStatus(firm: any) {
    firm.active = !firm.active;
    this.http.post(`${environment.API_URL}tenant/firm-disable`,firm).subscribe({
      next:(res)=>{

      }
    })
     
  }
  // Method to navigate to user creation page
  navigateToFirmCreation(): void {
    this.router.navigate(['/transport-create']);
  }
}
