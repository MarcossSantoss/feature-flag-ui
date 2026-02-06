import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatureFlagService } from '../services/feature-flag-service';

@Component({
  selector: 'app-admin-percentage',
  imports: [FormsModule],
  templateUrl: './admin-percentage.html',
  styleUrl: './admin-percentage.css',
})
export class AdminPercentage {

  percentage = 0;

  constructor(private service: FeatureFlagService) { }

  ngOnInit() {
    this.service.getPercentage().subscribe(value => {
      this.percentage = value;
    });
  }

  save() {
    this.service.setPercentage(this.percentage)
      .subscribe({
        next: () => console.log('Salvo com sucesso'),
        error: err => console.error(err)
      });
  }
}
