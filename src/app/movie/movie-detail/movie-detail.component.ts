import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/movie.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  readonly noTumb = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  id: number;

  constructor(private ar: ActivatedRoute, private movieService: MovieService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    this.visualize();
  }

  private visualize(): void{
    this.movieService.visualize(this.id).subscribe((movie: Movie) => this.movie = movie);
  }

  exclude(): void {
    const config = {
      data: {
        title: 'Você tem certeza que deseja excluir?',
        description: 'Caso você tenha certeza que deseja excluir clique no botão OK',
        colorBtnCancel: 'primary',
        colorBtnSuccess: 'warn',
        hasCloseBtn: true,
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao){
        this.movieService.exclude(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  edit(): void{
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

}
