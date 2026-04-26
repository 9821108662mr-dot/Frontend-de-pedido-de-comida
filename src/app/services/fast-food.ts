import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class FastFoodService {
  private readonly API_URL = 'https://devsapihub.com/api-fast-food';

  // Cart state
  cartItems = signal<CartItem[]>([]);
  cartOpen = signal(false);
  searchTerm = signal('');

  cartCount = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.quantity, 0)
  );
  cartTotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  addToCart(product: Product, quantity = 1) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  updateQty(productId: number, delta: number) {
    this.cartItems.update(items =>
      items
        .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }

  toggleCart() {
    this.cartOpen.update(v => !v);
  }

  openCart() { this.cartOpen.set(true); }
  closeCart() { this.cartOpen.set(false); }
}
