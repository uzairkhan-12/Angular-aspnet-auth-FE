import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirstkeyPipe } from '../../shared/pipes/firstkey.pipe';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstkeyPipe],
  templateUrl: './registeration.component.html',
  styles: [`
    .error-feedback { font-size: 0.875rem; }
  `],
})
export class RegisterationComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get fullName() { return this.form.get('fullName'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  // Helper method to get the first error for confirm password field
  // This handles both field-level and form-level errors
  getConfirmPasswordError(): string | null {
    // Check form-level passwordMismatch error first (higher priority)
    if (this.form.hasError('passwordMismatch') && this.confirmPassword?.touched) {
      return 'passwordMismatch';
    }
    
    // Check field-level errors
    if (this.confirmPassword?.errors) {
      const errorKeys = Object.keys(this.confirmPassword.errors);
      return errorKeys.length > 0 ? errorKeys[0] : null;
    }
    
    return null;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log("On submit is")
    if (this.form.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const payload = {
        fullName: this.fullName?.value,
        email: this.email?.value,
        password: this.password?.value,
      };

      this.authService.register(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = 'Registration successful! Redirecting to login...';
          this.form.reset();
          // Navigate to login page after successful registration
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Something went wrong';
        },
      });
    }
  }
}