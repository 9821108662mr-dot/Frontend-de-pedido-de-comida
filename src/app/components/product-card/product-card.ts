import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService, Product } from '../../services/fast-food';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Product;
  @Output() openModal = new EventEmitter<Product>();

  svc = inject(FastFoodService);

  categoryEmoji: Record<string, string> = {
    cafe: '☕', dona: '🍩', galletas: '🍪',
    hamburguesa: '🍔', pastel: '🎂', pizza: '🍕'
  };

  getEmoji(cat: string): string {
    return this.categoryEmoji[cat] ?? '🍽️';
  }

  onAdd(e: Event) {
    e.stopPropagation();
    this.svc.addToCart(this.product);
    this.svc.openCart();
  }
}
