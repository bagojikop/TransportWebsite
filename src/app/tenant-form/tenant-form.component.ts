import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent {
  tenantForm: FormGroup;
  tenantMessage: string = '';
  formMessage: string = 'Fill all fields to continue';
  isLoading: boolean = false;
  demoKey: string = 'VALID-KEY-1234';

  constructor(private fb: FormBuilder, private router: Router) {
    this.tenantForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      subDomain: ['', [Validators.required, Validators.pattern('^[a-z0-9-]+$')]],
      licenseKey: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]{10,}$')]]
    });

    this.tenantForm.valueChanges.subscribe(() => {
      this.updateFormMessage();
    });
  }

  get t(): { [key: string]: AbstractControl } {
    return this.tenantForm.controls;
  }

  updateFormMessage(): void {
    if (this.tenantForm.valid) {
      this.formMessage = 'Ready to verify!';
    } else if (this.tenantForm.touched) {
      this.formMessage = 'Fix errors in form';
    } else {
      this.formMessage = 'Fill all fields';
    }
  }

  copyDemoKey(): void {
    navigator.clipboard.writeText(this.demoKey).then(() => {
      this.tenantMessage = 'Demo key copied!';
      setTimeout(() => this.tenantMessage = '', 2000);
    });
  }

  useDemoKey(): void {
    this.t['licenseKey'].setValue(this.demoKey);
    this.t['licenseKey'].markAsTouched();
    this.tenantForm.updateValueAndValidity();
    this.tenantMessage = 'Demo key inserted. Click Verify.';
  }

  pasteKey(): void {
    navigator.clipboard.readText().then(text => {
      if (text) {
        this.t['licenseKey'].setValue(text);
        this.t['licenseKey'].markAsTouched();
        this.tenantForm.updateValueAndValidity();
      }
    }).catch(() => {
      this.tenantMessage = 'Cannot access clipboard';
    });
  }

  verifyTenant(): void {
    if (this.tenantForm.valid) {
      this.isLoading = true;
      const licenseKey = this.t['licenseKey'].value;

      setTimeout(() => {
        this.isLoading = false;
        
        if (licenseKey === this.demoKey || licenseKey.startsWith('VALID-')) {
          this.tenantMessage = 'Verified! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/user-details']);
          }, 800);
        } else {
          this.tenantMessage = 'Invalid key. Use demo key.';
        }
      }, 800);
    }
  }

  resetForm(): void {
    this.tenantForm.reset();
    this.tenantMessage = '';
    this.formMessage = 'Fill all fields';
  }
}