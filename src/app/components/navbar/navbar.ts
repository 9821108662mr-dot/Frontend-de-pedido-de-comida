import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFoodService } from '../../services/fast-food';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  svc = inject(FastFoodService);

  onSearch(value: string) {
    this.svc.searchTerm.set(value);
  }
}
