import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  
  mobileMenuOpen = false;
  navLinksActive = false;
  
  // Pricing data
 pricingPlans = [
  {
    name: 'Basic Plan',
    users: '1 User',
    price: '₹1,000',
    popular: false
  },
  {
    name: 'Standard Plan',
    users: '3 Users',
    price: '₹1,500',
    popular: true
  },
  {
    name: 'Premium Plan',
    users: '5 Users',
    price: '₹3,000',
    popular: false
  }
];
 

  // Core features data
  coreFeatures = [
    {
      icon: 'fas fa-file-invoice-dollar',
      title: 'Distribution and Logistics Booking',
      description: 'Distribution and Logistics goods booking available.Suitable for small and large shipments.Simple and reliable service.'



    },
    {
      icon: 'fas fa-truck-loading',
      title: 'Handling by Weight',
      description: 'We handle goods by weight. Services available in KG, Quintal, and Tonnes.Safe and accurate handling.'
    },
    {
      icon: 'fas fa-users',
      title: 'Freight by Type & Weight',
      description: 'Freight is calculated accurately.Based on goods type, size, and weight.Transparent and fair pricing.'
    },
    {
      icon: 'fas fa-user-friends',
      title: 'Multiple Payment Options',
      description: 'Multiple payment options available.Pay via Cash, Bank, UPI, or Credit.Easy and convenient payments.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'GST optional per bilty',
      description: 'GST available per bilty.Optional as per requirement.Simple and flexible billing.'
    },
    {
      icon: 'fas fa-file-contract',
      title: 'Auto ledger posting',
      description: 'Automatic ledger posting enabled.Entries update instantly.Accurate and hassle-free records.'
    }
  ];

  // Steps data
  steps = [
    {
      number: '1',
      title: 'Setup Your Account',
      description: 'Add your company details, vehicles, drivers, and customers to the system.'
    },
    {
      number: '2',
      title: 'Manage Daily Operations',
      description: 'Schedule loads, assign drivers, track trips, and manage documents.'
    },
    {
      number: '3',
      title: 'Generate Invoices',
      description: 'Create professional invoices automatically based on completed trips.'
    },
    {
      number: '4',
      title: 'Analyze & Grow',
      description: 'Use reports to understand profitability and make better business decisions.'
    }
  ];

  // Exclusions data
  exclusions = [
    {
      icon: 'fas fa-satellite-dish',
      title: 'No Vehicle Tracking',
      description: 'We don\'t provide GPS tracking or real-time vehicle monitoring.'
    },
    {
      icon: 'fas fa-gas-pump',
      title: 'No Fuel Management',
      description: 'We don\'t track fuel consumption or provide fuel optimization.'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'No Route Optimization',
      description: 'We don\'t provide route planning or navigation features.'
    }
  ];

  // Stats data
  stats = [
    {
      value: '95%',
      label: 'Reduction in billing errors'
    },
    {
      value: '15 hrs',
      label: 'Saved per week'
    },
    {
      value: '30%',
      label: 'Faster payments'
    }
  ];

  // Footer links data
  productLinks = [
    { name: 'Features', link: '#features' },
    { name: 'How It Works', link: '#how-it-works' },
    { name: 'Pricing', link: '#pricing' },
    { name: 'Free Trial', link: '#demo' },
    { name: 'Demo', link: '#demo' }
  ];

  companyLinks = [
    { name: 'About Us', link: '#' },
    { name: 'Contact', link: '#' },
    { name: 'Blog', link: '#' },
    { name: 'Careers', link: '#' },
    { name: 'Support', link: '#' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Initialize any DOM manipulations after view is initialized
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.header && this.header.nativeElement) {
      const headerElement = this.header.nativeElement;
      if (window.scrollY > 100) {
        headerElement.style.padding = '5px 0';
        headerElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      } else {
        headerElement.style.padding = '0';
        headerElement.style.boxShadow = 'var(--shadow-sm)';
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMobileMenu();
    }
  }

  onCtaButtonClick(buttonType: string, event?: Event): void {
  // Click animation
  if (event && event.target) {
    const button = event.target as HTMLElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 200);
  }

  
}

onScheduleButtonClick(buttonType: string, event?: Event): void {
  if (event && event.target) {
    const button = event.target as HTMLElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 200);
  }

  // Open WhatsApp link
  window.open('https://wa.me/message/BGDPLKZ3VDV3N1', '_blank');
}


    
  

  onPlanButtonClick(planName: string, event?: Event): void {
    // Click animation
    if (event && event.target) {
      const button = event.target as HTMLElement;
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }
    
   
  }

  

 

  onHeroImageHover(isHovering: boolean): void {
    if (this.heroImage && this.heroImage.nativeElement) {
      const img = this.heroImage.nativeElement;
      if (isHovering) {
        img.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
      } else {
        img.style.transform = 'perspective(1000px) rotateY(-10deg) scale(1)';
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:keydown.escape')
  handleEscapeKey(): void {
    // In a real implementation, you would close any open modals here
    // For now, we'll just log it
    console.log('Escape key pressed - would close modals in real implementation');
  }
}