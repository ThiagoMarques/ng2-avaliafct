import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Divisao } from '../models/divisao.model';
import { DivisaoService } from '../services/divisao.service';
import { ToastrCenterService } from '@serpro-design/angular';



@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  divisao: Divisao[] = [];
  divisaoList: Divisao[] = [];
  formDivisao: FormGroup;
  id_divisao: number;

  constructor(
    private _divisaoService: DivisaoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location

  ) {
    this.formDivisao = this.fb.group({
      sigla: ['', Validators.required],
      nome: ['', Validators.required],
      uf: ['', Validators.required],
      especialidade: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_divisao = params.id;
      this.getDivisao();
      this.getDivisaoId(this.id_divisao);
    });
  }

  getDivisaoId(id: number): void {
    this._divisaoService.getDivisaoId(id).subscribe((dados: any) => {
      this.divisao = dados;
      this.formDivisao.controls['sigla'].setValue(dados.sigla);
      this.formDivisao.controls['nome'].setValue(dados.nome);
      this.formDivisao.controls['uf'].setValue(dados.uf);
      this.formDivisao.controls['especialidade'].setValue(dados.especialidade);
      this.formDivisao.controls['descricao'].setValue(dados.descricao);
    });
  }

  getDivisao(): void {
    this._divisaoService.getDivisao().subscribe((dados: any) => {
      this.divisaoList = dados;
    });
  }

  editarCrud(): void {
    if (this.formDivisao.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._divisaoService
        .updateDivisao(this.id_divisao, this.formDivisao.value)
        .subscribe(data => {
          if (data) {
            this._toastrService.success(
              'Divisao atualizada com sucesso.',
              'SUCESSO!'
            );
            this.formDivisao.reset();
            this.formDivisao.markAsPristine();
            this.formDivisao.markAsUntouched();
            this.formDivisao.markAsPending();
            this.onCancel();
          }
        });
    }
  }

  get form() {
    return this.formDivisao.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
