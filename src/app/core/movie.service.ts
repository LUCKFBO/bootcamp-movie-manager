import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generate, Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Movie } from '../shared/models/movie';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/filmes/'

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient, private configService: ConfigParamsService) { }


  save(filme: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, filme);
  }

  list(config: ConfigParams): Observable<Movie[]>{
    const configParams = this.configService.configurarParametros(config);
    return this.http.get<Movie[]>(url, {params: configParams});
  }


}
