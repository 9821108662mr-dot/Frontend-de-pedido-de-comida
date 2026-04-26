import { Component, inject } from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Cart } from './components/cart/cart';
import { Toast } from './components/toast/toast';
import { routeTransitionAnimations } from './animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Navbar, Hero, Cart, Toast],
  animations: [routeTransitionAnimations],
  template: `
    <app-navbar />
    <app-hero />
    <div [@routeAnimations]="getRouteAnimationData()" style="position: relative;">
      <router-outlet />
    </div>
    @defer (on idle) {
      <app-cart />
      <app-toast />
    }
  `
})
export class App {
  contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
