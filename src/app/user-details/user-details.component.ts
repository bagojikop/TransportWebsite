import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userForm: FormGroup;
  userMessage: string = '';
  formMessage: string = 'Fill all fields to continue';
  isLoading: boolean = false;

  // Emit events to parent (KEPT AS-IS)
  @Output() back = new EventEmitter<void>();
  @Output() userSubmitted = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      terms: [false, [Validators.requiredTrue]]
    });

    // Update form message on changes
    this.userForm.valueChanges.subscribe(() => {
      this.updateFormMessage();
    });
  }

  // TS-safe getter (UNCHANGED)
  get u(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  updateFormMessage(): void {
    if (this.userForm.valid) {
      this.formMessage = 'Ready to create account!';
    } else if (this.userForm.touched) {
      this.formMessage = 'Fix errors in form';
    } else {
      this.formMessage = 'Fill all fields';
    }
  }

  submitUserForm(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      console.log('User Details:', this.userForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        
        // 🔹 EXISTING OUTPUT (KEPT)
        this.userSubmitted.emit(this.userForm.value);

        // 🔥 NEW FEATURE (ADDED)
        // Navigate to Company Details page
        this.router.navigate(['/company-details']);

        this.userForm.reset();
        this.formMessage = 'Account created successfully!';
        
        setTimeout(() => {
          this.formMessage = 'Fill all fields to continue';
        }, 3000);
      }, 1000);
    }
  }

  backToTenant(): void {
    // EXISTING BACK EVENT (KEPT)
    this.back.emit();
    this.userForm.reset();
    this.formMessage = 'Fill all fields to continue';
  }
}