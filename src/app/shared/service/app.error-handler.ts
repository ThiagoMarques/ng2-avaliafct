import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

export class ErrorHandler {
  static handleError(error: ResponseType | any) {
    let errorMessage: string;
    let errorMessageJson: Object;

    if (error) {

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
