import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { Projeto } from '../models/projeto.model';
import { ProjetoService } from '../services/projeto.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  formProjeto: FormGroup;
  projeto: Projeto[] = [];
  projetoList: Projeto[] = [];
  id_projeto: number;

  constructor(
    private fb: FormBuilder,
    private _projetoService: ProjetoService,
    private route: ActivatedRoute,
    private _toastrService: ToastrCenterService,
    private _location: Location,
    private _datepipe: DatePipe
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
      this.id_projeto = params.id;
      this.getProjeto();
      this.getProjetoId(this.id_projeto);
    });
  }

  getProjeto(): void {
    this._projetoService.getProjeto().subscribe((dados: any) => {
      this.projetoList = dados;
    });
  }

  getProjetoId(id: number): void {
    this._projetoService.getProjetoId(id).subscribe((projetos: any) => {
      const { cod_servico, titulo, descricao, abrangencia, dt_inicio, dt_fim } = projetos;
      this.formProjeto.patchValue({
        cod_servico: cod_servico,
        titulo: titulo,
        descricao: descricao,
        abrangencia: abrangencia,
        dt_inicio: this.formataData(dt_inicio),
        dt_fim: this.formataData(dt_fim)
      });
    });
  }

  formataData(data: String) {
    return this._datepipe.transform(data, 'dd-MM-yyyy');
  }

  formataDataAtualizar(data: any) {
    const year = data.substr(4, 5);
    const month = data.substr(2, 2);
    const day = data.substr(0, 2);
    return year + '-' + month + '-' + day;
  }

  editarCrud(): void {
    if (this.formProjeto.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {

      this.formProjeto.patchValue({
        dt_inicio: this.formataDataAtualizar(this.formProjeto.value.dt_inicio),
        dt_fim: this.formataDataAtualizar(this.formProjeto.value.dt_fim)
      });

      this._projetoService
        .updateProjeto(this.id_projeto, this.formProjeto.value)
        .subscribe(data => {
          if (data) {
            this._toastrService.success(
              'Projeto atualizado com sucesso.',
              'SUCESSO!'
            );
            this.formProjeto.reset();
            this.formProjeto.markAsPristine();
            this.formProjeto.markAsUntouched();
            this.formProjeto.markAsPending();
            this.onCancel();
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
