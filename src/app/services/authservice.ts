import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<GoogleUser | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        this.userSubject.next(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }

  initializeGoogleSignIn(clientId: string, callback: (user: GoogleUser) => void) {
    if (typeof google === 'undefined') {
      console.error('Google Identity Services not loaded');
      return;
    }

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => {
        const user = this.decodeJWT(response.credential);
        this.setUser(user, response.credential);
        callback(user);
      }
    });
  }

  renderButton(elementId: string) {
    if (typeof google === 'undefined') {
      console.error('Google Identity Services not loaded');
      return;
    }

    google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: 'filled_black',
        size: 'large',
        text: 'signin_with'
      }
    );
  }

  private decodeJWT(token: string): GoogleUser {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }

  private setUser(user: GoogleUser, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    this.userSubject.next(user);
  }

  signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.userSubject.next(null);

    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }

    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): GoogleUser | null {
    return this.userSubject.value;
  }
}