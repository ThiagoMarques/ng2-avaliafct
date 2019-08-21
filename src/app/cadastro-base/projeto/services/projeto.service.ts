import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Projeto } from '../models/projeto.model';
import { RestService } from '../../../shared/service/rest.service';

@Injectable({
    providedIn: 'root',
  })
export class ProjetoService extends RestService<Projeto> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'projeto';
    }

    public mapIdentificador(objeto: Projeto): number {
        return objeto.id_projeto;
    }

    getProjeto(): Observable<Projeto[]> {
        return super.obterTodos();
    }

    getProjetoId(id): Observable<Projeto> {
        return super.obterPorId(id);
    }

    addProjeto(projeto: Projeto) {
        return super.adicionar(projeto);
    }

    deleteProjeto(id: number) {
        return super.removerPorId(id);
    }

    updateProjeto(id, projeto) {
        return super.atualizarPorId(projeto, id);
    }
}
