import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeaturePercentage } from "./feature-percentage/feature-percentage";
import { AdminPercentage } from "./admin-percentage/admin-percentage";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FeaturePercentage, AdminPercentage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('feature-flag-ui');
}
