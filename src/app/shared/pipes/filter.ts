import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(objts: any, term: any): any {
        // check if search terms is undefined
        if (term === undefined) { return objts; }

        // return updated objts array
        return objts.filter(function(obj) {
            return obj.atributo.toLowerCase().includes(term.toLowerCase());
        });

    }
}
