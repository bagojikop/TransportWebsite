import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent {

  companyForm: FormGroup;

  // Template-used variables
  isLoading: boolean = false;
  formMessage: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  states: string[] = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
    'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
    'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
    'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
    'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Delhi','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
    'Andaman & Nicobar Islands','Dadra & Nagar Haveli and Daman & Diu',
    'Lakshadweep'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      firmName: ['', Validators.required],
      shortName: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      place: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      phoneNumber: [''],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      jurisdiction: ['', Validators.required],
      transporterId: ['', Validators.required],
      panNumber: ['', [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
      ]]
    });

    // Auto uppercase PAN
    this.companyForm.get('panNumber')?.valueChanges.subscribe(value => {
      if (value) {
        this.companyForm.get('panNumber')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  submitCompany() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.formMessage = 'Please fix the highlighted errors';
      return;
    }

    this.isLoading = true;
    this.formMessage = '';
    this.successMessage = '';
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      console.log(this.companyForm.value);
      this.isLoading = false;
      this.successMessage = 'Company Details Saved Successfully';
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/user-details']);
  }
}
