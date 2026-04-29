import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService, Anime } from '../../services/anime.service';

@Component({
  selector: 'app-anime-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: Anime[] = [];
  loading = true;
  error: string | null = null;
  
  private animeService = inject(AnimeService);

  ngOnInit(): void {
    this.animeService.getTopAnime().subscribe({
      next: (response) => {
        this.animes = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching anime:', err);
        this.error = 'No se pudieron cargar los animes. Intenta más tarde.';
        this.loading = false;
      }
    });
  }
}
