import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { DistribuicaoService } from '../services/distribuicao.service';
import { Distribuicao } from '../models/distribuicao.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  submitted = false;
  formDistribuicao: FormGroup;

  distribuicao: Distribuicao[];
  distribuicaoList: Distribuicao[];

  constructor(
    private fb: FormBuilder,
    private _distribuicaoService: DistribuicaoService,
    private _toastrService: ToastrCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
    ) {

      this.formDistribuicao = this.fb.group({
        valor: ['', Validators.required],
        pontuacao_minima: ['', Validators.required],
        pontuacao_maxima: ['', Validators.required],
        qtde_faixas: ['', Validators.required],
        dt_registro: ['', Validators.required]
      });

  }

   ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getDistribuicao();
    });
  }

  getDistribuicao(): void {
    this._distribuicaoService.getDistribuicao().subscribe(
      (dados: any) => {
        this.distribuicao = dados;
      },
      error =>
        this._toastrService.error(
          'Não foi possivel carregar os dados',
          'Erro ao carregar os dados'
        )
    );
  }

  onCreate(): void {
    this.submitted = true;
    if (this.formDistribuicao.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._distribuicaoService.addDistribuicao(this.formDistribuicao.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Distribuição salva com sucesso!!', 'SUCESSO');
          this.formDistribuicao.reset();
          this.formDistribuicao.markAsPristine();
          this.formDistribuicao.markAsUntouched();
          this.formDistribuicao.markAsPending();
        }
      });
    }
  }

  get form() {
    return this.formDistribuicao.controls;
  }

  onCancel(): void {
    this._location.back();
  }

}
