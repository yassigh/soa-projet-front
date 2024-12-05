import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styleUrls: ['./update-film.component.css']
})
export class UpdateFilmComponent implements OnInit {
  currentFilm: any = {};
  genre!: Genre[];
  updatedGenId!: number;
  myImage!: string;

  uploadedImage!: File;
isImageUpdated: Boolean=false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {}
  ngOnInit(): void {
    this.filmService.listeGenre().
    subscribe((gen) => {this.genre = gen._embedded.genres;
    });
    this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id'])
    .subscribe( (film) =>{ this.currentFilm = film;
    this.updatedGenId = film.genre.idGenre;
    
    } ) ;
    }

    updateFilm() {
      this.currentFilm.genre = this.genre.find((gen) => gen.idGenre ==
     this.updatedGenId)!;
     this.filmService.UpdateFilm(this.currentFilm)
     .subscribe((film) => {
     this.router.navigate(['films']);
     });
 
     }


  onImageUpload(event: any) {
   
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    
    }
    
    onAddImageFilm() {
      this.filmService.uploadImageFilm(this.uploadedImage,this.uploadedImage.name,this.currentFilm.idFilm)
      .subscribe( (img : Image) => {
      this.currentFilm.images.push(img);
      });
      }  
      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.filmService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentFilm.images.indexOf(img, 0);
        if (index > -1) {
        this.currentFilm.images.splice(index, 1);
        }
        });
        }

}
