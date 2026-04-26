import { Component, Input, Output, EventEmitter, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService, Product } from '../../services/fast-food';
import { CurrencyMxnPipe } from '../../pipes/currency-mxn.pipe';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, CurrencyMxnPipe],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductModal {
  @Input() product!: Product;
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  svc = inject(FastFoodService);
  qty = signal(1);

  decrement() { if (this.qty() > 1) this.qty.update(v => v - 1); }
  increment() { this.qty.update(v => v + 1); }

  addToCart() {
    this.svc.addToCart(this.product, this.qty());
    this.svc.openCart();
    this.qty.set(1);
    this.close.emit();
  }

  onOverlayClick(e: Event) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
}
