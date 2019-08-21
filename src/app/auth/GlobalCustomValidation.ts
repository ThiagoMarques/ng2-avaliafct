import { AbstractControl } from '@angular/forms';

export class GlobalCustomValidation {

    static MatchPassword(AC: AbstractControl) {

        const password = AC.get('nova_senha').value; // to get value in input tag
        const confirmPassword = AC.get('confirmar_senha').value; // to get value in input tag

        if (password != null && confirmPassword != null) {
            if (password !== confirmPassword) {
                AC.get('confirmar_senha').setErrors({ MatchPassword: true });
            } else {
                // console.log('true');
                return null;
            }
        }

    }
}

