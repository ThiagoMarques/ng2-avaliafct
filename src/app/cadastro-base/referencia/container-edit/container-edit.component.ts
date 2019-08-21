import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Referencia } from '../models/referencia.model';
import { ReferenciaService } from '../services/referencia.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  referencia: Referencia[] = [];
  referenciaList: Referencia[] = [];
  formReferencia: FormGroup;
  id_referencia: number;

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
      this.id_referencia = params.id;
      this.getReferenciaId(this.id_referencia);
      this.getReferencia();
    });
  }

  getReferencia(): void {
    this._referenciaService.getReferencia().subscribe((dados: any) => {
      this.referenciaList = dados;
    });
  }

  getReferenciaId(id: number): void {
    this._referenciaService.getReferenciaId(id).subscribe((dados: any) => {
      this.referencia = dados;
      this.formReferencia.controls['cargo'].setValue(dados.cargo);
      this.formReferencia.controls['valor_referencia'].setValue(dados.valor_referencia);
      this.formReferencia.controls['num_referencia'].setValue(dados.num_referencia);
    });
  }

  editarCrud(): void {
    if (this.formReferencia.invalid) {
      this._toastrService.error('Erro, formulário inválido.', 'Erro!');
    } else {
      this._referenciaService.updateReferencia(this.id_referencia, this.formReferencia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Referência atualizado com sucesso!', 'SUCESSO');
          this.formReferencia.reset();
          this.formReferencia.markAsPristine();
          this.formReferencia.markAsUntouched();
          this.formReferencia.markAsPending();
          this.onCancel();
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


