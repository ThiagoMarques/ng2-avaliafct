import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { AbrangenciaService } from '../services/abrangencia.service';
import { Abrangencia } from '../models/abrangencia.model';
import { Atributo } from '../../atributo/models/atributo.model';
import { AtributoService } from '../../atributo/services/atributo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  submitted = false;
  formAbrangencia: FormGroup;

  abrangencia: Abrangencia;
  abrangenciaList: Abrangencia[];

  atributo: Atributo;
  atributoList: Atributo[];
  constructor(
    private fb: FormBuilder,
    private _abrangenciaService: AbrangenciaService,
    private _atributoService: AtributoService,
    private _toastrService: ToastrCenterService,
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
      const id = params.id;
      this.getAbrangencia();
      this.getAtributoId(id);
      this.getAtributo();
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

  onCreate(): void {
    this.submitted = true;
    if (this.formAbrangencia.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._abrangenciaService.addAbrangencia(this.formAbrangencia.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Abrangência salva com sucesso!!', 'SUCESSO');
          this.formAbrangencia.reset();
          this.formAbrangencia.markAsPristine();
          this.formAbrangencia.markAsUntouched();
          this.formAbrangencia.markAsPending();
        }
      });
    }
  }

  get form() {
    return this.formAbrangencia.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
