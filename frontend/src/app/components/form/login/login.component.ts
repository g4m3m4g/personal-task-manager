import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  siteKey = environment.turnstileSiteKey;
  ngOnInit() {
    // Register the callback globally
    //(window as any).onTurnstileSuccess = this.onTurnstileSuccess.bind(this);
  }

  /*
  isCaptchaVerified = false;
  onTurnstileSuccess(token: string) {
    this.isCaptchaVerified = !!token;
    // Optionally, send `token` to  backend for verification
  }
    */

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const password: string = this.loginForm.value.password ?? '';
      const username: string = this.loginForm.value.username ?? '';

      this.authService.login({ username, password }).subscribe({
        next: (res: any) => {
          this.authService.loginSuccess();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid username or password',
          });
        },
      });
    }
  }
}
