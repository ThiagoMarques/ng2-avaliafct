import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ErrorHandler } from './../../../app/app.error-handler';
import { environment } from './../../../environments/environment';

export abstract class RestService<T> {
    httpOptions: { headers: HttpHeaders; };
    private urlBase = `${environment.apiUrl}`;

    constructor(protected http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                }
            )
        };
    }

    public getUrlBase(): string {
        return this.urlBase;
    }

    public abstract getUrl(): string;
    public abstract mapIdentificador(objeto: T): number;

    getDefaultRequestOptions() {
        return this.httpOptions;
    }

    obterTodos(): Observable<T[]> {
        return this.http.get<T[]>(`${this.getUrlBase()}/${this.getUrl()}`)
            .pipe(
                // tap(_ => console.log('Listando registros')),
                catchError(ErrorHandler.handleError)
            );
    }

    obterPorId(id: number): Observable<T> {
        return this.http.get<T>(`${this.getUrlBase()}/${this.getUrl()}/${id}`, this.httpOptions)
            .pipe(
                // tap(_ => console.log(`Listando por id=${id}`)),
                catchError(ErrorHandler.handleError)
            );
    }

    adicionar(objeto: T) {
        return this.http.post(`${this.getUrlBase()}/${this.getUrl()}`, objeto, this.httpOptions)
            .pipe(
                // tap(_ => console.log('Adicionando novo registro')),
                catchError(ErrorHandler.handleError)
            );
    }

    removerPorId(id: number): Observable<any> {
        // console.log('Servidor: ', id);
        return this.http.delete<any>(`${this.getUrlBase()}/${this.getUrl()}` + '/' + id, this.getDefaultRequestOptions())
        .pipe(
            // tap(_ => console.log(`deleted hero id=${id}`)),
            catchError(ErrorHandler.handleError)
        );
    }

    removerAll(): Observable<any> {
        return this.http.delete(`${this.getUrlBase()}/${this.getUrl()}`,
            this.getDefaultRequestOptions())
            .catch(ErrorHandler.handleError);
    }

    atualizarPorId(objeto: T, id) {
        return this.http.put(`${this.getUrlBase()}/${this.getUrl()}` + '/' + id, objeto, this.getDefaultRequestOptions())
        .pipe(
            // tap(_ => console.log(`deleted hero id=${id}`)),
            catchError(ErrorHandler.handleError)
        );
    }

}
