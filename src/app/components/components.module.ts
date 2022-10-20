import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import { RatingModule } from 'ng-starrating';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { MoviePosterComponent } from './movie-poster/movie-poster.component';
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    MoviePosterComponent,
    CastSlideshowComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    PipesModule
  ],
  exports:[
    NavbarComponent,
    RouterModule,
    SlideshowComponent,
    MoviePosterComponent,
    CastSlideshowComponent
  ]
})
export class ComponentsModule { }
