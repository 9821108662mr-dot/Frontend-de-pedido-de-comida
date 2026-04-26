import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService } from '../../services/fast-food';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  svc = inject(FastFoodService);

  scrollToMenu() {
    document.getElementById('menuSection')?.scrollIntoView({ behavior: 'smooth' });
  }
}
