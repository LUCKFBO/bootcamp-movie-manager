import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from 'src/app/core/movie.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Movie } from 'src/app/shared/models/movie';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  readonly noTumb = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

  config: ConfigParams = {
    page: 0,
    limitPage: 4,
  };
  movies: Movie[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;


  constructor(private movieService: MovieService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.listMovie();
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges.pipe(debounceTime(400)).subscribe((val: string) => {
      this.config.search = val;
      this.resetQuery();
    });
    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.field = {tipo: 'genero', valor: val};
      this.resetQuery();
    });

    this.generos =['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];

  }

  onScroll(): void {
    this.listMovie();
  }

  open(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listMovie(): void{
    this.config.page++;
    this.movieService.list(this.config).subscribe((movie: Movie[]) => this.movies.push(...movie));
  }

  private resetQuery(): void{
    this.config.page = 0;
    this.movies = [];
    this.listMovie();
  }

}
