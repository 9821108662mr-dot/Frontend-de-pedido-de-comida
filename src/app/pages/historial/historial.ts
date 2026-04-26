import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FastFoodService } from '../../services/fast-food';
import { CurrencyMxnPipe } from '../../pipes/currency-mxn.pipe';

@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyMxnPipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class HistorialPage {
  svc = inject(FastFoodService);
}
