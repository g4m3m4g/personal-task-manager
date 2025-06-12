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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [
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

  constructor(private authService: AuthService, private router: Router) {}
  onSignup() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    }
  }
}
