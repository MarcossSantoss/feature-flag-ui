import { LoginComponent } from './components/login/login';
import { Routes } from '@angular/router';
import { FeaturePercentage } from './components/feature-percentage/feature-percentage';
import { AdminPercentage } from './components/admin-percentage/admin-percentage';
import { authGuard } from './guards/authguard';

export const routes: Routes = [
  { path: '', component: FeaturePercentage },
  { path: 'login', component: LoginComponent }, 
  { path: 'admin', component: AdminPercentage, canActivate: [authGuard] }
];