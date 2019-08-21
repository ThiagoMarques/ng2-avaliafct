import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TecnologiaService } from '../services/tecnologia.service';
import { Tecnologia } from '../models/tecnologia.model';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  formTecnologia: FormGroup;
  tecnologia: Tecnologia[] = [];
  tecnologiaList: Tecnologia[] = [];
  submitted = false;
  id_tecnologia: number;

  constructor
  (
    private fb: FormBuilder,
    private _tecnologiaService: TecnologiaService,
    private _location: Location,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute
  ) {
    this.formTecnologia = this.fb.group({
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_tecnologia = params.id;
      this.getTecnologiaId(this.id_tecnologia);
      this.getTecnologia();
    });
  }

  getTecnologia(): void {
    this._tecnologiaService.getTecnologia().subscribe((dados: any) => {
      this.tecnologiaList = dados;
    });
  }

  getTecnologiaId(id: number): void {
    this._tecnologiaService.getTecnologiaId(id).subscribe((dados: any) => {
      this.tecnologia = dados;
      this.formTecnologia.controls['tipo'].setValue(dados.tipo);
      this.formTecnologia.controls['nome'].setValue(dados.nome);
      this.formTecnologia.controls['descricao'].setValue(dados.descricao);
    });
  }

  editarCrud(): void {
    if (this.formTecnologia.invalid) {
      this._toastrService.error('Erro, formulário inválido.', 'Erro!');
    } else {
      this._tecnologiaService.updateTecnologia(this.id_tecnologia, this.formTecnologia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Tecnologia atualizada com sucesso!', 'SUCESSO');
          this.formTecnologia.reset();
          this.formTecnologia.markAsPristine();
          this.formTecnologia.markAsUntouched();
          this.formTecnologia.markAsPending();
          this.onCancel();
        }
      });
    }
  }


  get form() {
    return this.formTecnologia.controls;
  }

  onCancel() {
    this._location.back();
  }

}

