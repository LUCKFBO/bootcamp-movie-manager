import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieModule } from './movie/movie.module';
import { MovieRegistrationComponent } from './movie/movie-registration/movie-registration.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';

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
        component: MovieRegistrationComponent,
        pathMatch: 'full'
      }
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
