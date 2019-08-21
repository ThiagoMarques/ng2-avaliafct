import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({});
  profileModel = {
    nome: 'Leonardo Merlin',
    apelido: 'Merlin',
    ramal: '(41) 3148',
    email: 'leonardo.merlin@serpro.gov.br',
    matricula: '000000000'
  };
  profileFields: FormlyFieldConfig[] = [
    {
      key: 'nome',
      type: 'input',
      className: 'col-12',
      templateOptions: {
        type: 'text',
        label: 'Nome',
        placeholder: 'Nome completo',
        required: true
      }
    },
    {
      key: 'apelido',
      type: 'input',
      className: 'col-8',
      templateOptions: {
        type: 'text',
        label: 'Apelido'
      }
    },
    {
      key: 'ramal',
      type: 'input',
      className: 'col-4',
      templateOptions: {
        type: 'text',
        label: 'Ramal'
      }
    },
    {
      key: 'email',
      type: 'input',
      className: 'col-8',
      templateOptions: {
        type: 'email',
        label: 'E-mail',
        required: true
      }
    },
    // NOTA: Força a quebra de linha
    // {
    //   className: 'w-100',
    //   template: '<div></div>',
    // },
    {
      key: 'matricula',
      type: 'input',
      className: 'col-4',
      templateOptions: {
        type: 'text',
        label: 'Matrícula',
        required: true,
        readonly: true
      }
    }
  ];

  localState = {
    loading: false,
    sending: false
  };

  constructor() {}

  ngOnInit() {}

  submit(model) {
    this.localState.sending = true;
    this.profileForm.disable();
    console.log('persisting model...', model);

    // NOTA: aplica um fake "sending"
    setTimeout(() => {
      this.localState.sending = false;
      this.profileForm.enable();
    }, 2000);
  }
}
