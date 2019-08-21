import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Projeto } from '../models/projeto.model';
import { ProjetoService } from '../services/projeto.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  formProjeto: FormGroup;
  projeto: Projeto[] = [];
  projetoList: Projeto[] = [];
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private _projetoService: ProjetoService,
    private route: ActivatedRoute,
    private _toastrService: ToastrCenterService,
    private _location: Location
  ) {
    this.formProjeto = this.fb.group({
      cod_servico: ['', Validators.required],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      abrangencia: ['', Validators.required],
      dt_inicio: ['', Validators.required],
      dt_fim: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getProjeto();
    });
  }

  getProjeto(): void {
    this._projetoService.getProjeto().subscribe((dados: any) => {
      this.projetoList = dados;
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formProjeto.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._projetoService.addProjeto(this.formProjeto.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Projeto salvo com sucesso!!', 'SUCESSO');
          this.formProjeto.reset();
          this.formProjeto.markAsPristine();
          this.formProjeto.markAsUntouched();
          this.formProjeto.markAsPending();
        }
      });
    }
  }

  get form() {
    return this.formProjeto.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
