import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  public loading: boolean = false;
  private carteleraPage = 1;

  constructor( private http:HttpClient ) { }

  get params(){
    return{
      api_key: '4370a04148284755dc56253a974c7fc7',
      language: 'en-US',
      page: this.carteleraPage
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<CarteleraResponse>{

    console.log('llamando API');

    this.loading = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params:this.params
    }).pipe(
      tap(() => {
        this.carteleraPage += 1;
        this.loading = false;
      })
    )
  }

  buscarPeliculas( texto:string ):Observable<Movie[]>{

    const params = {...this.params, page:'1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map( res => res.results)
    )
  }

  getMovieDetail( id:string ){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
    
  }

  getCast( id:string ):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( res => res.cast ),
      catchError( err => of([]) )
    )
    
  }

}
