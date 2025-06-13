import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';
  private tokenSignal = signal(this.checkToken());
  isLoggedIn = computed(() => this.tokenSignal());

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }

  private checkToken(): boolean {
    return document.cookie.includes('token');
  }

  loginSuccess() {
    this.tokenSignal.set(true); // update after successful login
  }

  logout() {
    this.tokenSignal.set(false); // update after logout
    return this.http.post(
      `${this.baseUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  refreshTokenState() {
    this.tokenSignal.set(this.checkToken()); // call this on app start or reload
  }
}
