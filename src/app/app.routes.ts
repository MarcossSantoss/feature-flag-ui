import { Routes } from '@angular/router';
import { FeaturePercentage } from './feature-percentage/feature-percentage';
import { AdminPercentage } from './admin-percentage/admin-percentage';

export const routes: Routes = [
  { path: '', component: FeaturePercentage },
  { path: 'admin', component: AdminPercentage }
];