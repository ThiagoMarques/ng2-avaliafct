import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';

export class ErrorHandler {

    static handleError(error: ResponseType | any) {
        let errorMessage: string;
        let errorMessageJson: Object;

        // remover depois
        if (error) {
            errorMessage = `Erro ${error.status} ao obter a URL ${error.url} - ${error.statusText} - ${error}`;
            errorMessageJson = {
                status: error.status,
                url: error.url,
                text: error.statusText,
                body: error.json()
            };
            console.log(errorMessageJson);

        } else {
            errorMessage = error.toString();
        }

        // return Observable.throw(errorMessageJson);
        return throwError(errorMessageJson);
    }
}
