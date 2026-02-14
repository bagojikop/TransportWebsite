import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Domain Information
  domains = {
    primary: 'https://dsserp.com',
    sub: 'https://admin.dsserp.com',
    tenant: 'https://demo.dsserp.com',
    api: 'https://api.dsserp.com/v1'
  };

  // Subscription Validity
  subscription = {
    plan: 'Enterprise',
    fromDate: '01 Jan 2026',
    toDate: '31 Dec 2026',
    daysRemaining: 322,
    progressPercentage: 12,
    autoRenewal: '15 Nov 2026'
  };
}