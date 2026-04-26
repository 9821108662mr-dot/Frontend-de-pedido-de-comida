import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService, Product } from '../../services/fast-food';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductModal } from '../../components/product-modal/product-modal';

interface Category { key: string; label: string; emoji: string; }
type SortOrder = 'default' | 'asc' | 'desc';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, ProductCard, ProductModal],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuPage implements OnInit {
  svc = inject(FastFoodService);

  loading = signal(true);
  error = signal(false);
  allProducts = signal<Product[]>([]);
  activeCategory = signal('all');
  selectedProduct = signal<Product | null>(null);
  modalOpen = signal(false);
  sortOrder = signal<SortOrder>('default');
  showFavoritesOnly = signal(false);

  categories: Category[] = [
    { key: 'all',         label: 'Todos',       emoji: '🍽️' },
    { key: 'hamburguesa', label: 'Hamburguesas', emoji: '🍔' },
    { key: 'pizza',       label: 'Pizzas',       emoji: '🍕' },
    { key: 'cafe',        label: 'Cafés',        emoji: '☕' },
    { key: 'dona',        label: 'Donas',        emoji: '🍩' },
    { key: 'galletas',    label: 'Galletas',     emoji: '🍪' },
    { key: 'pastel',      label: 'Pasteles',     emoji: '🎂' },
  ];

  filteredProducts = computed(() => {
    let list = this.allProducts();
    const cat = this.activeCategory();
    const term = this.svc.searchTerm().toLowerCase().trim();
    const favOnly = this.showFavoritesOnly();
    const sort = this.sortOrder();

    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (term) list = list.filter(p => p.name.toLowerCase().includes(term));
    if (favOnly) list = list.filter(p => this.svc.isFavorite(p.id));
    if (sort === 'asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  });

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.loading.set(true);
    this.error.set(false);
    this.svc.getProducts().subscribe({
      next: data => { this.allProducts.set(data); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); }
    });
  }

  setCategory(key: string) { this.activeCategory.set(key); }
  setSort(order: SortOrder) { this.sortOrder.set(order); }
  toggleFavorites() { this.showFavoritesOnly.update(v => !v); }

  openModal(product: Product) {
    this.selectedProduct.set(product);
    this.modalOpen.set(true);
  }
  closeModal() { this.modalOpen.set(false); }

  skeletons = Array(8).fill(0);
}
