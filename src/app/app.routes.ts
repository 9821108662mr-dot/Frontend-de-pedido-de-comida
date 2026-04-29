import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/menu/menu').then(m => m.MenuPage), data: { animation: 'MenuPage' } },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginPage), data: { animation: 'LoginPage' } },
  { path: 'historial', canActivate: [authGuard], loadComponent: () => import('./pages/historial/historial').then(m => m.HistorialPage), data: { animation: 'HistorialPage' } },
  { path: 'checkout', canActivate: [authGuard], loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutPage), data: { animation: 'CheckoutPage' } },
  { path: 'anime', loadComponent: () => import('./components/anime-list/anime-list.component').then(m => m.AnimeListComponent), data: { animation: 'AnimePage' } },
  { path: '**', redirectTo: '' }
];
