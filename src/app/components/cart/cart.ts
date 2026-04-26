import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FastFoodService } from '../../services/fast-food';
import { CurrencyMxnPipe } from '../../pipes/currency-mxn.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyMxnPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
  svc = inject(FastFoodService);
}
