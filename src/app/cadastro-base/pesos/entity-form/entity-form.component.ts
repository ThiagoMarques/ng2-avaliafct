import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { PesosService } from '../../pesos/services/pesos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pesos } from '../models/pesos.model';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  submitted = false;
  formPesos: FormGroup;
  pesos: Pesos[] = [];
  Pesos: Pesos = new Pesos();
  allPesos: any[];
  idResource: any;

  constructor(
    private fb: FormBuilder,
    private _pesosService: PesosService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.formPesos = this.fb.group({
      tipo: ['', Validators.required],
      quantidade: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getListPesos();
    });

  }

  getListPesos() {
    this._pesosService.getPesos().subscribe(dados => {
      this.pesos = dados;
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formPesos.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._pesosService.addPesos(this.formPesos.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Impacto salvo com sucesso!!', 'SUCESSO');
          this.formPesos.reset();
          this.formPesos.markAsPristine();
          this.formPesos.markAsUntouched();
          this.formPesos.markAsPending();
        }
      });
    }
  }


  get form() {
    return this.formPesos.controls;
  }

  onCancel() {
    this._location.back();
  }

}
