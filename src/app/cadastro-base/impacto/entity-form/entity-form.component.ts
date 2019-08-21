import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AbrangenciaService } from '../../abrangencia/services/abrangencia.service';
import { ActivatedRoute } from '@angular/router';
import { Impacto } from '../models/impacto.model';
import { ImpactoService } from '../services/impacto.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  submitted = false;
  formImpacto: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _abrangenciaService: AbrangenciaService,
    private _impactoService: ImpactoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.formImpacto = this.fb.group({
      atributo: ['', Validators.required],
      classificacao: ['', Validators.required],
      tipo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
    });
  }


  onCreate(): void {
    this.submitted = true;
    if (this.formImpacto.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._abrangenciaService.addAbrangencia(this.formImpacto.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Impacto salvo com sucesso!!', 'SUCESSO');
          this.formImpacto.reset();
          this.formImpacto.markAsPristine();
          this.formImpacto.markAsUntouched();
          this.formImpacto.markAsPending();
        }
      });
    }
  }


  get form() {
    return this.formImpacto.controls;
  }

  onCancel() {
    this._location.back();
  }

}
