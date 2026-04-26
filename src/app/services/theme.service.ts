import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('fastbite-theme');
      if (saved) {
        this.isDark.set(saved === 'dark');
      }
    }

    effect(() => {
      const theme = this.isDark() ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fastbite-theme', theme);
      }
    });
  }

  toggle() {
    this.isDark.update(v => !v);
    const theme = this.isDark() ? 'dark' : 'light';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
