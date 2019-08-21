import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSearch'
})

export class FilterSearchPipe implements PipeTransform {
    transform(objts: any, term: any): any {
        // check if search terms is undefined
        if (term === undefined) { return objts; }

        // return updated objts array
        // tslint:disable-next-line:no-shadowed-variable
        return objts.filter(function(objts) {
            return objts.atributo.toLowerCase().includes(term.toLowerCase());
        });

    }
}
