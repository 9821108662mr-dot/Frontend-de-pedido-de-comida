import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/menu/menu').then(m => m.MenuPage), data: { animation: 'MenuPage' } },
  { path: 'historial', loadComponent: () => import('./pages/historial/historial').then(m => m.HistorialPage), data: { animation: 'HistorialPage' } },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutPage), data: { animation: 'CheckoutPage' } },
  { path: '**', redirectTo: '' }
];
