import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import { environment } from '../../../environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements AfterViewInit {
  private readonly CLIENT_ID = environment.googleClientId;;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    }
  }

  ngAfterViewInit() {
    this.authService.initializeGoogleSignIn(this.CLIENT_ID, (user) => {
      console.log('Login successful:', user);
      this.router.navigate(['/admin']);
    });

    this.authService.renderButton('googleSignInButton');
  }

  goBack() {
    this.router.navigate(['/']);
  }
}