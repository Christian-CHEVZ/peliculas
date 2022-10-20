import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] =[];
  public moviesSlideShow: Movie[] =[];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop)+900;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight)
    
    if(pos>max){
// llamar al servicio
      if (this.peliculasService.loading){return;}

      this.peliculasService.getCartelera().subscribe(res =>{
        this.movies.push(...res.results);
      })
    }

  }

  constructor( private peliculasService:PeliculasService ) { 

    this.peliculasService.getCartelera()
    .subscribe( res => {
      this.movies = res.results;
      this.moviesSlideShow = res.results;
    })

  }



  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

}
