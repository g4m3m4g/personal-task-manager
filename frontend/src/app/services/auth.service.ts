import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  // Signal to track login state reactively
  private tokenSignal = signal(false);

  // Reactive login status
  isLoggedIn = computed(() => this.tokenSignal());

  constructor(private http: HttpClient) {
    this.refreshTokenState();
  }

  // Signup method
  signup(data: any) {
    return this.http.post(`${this.baseUrl}/auth/signup`, data, {
      withCredentials: true,
    });
  }

  // Login with credentials, and set signal if successful
  login(data: { username: string; password: string }) {
    return this.http
      .post(`${this.baseUrl}/auth/login`, data, {
        withCredentials: true,
      })
      .pipe(tap(() => this.loginSuccess()));
  }

  // Logout and reset auth signal
  logout() {
    this.tokenSignal.set(false);

    return this.http
      .post(
        `${this.baseUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe();
  }

  // Manually mark login success (used after successful login)
  loginSuccess() {
    this.tokenSignal.set(true);
  }

  // Check for the presence of the token cookie
  private checkToken(): boolean {
    return /(^|;\s*)token=/.test(document.cookie); // safer regex
  }

  // Refresh signal (e.g. on page reload)
  refreshTokenState() {
    this.http
      .get(`${this.baseUrl}/auth/me`, { withCredentials: true })
      .subscribe({
        next: (res) => this.tokenSignal.set(true),
        error: () => this.tokenSignal.set(false),
      })
  }
}
