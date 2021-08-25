import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';

const url = 'http://localhost:3000/filmes/'

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) { }


  save(filme: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, filme);
  }


}
