import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService, Product } from '../../services/fast-food';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Product;
  @Input() index = 0;
  @Output() openModal = new EventEmitter<Product>();

  svc = inject(FastFoodService);
  toastSvc = inject(ToastService);

  imageLoaded = signal(false);
  adding = signal(false);

  categoryEmoji: Record<string, string> = {
    cafe: '☕', dona: '🍩', galletas: '🍪',
    hamburguesa: '🍔', pastel: '🎂', pizza: '🍕'
  };

  getEmoji(cat: string): string {
    return this.categoryEmoji[cat] ?? '🍽️';
  }

  isFav = computed(() => this.svc.isFavorite(this.product?.id));

  onImageLoad() { this.imageLoaded.set(true); }

  onAdd(e: Event) {
    e.stopPropagation();
    this.adding.set(true);
    this.svc.addToCart(this.product);
    this.toastSvc.show(`${this.product.name} agregado al carrito`, 'success', this.getEmoji(this.product.category));
    setTimeout(() => this.adding.set(false), 600);
  }

  onFavorite(e: Event) {
    e.stopPropagation();
    const wasFav = this.svc.isFavorite(this.product.id);
    this.svc.toggleFavorite(this.product.id);
    this.toastSvc.show(
      wasFav ? 'Eliminado de favoritos' : '¡Guardado en favoritos!',
      'info',
      wasFav ? '🤍' : '❤️'
    );
  }
}
