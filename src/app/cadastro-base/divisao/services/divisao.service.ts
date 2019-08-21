import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RestService } from '../../../shared/service/rest.service';
import { Divisao } from '../models/divisao.model';

@Injectable({
    providedIn: 'root',
  })
export class DivisaoService extends RestService<Divisao> {


    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'divisao';
    }

    public mapIdentificador(objeto: Divisao): number {
        return objeto.id_divisao;
    }

    getDivisao(): Observable<Divisao[]> {
        return super.obterTodos();
    }

    getDivisaoId(id): Observable<Divisao> {
        return super.obterPorId(id);
    }

    addDivisao(divisao: Divisao) {
        return super.adicionar(divisao);
    }

    deleteDivisao(id: number) {
        return super.removerPorId(id);
    }

    updateDivisao(id, divisao) {
        return super.atualizarPorId(divisao, id);
    }
}
