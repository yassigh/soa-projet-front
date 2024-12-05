import { GenreWrapper } from './../model/genreWrapped.model';
import { AuthService } from './auth.service';
import { Genre } from '../model/genre.model';
import { Film } from './../model/film.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  apiURL: string = 'http://localhost:8081/films/api';
  apiURLGenre: string = 'http://localhost:8081/films/genre';

  Genre!: Genre[];

  constructor(private http: HttpClient, private authService: AuthService) {}
 
  consulterGenre(id: number): Genre {
    return this.Genre.find((gen) => gen.idGenre == id)!;
  }
  listeFilm(): Observable<Film[]> {
    
    return this.http.get<Film[]>(this.apiURL + '/all');
  }
  ajouterGenre(gen: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGenre, gen, httpOptions);
  }
  ajouterFilm(film: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Film>(this.apiURL + '/addfilm', film);
  }
  
  supprimerFilm(idFilm: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/delfilm/${idFilm}`);
  }
  
  consulterFilm(id: number): Observable<Film> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Film>(url);
  }
  UpdateFilm(film: Film): Observable<Film> {

    return this.http.put<Film>(this.apiURL + '/updatefilm', film);
  }

 
  listeGenre(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<GenreWrapper>(this.apiURLGenre);
  }
 
  rechercherParGenre(idGenre: number): Observable<Film[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.apiURL}/filmsgenre/${idGenre}`;
    return this.http.get<Film[]>(url);
  }
  rechercherParFilm(nom: string): Observable<Film[]> {
    const url = `${this.apiURL}/filmsByName/${nom}`;
    return this.http.get<Film[]>(url);
  }
 
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.put<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  uploadImageFilm(file: File, filename: string, idFilm: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `http://localhost:8081/films/api/image/uploadImageFilm/${idFilm}`;
    return this.http.post(url, imageFormData);
  }

  updateImageFilm(file: File, filename: string, idFilm: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL}/image/updateImageFilm/${idFilm}`;
    return this.http.put(url, imageFormData);
  }
  
  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

}
