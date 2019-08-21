import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Impacto } from '../models/impacto.model';
import { ImpactoService } from './../services/impacto.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  impacto: Impacto[] = [];
  impactoList: Impacto[] = [];
  formImpacto: FormGroup;
  id_impacto: number;

  constructor(
    private _impactoService: ImpactoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location


  ) {
    this.formImpacto = this.fb.group({
      tipo: ['', Validators.required],
      atributo: ['', Validators.required],
      classificacao: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_impacto = params.id;
      this.getImpactoId(this.id_impacto);
      this.getImpacto();
    });
  }

  getImpactoId(id: number): void {
    this._impactoService.getImpactoId(id).subscribe((dados: any) => {
      this.impacto = dados;
      this.formImpacto.controls['tipo'].setValue(dados.tipo);
      this.formImpacto.controls['atributo'].setValue(dados.atributo);
      this.formImpacto.controls['classificacao'].setValue(dados.classificacao);
      this.formImpacto.controls['nome'].setValue(dados.nome);
      this.formImpacto.controls['descricao'].setValue(dados.descricao);
    });
  }

  getImpacto(): void {
    this._impactoService.getImpacto().subscribe((dados: any) => {
      this.impactoList = dados;
    });
  }

  editarCrud(): void {
    if (this.formImpacto.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._impactoService
        .updateImpacto(this.id_impacto, this.formImpacto.value)
        .subscribe(data => {
          if (data) {
            this._toastrService.success(
              'Impacto atualizado com sucesso.',
              'SUCESSO!'
            );
            this.formImpacto.reset();
            this.formImpacto.markAsPristine();
            this.formImpacto.markAsUntouched();
            this.formImpacto.markAsPending();
            this.onCancel();
          }
        });
    }
  }

  get form() {
    return this.formImpacto.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
