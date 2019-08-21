import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-exemplo-ngx-formly',
  templateUrl: './exemplo-ngx-formly.component.html'
})
export class ExemploNgxFormlyComponent implements OnInit {
  myForm = new FormGroup({});
  model = { email: '', password: '' };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'E-mail',
        placeholder: 'Seu melhor e-mail',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Senha',
        placeholder: '************',
        required: true
      }
    }
  ];
  fieldsInline: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      className: 'col-6',
      templateOptions: {
        type: 'email',
        label: 'E-mail',
        placeholder: 'Seu melhor e-mail',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      className: 'col-6',
      templateOptions: {
        type: 'password',
        label: 'Senha',
        placeholder: '************',
        required: true
      }
    }
  ];
  addressFieldsInline: FormlyFieldConfig[] = [
    {
      key: 'address',
      type: 'input',
      className: 'col-8',
      templateOptions: {
        type: 'text',
        label: 'Endereço',
        description: 'Endereço completo, com número'
      }
    },
    {
      key: 'address2',
      type: 'input',
      className: 'col-4',
      templateOptions: {
        type: 'text',
        label: 'Complemento',
        description: 'Bloco e apartamento'
      }
    },
    {
      key: 'city',
      type: 'input',
      className: 'col-7',
      templateOptions: {
        type: 'text',
        label: 'Cidade'
      }
    },
    {
      key: 'uf',
      type: 'select',
      className: 'col-2',
      templateOptions: {
        type: 'text',
        label: 'UF',
        options: [
          { value: 1, label: 'AA' },
          { value: 2, label: 'BB' },
          { value: 3, label: 'CC' },
          { value: 4, label: 'DD' }
        ]
      }
    },
    {
      key: 'zip',
      type: 'input',
      className: 'col-3',
      templateOptions: {
        type: 'text',
        label: 'CEP'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}

  submit(data) {
    // simula uma operação assíncrona
    this.myForm.disable();
    console.log('enviando os dados...', data);
    setTimeout(() => {
      this.myForm.enable();
    }, 1500);
  }
}
