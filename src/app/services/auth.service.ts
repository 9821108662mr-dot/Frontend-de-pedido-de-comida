import { Injectable, signal, effect } from '@angular/core';

export interface User {
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const savedUser = localStorage.getItem('fastbite-user');
      if (savedUser) {
        try {
          this.currentUser.set(JSON.parse(savedUser));
        } catch {
          this.currentUser.set(null);
        }
      }
    }

    effect(() => {
      const user = this.currentUser();
      if (typeof localStorage !== 'undefined') {
        if (user) {
          localStorage.setItem('fastbite-user', JSON.stringify(user));
        } else {
          localStorage.removeItem('fastbite-user');
        }
      }
    });
  }

  login(email: string) {
    const name = email.split('@')[0];
    this.currentUser.set({ email, name });
  }

  logout() {
    this.currentUser.set(null);
  }
}
