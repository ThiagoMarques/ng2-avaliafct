import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RestService } from '../../../shared/service/rest.service';
import { Atributo } from '../models/atributo.model';

@Injectable({
    providedIn: 'root',
  })
export class AtributoService extends RestService<Atributo> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'atributo';
    }

    public mapIdentificador(objeto: Atributo): number {
        return objeto.idAtributo;
    }

    getAtributo(): Observable<Atributo[]> {
        return super.obterTodos();
    }

    getAtributoId(id: number): Observable<Atributo> {
        return super.obterPorId(id);
    }

    addAtributo(atributo: Atributo): Observable<any> {
        return super.adicionar(atributo);
    }

    deleteAtributo(id: number): Observable<Atributo> {
        return super.removerPorId(id);
    }

    updateatributo(id, atributo: Atributo): Observable<any> {
        return super.atualizarPorId(atributo, id);
    }
}
