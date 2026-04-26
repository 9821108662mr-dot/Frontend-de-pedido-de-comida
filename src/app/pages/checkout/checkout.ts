import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FastFoodService } from '../../services/fast-food';
import { ToastService } from '../../services/toast.service';
import { CurrencyMxnPipe } from '../../pipes/currency-mxn.pipe';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CurrencyMxnPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutPage {
  svc = inject(FastFoodService);
  toastSvc = inject(ToastService);
  router = inject(Router);
  fb = inject(FormBuilder);

  orderDone = signal(false);
  orderId = signal('');

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    payment: ['cash', [Validators.required]]
  });

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.toastSvc.show('Por favor completa todos los campos correctamente', 'error', '⚠️');
      return;
    }

    if (this.svc.cartItems().length === 0) {
      this.toastSvc.show('Tu carrito está vacío', 'error', '🛒');
      this.router.navigate(['/']);
      return;
    }

    const id = this.svc.saveOrder(this.svc.cartItems(), this.svc.cartTotal());
    this.orderId.set(id);
    this.svc.clearCart();
    this.orderDone.set(true);
    this.toastSvc.show('¡Pedido completado!', 'success', '🎉');
  }
}
