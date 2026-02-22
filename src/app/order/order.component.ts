import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  // Base Plan
  basePlanPrice: number = 1000;
  
  // Counts
  users: number = 1;
  firms: number = 1;
  maxUsers: number = 2;
  
  // Add-ons
  addonBundle: boolean = false;
  addonPrice: number = 250;
  
  // Subscription
  subscriptionYears: number = 1;
  
  // Promo
  promoInputCode: string = '';
  promoCodeDisplay: string = '';
  promoDiscountMonthly: number = 0;
  promoValid: boolean = false;
  promoMessage: string = '';

  // Getters for monthly calculations
  get additionalUsersCount(): number {
    return Math.max(0, this.users - 1);
  }

  get additionalUsersCost(): number {
    return this.additionalUsersCount * 250;
  }

  get additionalFirmsCount(): number {
    return Math.max(0, this.firms - 1);
  }

  get additionalFirmsCost(): number {
    return this.additionalFirmsCount * 250;
  }

  get addonCost(): number {
    return this.addonBundle ? this.addonPrice : 0;
  }

  get monthlyTotal(): number {
    return this.basePlanPrice + this.additionalUsersCost + this.additionalFirmsCost + this.addonCost;
  }

  // Getters for yearly calculations
  get basePlanYearly(): number {
    return this.basePlanPrice * 12 * this.subscriptionYears;
  }

  get additionalUsersYearly(): number {
    return this.additionalUsersCost * 12 * this.subscriptionYears;
  }

  get additionalFirmsYearly(): number {
    return this.additionalFirmsCost * 12 * this.subscriptionYears;
  }

  get addonBundleYearly(): number {
    return this.addonCost * 12 * this.subscriptionYears;
  }

  get subtotalBeforeDiscount(): number {
    return this.basePlanYearly + this.additionalUsersYearly + this.additionalFirmsYearly + this.addonBundleYearly;
  }

  // Subscription Discount
  get subscriptionDiscountPercentage(): number {
    return (this.subscriptionYears - 1) * 10;
  }

  get subscriptionDiscountAmount(): number {
    if (this.subscriptionYears <= 1) return 0;
    return Math.round(this.subtotalBeforeDiscount * this.subscriptionDiscountPercentage / 100);
  }

  // Promo Discount
  get promoDiscountYearly(): number {
    return this.promoDiscountMonthly * 12 * this.subscriptionYears;
  }

  // Total Discount
  get totalDiscount(): number {
    return this.subscriptionDiscountAmount + this.promoDiscountYearly;
  }

  get subtotalAfterDiscount(): number {
    return this.subtotalBeforeDiscount - this.totalDiscount;
  }

  get gstAmount(): number {
    return Math.round(this.subtotalAfterDiscount * 0.18);
  }

  get totalAmount(): number {
    return this.subtotalAfterDiscount + this.gstAmount;
  }

  // Methods
  increaseUsers(): void {
    if (this.users < this.maxUsers) {
      this.users++;
    }
  }

  decreaseUsers(): void {
    if (this.users > 1) {
      this.users--;
    }
  }

  increaseFirms(): void {
    this.firms++;
  }

  decreaseFirms(): void {
    if (this.firms > 1) {
      this.firms--;
    }
  }

  toggleAddonBundle(): void {
    this.addonBundle = !this.addonBundle;
  }

  onSubscriptionYearsChange(): void {
    // Trigger recalculation
    console.log('Subscription years changed to:', this.subscriptionYears);
  }

  applyPromoCode(): void {
    const code = this.promoInputCode.toUpperCase().trim();
    this.promoCodeDisplay = code;
    
    // Reset promo
    this.promoDiscountMonthly = 0;
    this.promoValid = false;
    
    if (code === 'SAVE10') {
      this.promoValid = true;
      this.promoDiscountMonthly = Math.round(this.basePlanPrice * 0.1);
      this.promoMessage = 'Promo applied! 10% off on base plan';
    } 
    else if (code === 'WELCOME500') {
      this.promoValid = true;
      this.promoDiscountMonthly = 500;
      this.promoMessage = 'Promo applied! ₹500 off per month';
    }
    else if (code === 'SAVE20') {
      this.promoValid = true;
      this.promoDiscountMonthly = Math.round(this.monthlyTotal * 0.2);
      this.promoMessage = 'Promo applied! 20% off on total';
    }
    else {
      this.promoMessage = 'Invalid promo code';
      this.promoCodeDisplay = '';
    }
  }
}