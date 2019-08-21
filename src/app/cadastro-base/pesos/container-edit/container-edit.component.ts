import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PesosService } from '../../pesos/services/pesos.service';
import { Pesos } from '../models/pesos.model';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  formPesos: FormGroup;
  pesos: Pesos[] = [];
  pesosList: Pesos[] = [];
  id_peso: number;


  constructor(
    private fb: FormBuilder,
    private _pesosService: PesosService,
    private route: ActivatedRoute,
    private _toastrService: ToastrCenterService,
    private _location: Location
  ) {
    this.formPesos = fb.group({
      tipo: ['', Validators.required],
      quantidade: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_peso = params.id;
      this.getPesosId(this.id_peso);
      this.getPesos();
    });
  }

  getPesosId(id: number) {
    this._pesosService.getPesosId(id).subscribe((dados: any) => {
      this.pesos = dados;
      this.formPesos.controls['tipo'].setValue(dados.tipo);
      this.formPesos.controls['quantidade'].setValue(dados.quantidade);
      this.formPesos.controls['valor'].setValue(dados.valor);
      this.formPesos.controls['descricao'].setValue(dados.descricao);
    });

  }

  getPesos() {
    this._pesosService.getPesos().subscribe((dados: any) => {
      this.pesosList = dados;
    });
  }

  editarCrud(): void {
    if (this.formPesos.invalid) {
      this._toastrService.error('Erro, formulário inválido.', 'Erro!');
    } else {
      this._pesosService.updatePesos(this.id_peso, this.formPesos.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Peso atualizado com sucesso!', 'SUCESSO');
          this.formPesos.reset();
          this.formPesos.markAsPristine();
          this.formPesos.markAsUntouched();
          this.formPesos.markAsPending();
          this.onCancel();
        }
      });
    }
  }

  get form() {
    return this.formPesos.controls;
  }

  onCancel(): void {
    this._location.back();
  }


}
