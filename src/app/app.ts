import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Cart } from './components/cart/cart';
import { Toast } from './components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Navbar, Hero, Cart, Toast],
  template: `
    <app-navbar />
    <app-hero />
    <router-outlet />
    @defer (on idle) {
      <app-cart />
      <app-toast />
    }
  `
})
export class App {}
