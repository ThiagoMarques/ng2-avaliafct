import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RestService } from '../../../shared/service/rest.service';
import { Impacto } from '../models/impacto.model';

@Injectable({
    providedIn: 'root',
  })
export class ImpactoService extends RestService<Impacto> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'impacto';
    }

    public mapIdentificador(objeto: Impacto): number {
        return objeto.id_impacto;
    }

    getImpacto(): Observable<Impacto[]> {
        return super.obterTodos();
    }

    getImpactoId(id): Observable<Impacto> {
        return super.obterPorId(id);
    }

    addImpacto(impacto: Impacto) {
        return super.adicionar(impacto);
    }

    deleteImpacto(id: number) {
        return super.removerPorId(id);
    }

    updateImpacto(id, impacto) {
        return super.atualizarPorId(impacto, id);
    }
}

