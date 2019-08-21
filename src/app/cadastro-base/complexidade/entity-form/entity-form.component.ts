import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AbrangenciaService } from '../../abrangencia/services/abrangencia.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  submitted = false;
  formComplexidade: FormGroup;



  constructor(
    private fb: FormBuilder,
    private _abrangenciaService: AbrangenciaService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.formComplexidade = this.fb.group({
      atributo: ['', Validators.required],
      classificacao: ['', Validators.required],
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // console.log(params.id);
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formComplexidade.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._abrangenciaService.addAbrangencia(this.formComplexidade.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Complexidade salva com sucesso!!', 'SUCESSO');
          this.formComplexidade.reset();
          this.formComplexidade.markAsPristine();
        }
      });
    }
  }

  get form() {
    return this.formComplexidade.controls;
  }

  onCancel() {
    this._location.back();
  }

}
