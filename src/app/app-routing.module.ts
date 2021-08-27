import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieModule } from './movie/movie.module';
import { MovieRegistrationComponent } from './movie/movie-registration/movie-registration.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'filmes',
      pathMatch: 'full'
  },
  {
    path: 'filmes',
    children: [
      {
        path: '',
        component: MovieListComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: MovieRegistrationComponent
          },
          {
            path: ':id',
            component: MovieRegistrationComponent,
          }
        ]
      },
      {
        path: ':id',
        component: MovieDetailComponent,
        pathMatch: 'full'
      },
    ]
  },
  { path: '**', redirectTo: 'filmes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MovieModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
