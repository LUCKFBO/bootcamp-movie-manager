import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MovieRegistrationComponent } from './movie-registration/movie-registration.component';
import { MaterialModule } from '../shared/material/material.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FieldModule } from '../shared/components/field/field.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldModule
  ],
  declarations: [
    MovieRegistrationComponent,
    MovieListComponent
  ]
})
export class MovieModule { }
