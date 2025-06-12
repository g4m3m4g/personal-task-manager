import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';
  isLoggedIn = signal(this.checkToken());

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
    return document.cookie.includes('token=');
  }

  loginSuccess() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
    return this.http.post(
      `${this.baseUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }
}
