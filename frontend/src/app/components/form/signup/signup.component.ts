import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/password-match.directive';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  imports: [
    CardModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup(
    {
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
      nickname: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  get username() {
    return this.signupForm.controls['username'];
  }

  get password() {
    return this.signupForm.controls['password'];
  }

  get confirmPassword() {
    return this.signupForm.controls['confirmPassword'];
  }

  get nickname() {
    return this.signupForm.controls['nickname'];
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  onSignup() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Signup Success',
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Signup Failed',
            detail: 'Username already exists',
          });
        },
      });
    }
  }
}
