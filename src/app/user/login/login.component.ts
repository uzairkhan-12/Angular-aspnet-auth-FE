import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirstkeyPipe } from '../../shared/pipes/firstkey.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstkeyPipe],
  templateUrl: './login.component.html',
  styles: [`
    .error-feedback { font-size: 0.875rem; }
  `],
})
export class LoginComponent implements OnInit {
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
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSwitchToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const payload = {
        email: this.email?.value,
        password: this.password?.value,
      };

      this.authService.login(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = 'Login successful!';
          // Navigate to home page after successful login
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Invalid credentials';
        },
      });
    }
  }
}