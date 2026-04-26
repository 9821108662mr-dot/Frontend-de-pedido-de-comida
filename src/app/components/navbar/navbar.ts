import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FastFoodService } from '../../services/fast-food';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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
