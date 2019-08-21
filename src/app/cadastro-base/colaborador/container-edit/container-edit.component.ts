import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Colaborador } from './../models/colaborador.model';
import { ColaboradorService } from '../services/colaborador.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  colaborador: Colaborador[] = [];
  colaboradorList: Colaborador[] = [];
  formColaborador: FormGroup;
  id_colaborador: number;

  constructor(
    private fb: FormBuilder,
    private _colaboradorService: ColaboradorService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.formColaborador = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      especialidade: ['', Validators.required],
      salario: ['', Validators.required],
      percentual_salario: ['', Validators.required],
      TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe: [''],
      TB_DIVISAO_id_divisao: [''],
      TB_ACESSO_id_acesso: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_colaborador = params.id;
      this.getColaboradorId(this.id_colaborador);
      this.getColaborador();
    });
  }

  getColaboradorId(id: number): void {
    this._colaboradorService.getColaboradorId(id).subscribe((dados: any) => {
      this.colaborador = dados;

      const {
        nome,
        telefone,
        especialidade,
        salario,
        percentual_salario,
        TB_ACESSO_id_acesso,
        TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe,
        TB_DIVISAO_id_divisao
      } = dados;

      this.formColaborador.patchValue({
        matricula: dados.matricula,
        nome: nome,
        telefone: telefone,
        especialidade: especialidade,
        salario: salario,
        percentual_salario: percentual_salario,
        TB_ACESSO_id_acesso: TB_ACESSO_id_acesso,
        TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe: TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe,
        TB_DIVISAO_id_divisao: TB_DIVISAO_id_divisao
      });
    });
  }

  getColaborador(): void {
    this._colaboradorService
      .getColaborador()
      .subscribe(colaborador => (this.colaboradorList = colaborador));
  }

  editarCrud(): void {
    if (this.formColaborador.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    }

    this._colaboradorService
      .updatecolaborador(this.id_colaborador, this.formColaborador.value)
      .subscribe(
        sucesso => {
          if (sucesso) {
            this._toastrService.success(
              'Colaborador atualizado com sucesso.',
              'SUCESSO!'
            );
            this.formColaborador.reset();
            this.formColaborador.markAsPristine();
            this.formColaborador.markAsUntouched();
            this.formColaborador.markAsPending();
            this.onCancel();
          }
        },
        error =>
          this._toastrService.error(
            'Erro ao atualizar o colaborador.' + error,
            'ERRO!'
          )
      );
  }

  get form() {
    return this.formColaborador.controls;
  }

  onCancel(): void {
    this._location.back();
  }
}
