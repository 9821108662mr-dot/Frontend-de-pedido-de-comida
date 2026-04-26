import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService } from '../../services/fast-food';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  svc = inject(FastFoodService);
  toastSvc = inject(ToastService);
  orderDone = signal(false);
  orderId = signal('');
  showHistory = signal(false);

  checkout() {
    const id = this.svc.saveOrder(this.svc.cartItems(), this.svc.cartTotal());
    this.orderId.set(id);
    this.svc.clearCart();
    this.svc.closeCart();
    this.orderDone.set(true);
  }

  closeOrder() { this.orderDone.set(false); }
  toggleHistory() { this.showHistory.update(v => !v); }
}
