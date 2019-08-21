import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RestService } from '../../../shared/service/rest.service';
import { Colaborador } from '../models/colaborador.model';

@Injectable({
    providedIn: 'root',
  })
export class ColaboradorService extends RestService<Colaborador> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'colaborador';
    }

    public mapIdentificador(objeto: Colaborador): number {
        return objeto.idColaborador;
    }

    getColaborador(): Observable<Colaborador[]> {
        return super.obterTodos();
    }

    getColaboradorId(id: number): Observable<Colaborador> {
        return super.obterPorId(id);
    }

    addColaborador(colaborador: Colaborador): Observable<any> {
        return super.adicionar(colaborador);
    }

    deleteColaborador(id: number): Observable<Colaborador> {
        return super.removerPorId(id);
    }

    updatecolaborador(id, colaborador: Colaborador): Observable<any> {
        return super.atualizarPorId(colaborador, id);
    }

}
