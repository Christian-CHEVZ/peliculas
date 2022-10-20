import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';



@NgModule({
  declarations: [
    PosterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    PosterPipe
  ]
})
export class PipesModule { }
