import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Abrangencia } from './../models/abrangencia.model';
import { AbrangenciaService } from '../services/abrangencia.service';
import { Atributo } from '../../atributo/models/atributo.model';
import { AtributoService } from '../../atributo/services/atributo.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { LoginService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  formAbrangencia: FormGroup;
  abrangencia: Abrangencia;
  abrangenciaList: Abrangencia[];
  atributo: Atributo;
  atributoList: Atributo[];
  id_abrangencia: number;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private _abrangenciaService: AbrangenciaService,
    private _atributoService: AtributoService,
    private _toastrService: ToastrCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
    ) {

      this.formAbrangencia = this.fb.group({
        tipo: ['', Validators.required],
        atributo: ['', Validators.required],
        classificacao: ['', Validators.required],
        descricao: ['', Validators.required],
        nome: ['', Validators.required]
      });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_abrangencia = params.id;
      this.getAbrangenciaId(this.id_abrangencia);
      this.getAbrangencia();
      this.getAtributoId(this.id_abrangencia);
      this.getAtributo();
    });
  }

  getAbrangenciaId(id: number): void {
    this._abrangenciaService.getAbrangenciaId(id).subscribe((dados: any) => {
      this.abrangencia = dados;
      this.formAbrangencia.controls['tipo'].setValue(dados.tipo);
      this.formAbrangencia.controls['atributo'].setValue(dados.atributo);
      this.formAbrangencia.controls['classificacao'].setValue(dados.classificacao);
      this.formAbrangencia.controls['descricao'].setValue(dados.descricao);
      this.formAbrangencia.controls['nome'].setValue(dados.nome);
    });
  }

  getAbrangencia(): void {
    this._abrangenciaService.getAbrangencia().subscribe((dados: any) => {
      this.abrangenciaList = dados;
    });
  }

  getAtributoId(id: number): void {
    this._atributoService.getAtributoId(id).subscribe((dados: any) => {
      this.atributo = dados;
    });
  }

  getAtributo(): void {
    this._atributoService.getAtributo().subscribe((dados: any) => {
      this.atributoList = dados;
    });
  }

  editarCrud(): void {
    if (this.formAbrangencia.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._abrangenciaService.updateAbrangencia(this.id_abrangencia, this.formAbrangencia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Abrangência atualizada com sucesso!!', 'SUCESSO');
          this.formAbrangencia.reset();
          this.formAbrangencia.markAsPristine();
          this.formAbrangencia.markAsUntouched();
          this.formAbrangencia.markAsPending();
          this.onCancel();
        }
      });
    }
  }

  get form() {
    return this.formAbrangencia.controls;
  }

  onCancel() {
    this._location.back();
  }
}
