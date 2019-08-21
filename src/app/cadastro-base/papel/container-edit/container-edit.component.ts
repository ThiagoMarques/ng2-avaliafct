import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Papel } from '../models/papel.model';
import { PapelService } from '../services/papel.service';
import { ToastrCenterService } from '@serpro-design/angular';
import { Atributo } from '../../atributo/models/atributo.model';
import { AtributoService } from '../../atributo/services/atributo.service';


@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {

  formPapel: FormGroup;
  papel: Papel[] = [];
  papeis: Papel = new Papel();
  papelList: Papel[] = [];
  listPapel: Papel[] = [];
  submitted = false;
  isOpen = false;
  l_atributo: Atributo[] = [];
  show = false;
  atrPapel: Papel[] = [];
  atributo: FormArray;
  id_papel: number;

  constructor(
    private fb: FormBuilder,
    private _papelService: PapelService,
    private _atributoService: AtributoService,
    private route: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrCenterService
  ) {
    this.formPapel = fb.group({
     tipo: [null, [Validators.required]],
     nome: [null, [Validators.required]],
     atributo: this.fb.array([], Validators.required),
     descricao: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_papel = params.id;
      this.getPapelId(this.id_papel);
      this.getPapel();
      this._papelService.getPapelId(this.id_papel).subscribe(
       papel => {
           this.papeis = papel;
       }
   );
      this._papelService.getAtributoPapel().subscribe(atribts => {
       atribts.forEach(element => {
           this.addIPapelList(element);
       });
   });
      this.getAtributoPapel();
    });
    this.formPapel.get('tipo').valueChanges.subscribe(value => {
     let listaNomePapel: any[];
     this._papelService.getPapel().subscribe(papelList => {
         listaNomePapel = papelList.filter(function (data) {
             return data['tipo'] === value;
         });
         this.listPapel = listaNomePapel;
     });
 });
  }
  getAtributoPapel(): void {
   this._papelService.getAtributoPapel().subscribe(dados => {
     this.atrPapel = dados;
 });
 }
 getPapelList(formPapel) {
  return formPapel.get('atributo').controls;
}
  getPapelId(id: number): void {
    this._papelService.getPapelId(id).subscribe((dados: any) => {
      this.papel = dados;
      this.formPapel.controls['tipo'].setValue(dados.tipo);
      this.formPapel.controls['nome'].setValue(dados.nome);
      this.formPapel.controls['descricao'].setValue(dados.descricao);
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
      this._papelService.updatePapel(this.id_papel, this.formPapel.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Papel salvo com sucesso!!', 'SUCESSO');
          this.formPapel.reset();
          this.formPapel.markAsPristine();
          this.formPapel.markAsUntouched();
          this.formPapel.markAsPending();
          this.onCancel();
        }
      });
    }
  }
  get frmPapeis(): FormArray {
   return this.formPapel.get('atributo') as FormArray;
  }
  addIPapelList(papel): void {
   this.atributo = this.formPapel.get('atributo') as FormArray;
   this.atributo.push(this.createPapelList(papel));
}

  carregaAtributos(atributos: any) {
   this.isOpen = !this.isOpen;
   this.show = !this.show;
   this.frmPapeis.controls.forEach(function (controles, index) {
    if (atributos) {
        atributos.forEach(element => {
            if (controles.get('idAtributo').value === element.id_atributo) {
                controles.get('ativado').setValue(true);
            }
        });
    }
});


 }
 createPapelList(papel): FormGroup {
  return this.fb.group({
      idAtributo: papel.idAtributo,
      descricao: papel.descricao,
      letra: papel.letra,
      ativado: false
  });
}

  onCancel(): void {
    this._location.back();
  }

}
