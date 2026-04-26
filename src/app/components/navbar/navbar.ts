import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FastFoodService } from '../../services/fast-food';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  svc = inject(FastFoodService);
  themeSvc = inject(ThemeService);
  authSvc = inject(AuthService);
  translate = inject(TranslateService);
  cartPulse = signal(false);

  toggleLang() {
    const current = this.translate.currentLang || this.translate.defaultLang;
    this.translate.use(current === 'es' ? 'en' : 'es');
  }

  onSearch(value: string) {
    this.svc.searchTerm.set(value);
  }

  onCartClick() {
    this.svc.toggleCart();
  }
}
