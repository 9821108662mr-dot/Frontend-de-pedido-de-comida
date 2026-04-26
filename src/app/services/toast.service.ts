import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  emoji: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success', emoji = '✅') {
    const id = ++this.counter;
    this.toasts.update(t => [...t, { id, message, type, emoji }]);
    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
