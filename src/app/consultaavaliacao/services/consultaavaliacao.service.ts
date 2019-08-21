import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MEAT_API } from '../../app.api';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs';
import { Consultaavaliacao } from '../models/consultaavaliacao.model';
import { RestService } from '../../shared/service/rest.service';
import { Router } from '@angular/router';
import { Avaliacao } from '../../avaliacao/models/avaliacao.model';


@Injectable({
    providedIn: 'root',
  })
export class ConsultaavaliacaoService  extends RestService<Avaliacao>  {
    avaliacao: Avaliacao;

    constructor(protected http: HttpClient, private router: Router) {
        super(http);
    }

    public getUrl(): string {
        return 'users';
    }

    public mapIdentificador(objeto: Avaliacao): number {
        return objeto.id_resultado;
    }


    getBuscaDetalhesAvaliacao(id: number): Observable<Consultaavaliacao[]> {
        return this.http.get<Consultaavaliacao[]>(`${MEAT_API}/avaliacao/${id}/resultado`, this.getDefaultRequestOptions());
    }
}
