import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService } from '../../services/fast-food';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  svc = inject(FastFoodService);
  themeSvc = inject(ThemeService);
  cartPulse = signal(false);

  onSearch(value: string) {
    this.svc.searchTerm.set(value);
  }

  onCartClick() {
    this.svc.toggleCart();
  }
}
