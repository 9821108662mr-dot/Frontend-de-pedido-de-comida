import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para estructurar la respuesta de la API de Jikan
export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  synopsis: string;
}

export interface JikanResponse {
  data: Anime[];
}

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'https://api.jikan.moe/v4';
  
  // Injectamos el HttpClient que Angular ya tiene configurado
  private http = inject(HttpClient);

  // Método para obtener los mejores animes
  getTopAnime(): Observable<JikanResponse> {
    return this.http.get<JikanResponse>(`${this.apiUrl}/top/anime`);
  }
}
