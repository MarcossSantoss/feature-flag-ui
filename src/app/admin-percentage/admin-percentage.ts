import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-percentage',
  imports: [FormsModule],
  templateUrl: './admin-percentage.html',
  styleUrl: './admin-percentage.css',
})
export class AdminPercentage {

  percentage = 0;

save() {
    console.log('Salvar porcentagem:', this.percentage);
}
}
