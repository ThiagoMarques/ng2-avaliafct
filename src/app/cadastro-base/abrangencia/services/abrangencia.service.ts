import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Abrangencia } from '../models/abrangencia.model';
import { RestService } from '../../../shared/service/rest.service';

@Injectable({
    providedIn: 'root',
  })
export class AbrangenciaService extends RestService<Abrangencia> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'abrangencia';
    }

    public mapIdentificador(objeto: Abrangencia): number {
        return objeto.id_abrangencia;
    }

    getAbrangencia(): Observable<Abrangencia[]> {
        return super.obterTodos();
    }

    getAbrangenciaId(id: number): Observable<Abrangencia> {
        return super.obterPorId(id);
    }

    addAbrangencia(abrangencia: Abrangencia): Observable<any> {
        return super.adicionar(abrangencia);
    }

    deleteAbrangencia(id: number): Observable<Abrangencia> {
        return super.removerPorId(id);
    }

    updateAbrangencia(id, abrangencia: Abrangencia): Observable<any> {
        return super.atualizarPorId(abrangencia, id);
    }

}
