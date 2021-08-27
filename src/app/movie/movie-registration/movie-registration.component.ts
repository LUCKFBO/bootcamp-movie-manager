import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/movie.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateFieldService } from 'src/app/shared/components/field/validate-field.service';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movie-registration',
  templateUrl: './movie-registration.component.html',
  styleUrls: ['./movie-registration.component.scss']
})
export class MovieRegistrationComponent implements OnInit {

  id: number;
  options: FormGroup;
  generos: Array<string>;

  constructor(public validate: ValidateFieldService, private fb: FormBuilder, private movieService: MovieService, public dialog: MatDialog, private router: Router, private ar: ActivatedRoute) { }

  get f() {
    return this.options.controls;
  }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    if(this.id){
      this.movieService.visualize(this.id).subscribe((movie: Movie) => this.createForm(movie));
    }
    else
    {
      this.createForm(this.createEmptyMovie());
    }

    this.generos =['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];

  }

  submit(): void {
    this.options.markAllAsTouched();
    if(this.options.invalid){
      return;
    }
    const movie = this.options.getRawValue() as Movie;
    if(this.id){
      movie.id = this.id;
      this.update(movie);
    }
    else {
      this.save(movie);
    }

  }

  reset(): void {
    this.options.reset();
  }

  private createForm(movie: Movie): void
  {
    this.options = this.fb.group({
      titulo: [movie.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [movie.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [movie.dtLancamento, [Validators.required]],
      descricao: [movie.descricao],
      nota: [movie.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: [movie.urlIMDB, [Validators.minLength(10)]],
      genero: [movie.genero, [Validators.required]]
    });

  }

  private createEmptyMovie(): Movie {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDB: null,
      genero: null
    } as Movie;
  }

  private save(movie: Movie): void{
    this.movieService.save(movie).subscribe(() => {
      const config = {
        data: {
          btnSuccess: 'Ir para a listagem',
          btnCancel: 'Cadastrar um novo filme',
          colorBtnCancel: 'primary',
          hasCloseBtn: true,
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao){
          this.router.navigateByUrl('filmes');
        }
        else {
          this.reset();
        }
      });
    },
    () => {
      const config = {
        data: {
          title: 'Erro ao salvar o registro!',
          description: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Fechar',
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }


  private update(movie: Movie): void{
    this.movieService.update(movie).subscribe(() => {
      const config = {
        data: {
          description: 'Seu registro foi atualizado com sucesso',
          btnSuccess: 'Ir para a listagem',
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
    },
    () => {
      const config = {
        data: {
          title: 'Erro ao editar o registro!',
          description: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          colorBtnSuccess: 'warn',
          btnSuccess: 'Fechar',
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
