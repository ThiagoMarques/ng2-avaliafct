import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { MEAT_API } from '../../../app.api';

import { Papel } from '../models/papel.model';
import { RestService } from '../../../shared/service/rest.service';

export class AtributoPapel {
    TB_ATRIBUTO_id_atributo: number;
    TB_PAPEL_id_papel: number;
}

@Injectable({
    providedIn: 'root',
  })
export class PapelService extends RestService<Papel> {

    private papel: Papel;

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'papel';
    }

    mapIdentificador(objeto: Papel): number {
        return objeto.id_papel;
    }

    getPapel(): Observable<Papel[]> {
        return super.obterTodos();
    }

    getPapelId(id): Observable<Papel> {
        return super.obterPorId(id);
    }

    addPapel(papel: Papel) {
        return super.adicionar(papel);
    }

    deletePapel(id: number) {
        return super.removerPorId(id);
    }

    updatePapel(papel, id) {
        return super.atualizarPorId(papel, id);
    }

    getMaxId() {
        return this.http.get(`${MEAT_API}/papel/1/1`, this.getDefaultRequestOptions());
    }

    getAtributoPapel(): Observable<Papel[]> {
        return this.http.get<Papel[]>(`${MEAT_API}/AtributoPapel/`, this.getDefaultRequestOptions());
    }

    addAtributoPapel(atributoPapel: AtributoPapel): Observable<string> {
        return this.http.post<string>(`${MEAT_API}/AtributoPapel/`, atributoPapel, this.getDefaultRequestOptions());
    }

    deleteAtributoPapel(id: number): Observable<string> {
        return this.http.delete<string>(`${MEAT_API}/AtributoPapel/` + id, this.getDefaultRequestOptions());
    }

}
