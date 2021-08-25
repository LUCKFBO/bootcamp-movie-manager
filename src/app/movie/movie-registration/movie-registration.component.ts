import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovieService } from 'src/app/core/movie.service';
import { ValidateFieldService } from 'src/app/shared/components/field/validate-field.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movie-registration',
  templateUrl: './movie-registration.component.html',
  styleUrls: ['./movie-registration.component.scss']
})
export class MovieRegistrationComponent implements OnInit {

  options: FormGroup;
  generos: Array<string>;

  constructor(public validate: ValidateFieldService, private fb: FormBuilder, private movieService: MovieService) { }

  get f() {
    return this.options.controls;
  }

  ngOnInit() {

    this.options = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos =['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];

  }

  submit(): void {
    this.options.markAllAsTouched();
    if(this.options.invalid){
      return;
    }
    const movie = this.options.getRawValue() as Movie;
    this.save(movie);
  }

  reset(): void {
    this.options.reset();
  }

  private save(movie: Movie): void{
    this.movieService.save(movie).subscribe(() => {
      alert('Sucesso');
    },
    () => {
      alert('Erro ao salvar');
    });
  }

}
