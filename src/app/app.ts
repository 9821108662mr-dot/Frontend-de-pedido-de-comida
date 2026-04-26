import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Menu } from './components/menu/menu';
import { Cart } from './components/cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, Menu, Cart],
  template: `
    <app-navbar />
    <app-hero />
    <app-menu />
    <app-cart />
  `
})
export class App {}
