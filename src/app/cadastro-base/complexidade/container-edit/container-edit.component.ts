import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Complexidade } from '../models/complexidade.model';
import { ComplexidadeService } from './../services/complexidade.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { AtributoService } from '../../atributo/services/atributo.service';
import { Atributo } from '../../atributo/models/atributo.model';


@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  complexidade: Complexidade;
  complexidadeList: Complexidade[];
  atributo: Atributo[];
  formComplexidade: FormGroup;
  id_complexidade: number;



  constructor(
    private _complexidadeService: ComplexidadeService,
    private _atributoService: AtributoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location


  ) {
    this.formComplexidade = this.fb.group({
      tipo: ['', Validators.required],
      atributo: ['', Validators.required],
      classificacao: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_complexidade = params.id;
      this.getComplexidadeId(this.id_complexidade);
      this.getComplexidade();
      this.getAtributo();
    });
  }

  getAtributo(): void {
    this._atributoService.getAtributo().subscribe((dados: any) => {
      this.atributo = dados;
    });
  }

  getComplexidadeId(id: number): void {
    this._complexidadeService.getComplexidadeId(id).subscribe((dados: any) => {
      this.complexidade = dados;
      this.formComplexidade.controls['tipo'].setValue(dados.tipo);
      this.formComplexidade.controls['atributo'].setValue(dados.atributo);
      this.formComplexidade.controls['classificacao'].setValue(dados.classificacao);
      this.formComplexidade.controls['nome'].setValue(dados.nome);
      this.formComplexidade.controls['descricao'].setValue(dados.descricao);
    });
  }

  getComplexidade(): void {
    this._complexidadeService.getComplexidade().subscribe((dados: any) => {
      this.complexidadeList = dados;
    });
  }

  editarCrud(): void {
    if (this.formComplexidade.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._complexidadeService
        .updateComplexidade(this.id_complexidade, this.formComplexidade.value)
        .subscribe(data => {
          if (data) {
            this._toastrService.success(
              'Complexidade atualizada com sucesso.',
              'SUCESSO!'
            );
            this.formComplexidade.reset();
            this.formComplexidade.markAsPristine();
            this.formComplexidade.markAsUntouched();
            this.formComplexidade.markAsPending();
            this.onCancel();
          }
        });
    }
  }

  get form() {
    return this.formComplexidade.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
