import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
declare var PhonePeCheckout: any;

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})

export class PaymentRequestComponent {


  constructor(private http: HttpClient) {

  }
  async ngOnInit() {
    await this.loadPhonePeScript();


  }

  loadPhonePeScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });

  }

  paymentRequest() {

    this.http.post<any>('api/checkout', {
      amount: 100,
      message: 'Order Payment',
      redirectUrl: window.location.origin + '/payment-status',
      metaInfo: {}
    })
      .subscribe(res => {
        if (res.success) {
          PhonePeCheckout.transact({
            tokenUrl: res.redirectUrl,
            callback: this.paymentCallback,
             type: "IFRAME"
          });
        }
      });
  }
  paymentCallback(response: any) {
    if (response === 'USER_CANCEL') {
      alert('Payment was cancelled by the user.');
    } else if (response === 'CONCLUDED') {
      alert('Payment process has concluded.');
      location.reload();
    }
  }
}
