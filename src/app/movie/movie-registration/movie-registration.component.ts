import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  options: FormGroup;
  generos: Array<string>;

  constructor(public validate: ValidateFieldService, private fb: FormBuilder, private movieService: MovieService, public dialog: MatDialog, private router: Router) { }

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

}
