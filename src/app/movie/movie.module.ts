import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MovieRegistrationComponent } from './movie-registration/movie-registration.component';
import { MaterialModule } from '../shared/material/material.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FieldModule } from '../shared/components/field/field.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldModule,
    InfiniteScrollModule
  ],
  declarations: [
    MovieRegistrationComponent,
    MovieListComponent,
    MovieDetailComponent
  ]
})
export class MovieModule { }
