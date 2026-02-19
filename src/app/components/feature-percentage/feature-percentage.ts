import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatureFlagService } from '../../services/feature-flag-service';

@Component({
  selector: 'app-feature-percentage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-percentage.html',
  styleUrls: ['./feature-percentage.css']
})
export class FeaturePercentage {
  percentage = 0;

  constructor(private featureFlagService: FeatureFlagService) { }

  ngOnInit() {
    this.featureFlagService.percentage$.subscribe(v => {
      if (v !== null) {
        this.percentage = v;
      }
    });
  }

  get intensity() {
    return this.percentage / 100;
  }
}