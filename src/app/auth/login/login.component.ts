import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/auth.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';


export class Results {
  texto: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  recuperarSenhaForm: FormGroup;
  senhaNova: boolean;
  navigateTo: any;
  loginState = 'ready';
  modalRef: BsModalRef;

  results: Results = {
    texto: '',
    senha: ''
  };

  constructor(
    private authService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _toastrService: ToastrCenterService
  ) {
    this.formLogin = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.recuperarSenhaForm = this.fb.group({
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email]))
    });
  }

  onSubmit() {
    const login = this.formLogin.value['login'];
    const senha = this.formLogin.value['senha'];
    this.authService.login(this.formLogin.value).subscribe(
      users => {
        this._toastrService.info(`Bem Vindo, ${login}`, '', { timeOut: 3000 });
        this.authService.isAuthenticated();
        setTimeout(() => {
        }, 500);
        this.router.navigate(['/consultas']);
      },
      error => {
        this._toastrService.error('Dados invalidos. Por favor! tente novamente ...', '', { timeOut: 3000 });
        this.formLogin.reset();
        this.formLogin.markAsPristine();
        this.formLogin.markAsUntouched();
        this.formLogin.markAsPending();
      });
  }
  get form() {
    return this.formLogin.controls;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalEsqueceuSenha(template: TemplateRef<any>) {
    this.senhaNova = false;
    this.recuperarSenhaForm.reset();
    this.openModal(template);
  }
  resetarSenha() {

    const email = this.recuperarSenhaForm.value;

    this.authService.recuperarSenha(email).subscribe(
      data => {
        this.senhaNova = true;
        this.results.texto = 'Nova senha gerada: ';
        console.log('Nova senha gerada: ', data);
        this.results.senha = data.toString().replace('"', '').replace('"', '');
      }, error => {
        this.senhaNova = true;
        this.results.texto = 'Seu e-mail não foi encontrado na base de dados. Fale com o administrador do sistema.';
        this.results.senha = '';
        // return Observable.throw(error);
      });

  }
}
