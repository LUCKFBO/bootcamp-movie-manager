import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {

    let httpParams = new HttpParams();
    if(config.page) {
      httpParams = httpParams.set('_page', config.page.toString());
    }
    if(config.limitPage) {
      httpParams = httpParams.set('_limit', config.limitPage.toString());
    }
    if(config.search){
      httpParams = httpParams.set('q', config.search);
    }
    if(config.field){
      httpParams = httpParams.set(config.field.tipo, config.field.valor.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');
    return httpParams;
  }
}
