import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.css']
})
export class MoviePosterComponent implements OnInit {

  @Input() movies:Movie

  constructor( 
    private peliculasService:PeliculasService,
    private router:Router
    ) { 

    this.peliculasService.getCartelera()
    .subscribe( res => {
      console.log(res);
      // this.movies = res.results
    })

  }

  ngOnInit(): void {
  }

  onMovieClick( movie: Movie){
    console.log(movie);
    this.router.navigate(['/pelicula', movie.id])
  }

}
