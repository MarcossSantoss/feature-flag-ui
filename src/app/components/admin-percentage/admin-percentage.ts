import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FeatureFlagService } from '../../services/feature-flag-service';
import { AuthService } from '../../services/authservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-percentage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-percentage.html',
  styleUrls: ['./admin-percentage.css']
})
export class AdminPercentage {
  percentage = 0;
  draft = 0;

  constructor(
    private featureFlagService: FeatureFlagService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.featureFlagService.percentage$.subscribe(v => {
      if (v !== null) {
        this.percentage = v;
        this.draft = v;
        this.cdr.detectChanges();
      }
    });
  }

  get intensity() {
    return this.draft / 100;
  }

  get hasChanges() {
    return this.draft !== this.percentage;
  }

  save() {
    if (!this.hasChanges) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'No changes detected',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#e5e5f0',
        customClass: {
          popup: 'swal-toast-popup'
        }
      });
      return;
    }

    this.featureFlagService.setPercentage(this.draft).subscribe({
      next: () => {
        this.percentage = this.draft;
        this.cdr.detectChanges();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Configuration saved',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#1f2937',
          color: '#e5e5f0',
          customClass: {
            popup: 'swal-toast-popup'
          }
        });
      },
      error: (err) => {
        console.error('Error saving percentage:', err);

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Failed to save',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#1f2937',
          color: '#e5e5f0',
          customClass: {
            popup: 'swal-toast-popup'
          }
        });
      }
    });
  }

  async logout() {
    const result = await Swal.fire({
      title: 'Logout',
      text: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#e5e5f0',
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      customClass: {
        popup: 'swal-modal-popup'
      }
    });

    if (result.isConfirmed) {
      await this.authService.signOut();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Logged out successfully',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#e5e5f0',
        customClass: {
          popup: 'swal-toast-popup'
        }
      });

      this.router.navigate(['/']);
    }
  }
}