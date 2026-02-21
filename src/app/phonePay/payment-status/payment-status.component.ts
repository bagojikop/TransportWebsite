import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html'
})
export class PaymentStatusComponent implements OnInit {

  orderId!: string;
  status!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['merchantOrderId'];
      this.status = params['status'];
    });
  }
}