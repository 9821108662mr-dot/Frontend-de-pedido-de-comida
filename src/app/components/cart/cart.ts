import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService } from '../../services/fast-food';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  svc = inject(FastFoodService);
  orderDone = signal(false);
  orderId = signal('');

  checkout() {
    this.orderId.set(Math.floor(Math.random() * 90000 + 10000).toString());
    this.svc.clearCart();
    this.svc.closeCart();
    this.orderDone.set(true);
  }

  closeOrder() { this.orderDone.set(false); }
}
