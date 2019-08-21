import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { TecnologiaService } from '../services/tecnologia.service';
import { Tecnologia } from '../models/tecnologia.model';
import { ToastrCenterService } from '@serpro-design/angular';

import {SdInputComponent } from '../../../shared/components/sd-input/sd-input.component';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  formTecnologia: FormGroup;
  tecnologia: Tecnologia[] = [];
  submitted = false;

  constructor
  (
    private fb: FormBuilder,
    private _tecnologiaService: TecnologiaService,
    private _location: Location,
    private _toastrService: ToastrCenterService
  ) {
    this.formTecnologia = this.fb.group({
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTecnologia();
  }

  getTecnologia(): void {
    this._tecnologiaService.getTecnologia().subscribe((dados: any) => {
      this.tecnologia = dados;
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formTecnologia.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._tecnologiaService.addTecnologia(this.formTecnologia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Tecnologia salva com sucesso!!', 'SUCESSO');
          this.formTecnologia.reset();
          this.formTecnologia.markAsPristine();
          this.formTecnologia.markAsUntouched();
          this.formTecnologia.markAsPending();
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
