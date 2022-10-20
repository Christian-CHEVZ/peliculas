import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from "@angular/common";
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula:MovieResponse
  public cast: Cast[] =[]

  constructor( 
    private activatedRoute:ActivatedRoute,
    private peliculasService:PeliculasService,
    private location:Location,
    private router:Router
    ) { }

  ngOnInit(): void {

    const {id} = this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliculasService.getMovieDetail( id ),
      this.peliculasService.getCast(id)

    ]).subscribe( ([ pelicula, cast ]) => {
      if(!pelicula){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;
      this.cast = cast.filter( actor => actor.profile_path !== null )
    })

    // this.peliculasService.getMovieDetail( id ).subscribe( movie => {
    //   if(!movie){
    //     this.router.navigateByUrl
    //     return
    //   }
    //   this.pelicula = movie;
    // });
    // this.peliculasService.getCast(id).subscribe( cast => {
    //   console.log(cast);
    //   this.cast = cast.filter( actor => actor.profile_path !== null )

    // })

  }

  return(){
    this.location.back();
  }

}