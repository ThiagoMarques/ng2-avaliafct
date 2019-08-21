import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs';
import { RestService } from '../../../app/shared/service/rest.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
    providedIn: 'root',
  })


@Injectable()
export class AvaliacaoService  extends RestService<Avaliacao> {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUrl(): string {
        return 'avaliacao';
    }

    public mapIdentificador(objeto: Avaliacao): number {
        return objeto.id_resultado;
    }

    getMaxId() {
        return this.http.get(`${MEAT_API}/avaliacao/maxId`);
    }

    getAvaliacao(): Observable<Avaliacao[]> {
        return this.http.get<Avaliacao[]>(`${MEAT_API}/avaliacao`, this.getDefaultRequestOptions());
    }

    getPapelAtributo(id_papel): Observable<Avaliacao[]> {
        return this.http.get<Avaliacao[]>(`${MEAT_API}/PapelAtributo/${id_papel}`, this.getDefaultRequestOptions());
    }

    getBuscaAtributo(id_abrangencia, id_complexidade, id_impacto, letra): Observable<Avaliacao[]> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<Avaliacao[]>(`${MEAT_API}/avaliacao/buscaAtributo/${id_abrangencia}/${id_complexidade}/${id_impacto}/${letra}`,
        this.getDefaultRequestOptions());
    }

    addAssociacaoColaboradorTecnologia(tecnologiaColaborador: any): any {
        return this.http.post(`${MEAT_API}/avaliacao/tecnologiaColaborador/`, tecnologiaColaborador, this.getDefaultRequestOptions());
    }

    addAssociacaoColaboradorPapel(papelColaborador: any): any {
        return this.http.post(`${MEAT_API}/avaliacao/papelColaborador/`, papelColaborador, this.getDefaultRequestOptions())
        .do(data => console.log('server data:', data));
    }

    addAssociacaoColaboradorProjeto(projetoColaborador: any): any {
        return this.http.post(`${MEAT_API}/avaliacao/projetoColaborador/`, projetoColaborador, this.getDefaultRequestOptions())
        .do(data => console.log('server data:', data));
    }

    addAssociacaoAtributoProjeto(atributoProjeto: any): any {
        return this.http.post(`${MEAT_API}/avaliacao/atributoProjeto/`, atributoProjeto, this.getDefaultRequestOptions())
        .do(data => console.log('server data:', data));
    }

    addAvaliacao(avaliacao: any) {
        return super.adicionar(avaliacao);
    }

    getAvaliacaoId(id): Observable<Avaliacao> {
        return super.obterPorId(id);
    }

    deleteAvaliacao(id: number) {
        return super.removerPorId(id);
    }

    updateAvaliacao(id, avaliacao) {
        return super.atualizarPorId(avaliacao, id);
    }
}
