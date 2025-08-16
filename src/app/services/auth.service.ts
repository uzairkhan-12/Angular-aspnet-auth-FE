// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5143/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is logged in on service initialization
    this.checkInitialAuthState();
  }

  private checkInitialAuthState(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedInSubject.next(!!token);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        // Assuming your API returns a token field
        // Adjust this based on your actual API response structure
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
        } else if (response && response.accessToken) {
          // Alternative token field name
          localStorage.setItem('authToken', response.accessToken);
          this.isLoggedInSubject.next(true);
        } else if (response) {
          // If your API doesn't return a token but login is successful
          // You might want to store some other identifier or just set a flag
          localStorage.setItem('authToken', 'logged-in');
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Optional: Method to get current auth state synchronously
  getCurrentAuthState(): boolean {
    return this.isLoggedInSubject.value;
  }
}