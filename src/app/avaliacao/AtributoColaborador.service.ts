import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../shared/service/rest.service';
import { Observable } from 'rxjs';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AtributoColaborador } from './AtributoColaborador.model';

@Injectable({
    providedIn: 'root',
  })
export class AtributoColaboradorService  extends RestService<AtributoColaborador> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'AtributoColaborador';
    }

    public mapIdentificador(objeto: AtributoColaborador): number {
        return objeto.TB_COLABORADOR_id_colaborador;
    }

    addAssociacaoAtributoColaborador(associacao: any) {
        return super.adicionar(associacao);
    }


}
