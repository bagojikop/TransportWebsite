import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  // Selected Plan
  selectedPlan = {
    name: 'Basic Plan',
    price: 1000
  };

  // User and Firm counts
  users: number = 1;
  firms: number = 1;
  maxUsers: number = 2;

  // Add-on bundle (all features for ₹250/month)
  addonBundle: boolean = false;

  // Promo code
  promoMessage: string = '';
  promoValid: boolean = false;
  discountAmount: number = 0;
  promoCodeDisplay: string = '';

  // Update users
  updateUsers(action: 'increase' | 'decrease'): void {
    if (action === 'increase' && this.users < this.maxUsers) {
      this.users++;
    } else if (action === 'decrease' && this.users > 1) {
      this.users--;
    }
  }

  // Update firms
  updateFirms(action: 'increase' | 'decrease'): void {
    if (action === 'increase') {
      this.firms++;
    } else if (action === 'decrease' && this.firms > 1) {
      this.firms--;
    }
  }

  // Toggle add-on bundle
  toggleAddonBundle(): void {
    this.addonBundle = !this.addonBundle;
  }

  // Calculate monthly subtotal
  get monthlySubtotal(): number {
    return this.selectedPlan.price + 
           ((this.users - 1) * 250) + 
           ((this.firms - 1) * 250) + 
           (this.addonBundle ? 250 : 0) - 
           this.discountAmount;
  }

  // Calculate yearly subtotal
  get yearlySubtotal(): number {
    return this.monthlySubtotal * 12;
  }

  // Calculate yearly GST
  get yearlyGstAmount(): number {
    return Math.round(this.yearlySubtotal * 0.18);
  }

  // Calculate yearly total
  get yearlyTotalAmount(): number {
    return this.yearlySubtotal + this.yearlyGstAmount;
  }

  

  // Apply promo code
  applyPromo(code: string): void {
    this.promoCodeDisplay = code.toUpperCase();
    
    if (code.toUpperCase() === 'SAVE10') {
      this.promoValid = true;
      this.discountAmount = Math.round(this.selectedPlan.price * 0.1);
      this.promoMessage = 'Promo applied! 10% off on base plan';
    } else if (code.toUpperCase() === 'WELCOME500') {
      this.promoValid = true;
      this.discountAmount = 500;
      this.promoMessage = 'Promo applied! ₹500 off';
    } else {
      this.promoValid = false;
      this.discountAmount = 0;
      this.promoMessage = 'Invalid code';
      this.promoCodeDisplay = '';
    }
  }
}