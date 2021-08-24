import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MovieRegistrationComponent } from './movie-registration/movie-registration.component';
import { MaterialModule } from '../shared/material/material.module';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    MovieRegistrationComponent,
    MovieListComponent
  ]
})
export class MovieModule { }
