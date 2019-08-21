import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Atributo } from '../models/atributo.model';
import { AtributoService } from '../services/atributo.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { Abrangencia } from '../../abrangencia/models/abrangencia.model';
import { AbrangenciaService } from '../../abrangencia/services/abrangencia.service';
import { Complexidade } from '../../complexidade/models/complexidade.model';
import { ComplexidadeService } from '../../complexidade/services/complexidade.service';
import { Impacto } from '../../impacto/models/impacto.model';
import { ImpactoService } from '../../impacto/services/impacto.service';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  formAtributo: FormGroup;

  atributo = new Atributo();
  Abrangencia: Abrangencia[] = [];
  Complexidade: Complexidade[] = [];
  Impacto: Impacto[] = [];
  id_atributo: number;

  constructor(
    private fb: FormBuilder,
    private _atributoService: AtributoService,
    private _abrangenciaService: AbrangenciaService,
    private _complexidadeService: ComplexidadeService,
    private _impactoService: ImpactoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.formAtributo = this.fb.group({
      descricao: ['', Validators.required],
      impactoNome: ['', Validators.required],
      letra: [null, [Validators.required]],
      TB_ABRANGENCIA_id_abrangencia: [null, [Validators.required]],
      TB_COMPLEXIDADE_id_complexidade: [null, [Validators.required]],
      TB_IMPACTO_id_impacto: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_atributo = params.id;
      this.getAbrangencia();
      this.getComplexidade();
      this.getImpacto();
      this.getAtributoId(this.id_atributo);
    });
  }

  getAtributoId(id: number): void {
    this._atributoService.getAtributoId(id).subscribe((dados: any) => {
      this.atributo = dados;
      this.formAtributo.controls['descricao'].setValue(dados.letra);
      this.formAtributo.controls['TB_ABRANGENCIA_id_abrangencia'].setValue(dados.TB_ABRANGENCIA_id_abrangencia);
      this.formAtributo.controls['TB_COMPLEXIDADE_id_complexidade'].setValue(dados.TB_COMPLEXIDADE_id_complexidade);
      this.formAtributo.controls['TB_IMPACTO_id_impacto'].setValue(dados.TB_IMPACTO_id_impacto);
    });
  }

  getAbrangencia(): void {
    this._abrangenciaService.getAbrangencia().subscribe((dados: any) => {
      this.Abrangencia = dados;
    });
  }

  getComplexidade(): void {
    this._complexidadeService.getComplexidade().subscribe((dados: any) => {
      this.Complexidade = dados;
    });
  }

  getImpacto(): void {
  this._impactoService.getImpacto().subscribe(dados => {
  this.Impacto = dados;
  });
  }

  editarCrud(): void {
    if (this.formAtributo.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._atributoService
        .updateatributo(this.id_atributo, this.formAtributo.value)
        .subscribe(data => {
          if (data) {
            this._toastrService.success(
              'Abrangencia atualizado com sucesso.',
              'SUCESSO!'
            );
            this.formAtributo.reset();
            this.formAtributo.markAsPristine();
            this.formAtributo.markAsUntouched();
            this.formAtributo.markAsPending();
            this.onCancel();
          }
        });
    }
  }

  get form() {
    return this.formAtributo.controls;
  }

  onCancel(): void {
    this._location.back();
  }
}
