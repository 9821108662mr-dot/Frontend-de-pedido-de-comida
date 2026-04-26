import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem('fastbite-theme');
    if (saved === 'light') {
      this.isDark.set(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  toggle() {
    this.isDark.update(v => !v);
    const theme = this.isDark() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fastbite-theme', theme);
  }
}
