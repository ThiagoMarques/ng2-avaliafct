import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Colaborador } from './../models/colaborador.model';
import { ColaboradorService } from '../services/colaborador.service';
import { Referencia } from '../../referencia/models/referencia.model';
import { ReferenciaService } from '../../referencia/services/referencia.service';
import { Divisao } from '../../divisao/models/divisao.model';
import { DivisaoService } from '../../divisao/services/divisao.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  formColaborador: FormGroup;
  colaborador: Colaborador[] = [];
  referencia: Referencia[] = [];
  divisao: Divisao[] = [];

  constructor(
    private fb: FormBuilder,
    private _colaboradorService: ColaboradorService,
    private _referenciaService: ReferenciaService,
    private _divisaoService: DivisaoService,
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
      referenciaFct: ['', Validators.required],
      sigla: ['', Validators.required],
      perfil_acesso: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getReferencia();
      this.getDivisao();
    });
  }

  getReferencia(): void {
    this._referenciaService.getReferencia().subscribe((dados: any) => {
      this.referencia = dados;
    });
  }

  getDivisao(): void {
    this._divisaoService.getDivisao().subscribe((dados: any) => {
      this.divisao = dados;
    });
  }

  onCreate(): void {
    if (this.formColaborador.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._colaboradorService.addColaborador(this.formColaborador.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Colaborador salvo com sucesso!', 'SUCESSO!');
          this.formColaborador.reset();
          this.formColaborador.markAsPristine();
          this.formColaborador.markAsUntouched();
          this.formColaborador.markAsPending();
        }
      });
    }
  }


  get form() {
    return this.formColaborador.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
