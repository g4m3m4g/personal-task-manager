import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }
  login(data: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }
}
