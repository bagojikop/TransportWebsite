import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.scss']
})
export class TransportersComponent implements OnInit {
  transporterData = {
    firmName: '',
    shortName: '',
    address: '',
    jurisdiction: '',
    transporterId: '',
    panNumber: '',
    stateCode: '',
    place: '',
    pincode: '',
    officePhone: '',
    mobile: '',
    email: '',
    logo: '',
    // GST Details
    gstStartDate: '',
    gstType: '',
    gstNumber: '',
    // Bank Information
    bankName: '',
    bankAccountNo: '',
    ifscCode: ''
  };

  states: any[] = [];
  selectedStateName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    this.http.get<any[]>('/assets/states.json').subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (error) => {
        console.error('Error loading states:', error);
      }
    });
  }

  onStateChange(event: any): void {
    const selectedCode = event.target.value;
    const selectedState = this.states.find(s => s.stateCode == selectedCode);
    this.selectedStateName = selectedState ? selectedState.stateName : '';
  }

  onLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.transporterData.logo = e.target.result; // Base64 string save hota hai
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo(): void {
    this.transporterData.logo = '';
    // Reset file input
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  saveTransporter(): void {
    // Sirf required fields check karo
    if (this.transporterData.firmName && 
        this.transporterData.address && 
        this.transporterData.jurisdiction && 
        this.transporterData.transporterId && 
        this.transporterData.stateCode && 
        this.transporterData.place && 
        this.transporterData.pincode) {
      
      // Create payload with stateCode and stateName
      const payload = {
        ...this.transporterData,
        stateName: this.selectedStateName
      };
      
      console.log('Saving transporter:', payload);
      alert(`Transporter "${this.transporterData.firmName}" saved successfully!`);
      this.resetForm();
    }
  }

  cancel(): void {
    this.resetForm();
    console.log('Form cancelled');
  }

  private resetForm(): void {
    this.transporterData = {
      firmName: '',
      shortName: '',
      address: '',
      jurisdiction: '',
      transporterId: '',
      panNumber: '',
      stateCode: '',
      place: '',
      pincode: '',
      officePhone: '',
      mobile: '',
      email: '',
      logo: '',
      gstStartDate: '',
      gstType: '',
      gstNumber: '',
      bankName: '',
      bankAccountNo: '',
      ifscCode: ''
    };
    this.selectedStateName = '';
    
    // Reset file input
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}