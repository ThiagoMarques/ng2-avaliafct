import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AtributoService } from '../services/atributo.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  formAtributo = this.fb.group({
    descricao: ['', Validators.required],
    abrangenciaNome: ['', Validators.required],
    complexidadeNome: ['', Validators.required],
    impactoNome: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _abrangenciaService: AtributoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
    });
  }

  onCreate(): void {
    if (this.formAtributo.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._abrangenciaService.addAtributo(this.formAtributo.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Atributo salvo com sucesso!', 'SUCESSO!');
          this.formAtributo.reset();
          this.formAtributo.markAsPristine();
          this.formAtributo.markAsUntouched();
          this.formAtributo.markAsPending();
        }
      });
    }
  }
  get form() {
    return this.formAtributo.controls;
  }
  onCancel(): void {
    this._location.back();
  }

}
