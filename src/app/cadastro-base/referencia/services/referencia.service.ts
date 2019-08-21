import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Referencia } from '../models/referencia.model';
import { RestService } from '../../../shared/service/rest.service';

@Injectable({
    providedIn: 'root',
  })
export class ReferenciaService extends RestService<Referencia> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'referencia';
    }

    public mapIdentificador(objeto: Referencia): number {
        return objeto.id_referencia_fct_gfe;
    }

    getReferencia(): Observable<Referencia[]> {
        return super.obterTodos();
    }

    getReferenciaId(id): Observable<Referencia> {
        return super.obterPorId(id);
    }

    addReferencia(referencia: Referencia) {
        return super.adicionar(referencia);
    }

    deleteReferencia(id: number) {
        return super.removerPorId(id);
    }

    updateReferencia(id, referencia) {
        return super.atualizarPorId(referencia, id);
    }
}
