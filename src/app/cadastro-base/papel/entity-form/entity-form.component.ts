import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Papel } from '../models/papel.model';
import { PapelService } from '../services/papel.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { AtributoService } from '../../atributo/services/atributo.service';
import { Atributo } from '../../atributo/models/atributo.model';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {

  formPapel: FormGroup;
  papel: Papel[] = [];
  papeis: Papel = new Papel();
  papelList: Papel[] = [];
  atrPapel: Papel[] = [];
  submitted = false;
  _toastr: any;
  formAtributo: FormArray;

  isOpen = false;
  atributo: Atributo[] = [];
  show = false;


  constructor(
    private fb: FormBuilder,
    private _papelService: PapelService,
    private _atributoService: AtributoService,
    private route: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrCenterService,
  ) {
    this.formPapel = fb.group({
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      formAtributo: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getPapelId(id);
      this.getPapel();
      this.getAtributoPapel();
    });
  }

  getAtributoPapel(): void {
    this._papelService.getAtributoPapel().subscribe(dados => {
      this.atrPapel = dados;
  });
  }

  getPapelId(id: number): void {
    this._papelService.getPapelId(id).subscribe((dados: any) => {
      this.papel = dados;
    });
  }

  getPapel(): void {
    this._papelService.getPapel().subscribe((dados: any) => {
      this.papelList = dados;
    });
  }

  get form() {
    return this.formPapel.controls;
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formPapel.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._papelService.addPapel(this.formPapel.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Papel salvo com sucesso!!', 'SUCESSO');
          this.formPapel.reset();
          this.formPapel.markAsPristine();
          this.formPapel.markAsUntouched();
          this.formPapel.markAsPending();
        }
      });
    }
  }

  carregaAtributos(atributos: any) {
    this.isOpen = !this.isOpen;
    this.show = !this.show;

  }


  onCancel(): void {
    this._location.back();
  }

}
