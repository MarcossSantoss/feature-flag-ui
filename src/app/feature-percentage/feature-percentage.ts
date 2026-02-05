import { FeatureFlagService } from './../services/feature-flag-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-percentage',
  imports: [],
  templateUrl: './feature-percentage.html',
  styleUrl: './feature-percentage.css',
})
export class FeaturePercentage {

  percentage!: number;

  constructor(private featureFlagService: FeatureFlagService) { }

  ngOnInit(): void {
    this.featureFlagService.getPercentage().subscribe(value => {
      this.percentage = value;
    });
  }
}
