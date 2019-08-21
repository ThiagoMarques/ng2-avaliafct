import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'telMask'})
export class TelPipe implements PipeTransform {

   transform(value: string) {
      if (value) {
           value = value.toString();
           // if(value.length === 11){
               return '(' + value.substr(0, 2).concat(') ')
                                    .concat(value.substr(2, 4))
                                    .concat('-')
                                    .concat(value.substr(6, 4));

           // }
       }
       return value;
   }
}
