import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Referencia } from '../models/referencia.model';
import { ReferenciaService } from '../services/referencia.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  referencia: Referencia[] = [];
  formReferencia: FormGroup;
  submitted = false;

  constructor(
    private _referenciaService: ReferenciaService,
    private _toastrService: ToastrCenterService,
    private _location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formReferencia = this.fb.group({
      cargo: ['', Validators.required],
      valor_referencia: ['', Validators.required],
      num_referencia: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getReferencia();
    });
  }

  getReferencia(): void {
    this._referenciaService.getReferencia().subscribe((dados: any) => {
      this.referencia = dados;
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formReferencia.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._referenciaService.addReferencia(this.formReferencia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Referência salvo com sucesso!!', 'SUCESSO');
          this.formReferencia.reset();
          this.formReferencia.markAsPristine();
          this.formReferencia.markAsUntouched();
          this.formReferencia.markAsPending();
        }
      });
    }
  }

  get form() {
    return this.formReferencia.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
