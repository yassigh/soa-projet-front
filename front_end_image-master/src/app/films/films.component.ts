import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  filmsPagines: Film[] = [];
  pageActuelle: number = 1;
  filmsParPage: number = 5;
  Math = Math; 
  constructor(
    private filmService: FilmService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {


    this.chargerFilms();
  }

  setFilmsPaginés(): void {
  const début = (this.pageActuelle - 1) * this.filmsParPage;
  const fin = début + this.filmsParPage;
     this.filmsPagines = this.films.slice(début, fin);
  }
  
  chargerFilms(): void {
    
  this.filmService.listeFilm().subscribe((filmList) => {
      this.films = filmList;
  this.films.forEach((film) => {
     if (film.images && film.images.length > 0 && film.images[0].image) {
          film.imageStr = 'data:' + film.images[0].type + ';base64,' + film.images[0].image;
        }
      });
      this.setFilmsPaginés();
    });
  }
  
  changerPage(nouvellePage: number): void {
    this.pageActuelle = nouvellePage;
    this.setFilmsPaginés();
  }

  supprimerFilm(f: Film) {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.filmService.supprimerFilm(f.idFilm).subscribe(() => {
        this.chargerFilms();
      });
    }
  }
}
