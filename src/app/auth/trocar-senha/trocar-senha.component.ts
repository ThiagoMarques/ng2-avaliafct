import { Component, OnInit } from '@angular/core';
import { ToastrCenterService } from '@serpro-design/angular';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/auth.service';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html'
})
export class TrocarSenhaComponent implements OnInit {

  formAlterarSenha: FormGroup;
  token: string;
  id_acesso: number;

  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrCenterService,
    private _location: Location,
    private router: Router,
    private authService: LoginService
  ) {
    this.formAlterarSenha = this.fb.group({
      cpf: [{ value: '', disabled: true }, Validators.required],
      senha_atual: ['', Validators.required],
      nova_senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmar_senha: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.trocarSenha();
  }

  trocarSenha(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.formAlterarSenha.controls['cpf'].setValue(currentUser['login']);
    this.id_acesso = currentUser['id_acesso'];
  }
  resetPassword() {
    const user: any = {
      cpf: this.formAlterarSenha.value.cpf,
      senha_atual: this.formAlterarSenha.value.senha_atual,
      nova_senha: this.formAlterarSenha.value.nova_senha,
      confirmar_senha: this.formAlterarSenha.value.confirmar_senha,
      status_ativo: 1
    };

    this.authService.resetUser(this.id_acesso, user).subscribe(
      users => {
        this.formAlterarSenha.reset();
        this.formAlterarSenha.markAsPristine();
        this.formAlterarSenha.markAsUntouched();
        this.formAlterarSenha.markAsPending();
        this._toastrService.success(
          'Senha atualizada com sucesso.',
          'SUCESSO!'
        );
        this.router.navigate(['/avaliacao']);
      },
      error => {
        console.log(error);
      }
    );

  }
  // alterarSenha(): void {
  //   if (this.formAlterarSenha.invalid) {
  //     this._toastrService.error('A sua senha atual é inválida.', 'ERRO!');
  //   } else {
  //     const senha_atual = this.formAlterarSenha.value['senha_atual'];
  //     const nova_senha = this.formAlterarSenha.value['nova_senha'];
  //     const confirmar_senha = this.formAlterarSenha.value['confirmar_senha'];

  //     this._toastrService.success(
  //       'Senha atualizada com sucesso.',
  //       'SUCESSO!'
  //     );
  //     this.formAlterarSenha.reset();
  //     this.formAlterarSenha.markAsPristine();
  //     this.formAlterarSenha.markAsUntouched();
  //     this.formAlterarSenha.markAsPending();
  //     this.onCancel();
  //   }
  // }
  user(): UserInterface {
    return this.authService.user;
  }

  get form() {
    return this.formAlterarSenha.controls;
  }
  onCancel() {
    this._location.back();
  }

}
