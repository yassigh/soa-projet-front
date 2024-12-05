import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
import { FilmService } from '../services/film.service';
import { Film } from './../model/film.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  newFilm = new Film();
  genre!: Genre[];
  newIdgen!: number;
  newGenre!: Genre;
  uploadedImage!: File;
  imagePath: any;

  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit(): void {
    this.filmService.listeGenre().subscribe((genr) => {
      console.log(genr);
      this.genre = genr._embedded.genres;
    });
  }


  addFilm() {
    this.newFilm.genre = this.genre.find(gen => gen.idGenre == this.newIdgen)!;
    this.filmService.ajouterFilm(this.newFilm).subscribe((savedFilm: Film) => {
        if (this.uploadedImage) {
          this.filmService.uploadImageFilm(this.uploadedImage, this.uploadedImage.name, savedFilm.idFilm).subscribe(
            () => {
                console.log('Film et image ajoutes avec succes');
                this.router.navigate(['films']);
            },
            (error) => {
                console.error('Erreur lors de lupload de limage :', error);
            }
        );
    } else {
        console.log('Film ajoute sans image');
        this.router.navigate(['films']);
    }
},
(error) => {
    console.error('Erreur lors de lajout du film :', error);
}
);
}


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => {
      this.imagePath = reader.result;   };
  }
}
