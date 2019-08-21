import { Component, OnInit } from '@angular/core';
import { Divisao } from '../models/divisao.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DivisaoService } from '../services/divisao.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  divisao: Divisao[] = [];
  divisaoList: Divisao[] = [];
  formDivisao: FormGroup;
  submitted = false;



  constructor(
    private _divisaoService: DivisaoService,
    private _toastrService: ToastrCenterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location


  ) {
    this.formDivisao = this.fb.group({
      sigla: ['', Validators.required],
      nome: ['', Validators.required],
      uf: ['', Validators.required],
      especialidade: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getDivisao();
    });
  }


  getDivisao(): void {
    this._divisaoService.getDivisao().subscribe((dados: any) => {
      this.divisaoList = dados;
    });
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formDivisao.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._divisaoService.addDivisao(this.formDivisao.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Projeto salvo com sucesso!!', 'SUCESSO');
          this.formDivisao.reset();
          this.formDivisao.markAsPristine();
          this.formDivisao.markAsUntouched();
          this.formDivisao.markAsPending();
        }
      });
    }
  }

  get form() {
    return this.formDivisao.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
