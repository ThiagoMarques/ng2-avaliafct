import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Location } from '@angular/common';

import { DistribuicaoService } from '../services/distribuicao.service';
import { Distribuicao } from '../models/distribuicao.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrCenterService } from '@serpro-design/angular';
import { FaixaService } from '../../distribuicao-faixa/services/faixa.service';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  submitted = false;
  formDistribuicao: FormGroup;

  distribuicaoList: Distribuicao[];
  distribuicao: Distribuicao = new Distribuicao();
  faixaDist: Distribuicao[] = [];
  pontuacaMinimaLc = 0.00;
  diferenca: any;
  listFaixas: FormArray;

  constructor(
    private fb: FormBuilder,
    private _distribuicaoService: DistribuicaoService,
    private _toastrService: ToastrCenterService,
    private router: Router,
    private _faixaService: FaixaService,
    private route: ActivatedRoute,
    private _location: Location
  ) {

    this.formDistribuicao = this.fb.group({
      idDistribuicao: null,
      valor: null,
      pontuacao_minima: null,
      pontuacao_maxima: null,
      diferenca: [null],
      amplitude_faixas: [null],
      qtde_faixas: [null, Validators.required],
      dt_registro: [null],
      listFaixas: this.fb.array([])
    });

  }

  ngOnInit() {



    this.route.params.subscribe(params => {
      const id = params.id;
      // this.getDistribuicao();
      this.getDistribuicaoId(id);
    });

    this._distribuicaoService.getDistribuicao().subscribe(
      distribuicao => {
        // console.log(distribuicao);
        this.faixaDist = distribuicao;
        distribuicao.forEach(fxs => {
          this.formDistribuicao.patchValue({
            idDistribuicao: fxs.id_distribuicao,
            valor: fxs.valor,
            pontuacao_minima: fxs.pontuacao_minima,
            pontuacao_maxima: fxs.pontuacao_maxima,
            qtde_faixas: fxs.qtde_faixas,
            dt_registro: fxs.dt_registro,
          });
        });
        // console.log(distribuicao);
        this.calcularDiferencaPontuacao();
      },
      response => {
        if (response.status === 404) {
          this.router.navigate(['faixa']);
        }
      },
      () => { }
    );

    this.formDistribuicao.get('qtde_faixas').valueChanges.subscribe( /* <- does work */
      changes => {
        // console.log(changes);
        this.calcularAmplitude(false);
      }
    );



  }



  getDistribuicaoId(id: number): void {
    this._distribuicaoService.getDistribuicaoId(id).subscribe((dados: any) => {
      this.distribuicao = dados;
      // console.log(dados);
      this.formDistribuicao.controls['valor'].setValue(dados.valor);
      this.formDistribuicao.controls['pontuacao_minima'].setValue(dados.pontuacao_minima);
      this.formDistribuicao.controls['pontuacao_maxima'].setValue(dados.pontuacao_maxima);
      this.formDistribuicao.controls['qtde_faixas'].setValue(dados.qtde_faixas);
      // this.formDistribuicao.controls['diferenca'].setValue('0');
      // this.formDistribuicao.controls['amplitude_faixas'].setValue(dados.amplitude_faixas);
      // this.formDistribuicao.controls['dt_registro'].setValue(dados.dt_registro);
    });
  }

  getDistribuicao(): void {
    this._distribuicaoService.getDistribuicao().subscribe((dados: any) => {
      this.distribuicaoList = dados;
    });
  }

  editarCrud(): void {
    if (this.formDistribuicao.invalid) {
      this._toastrService.error('Erro formulario inválido.', 'ERRO!');
    } else {
      this._distribuicaoService.addDistribuicao(this.formDistribuicao.value).subscribe((data) => {
        if (data) {
          this._toastrService.success('Distribuição atualizada com sucesso!!', 'SUCESSO');
          this.formDistribuicao.reset();
          this.formDistribuicao.markAsPristine();
          this.formDistribuicao.markAsUntouched();
          this.formDistribuicao.markAsPending();
        }
      });
    }
  }
  calcularDiferencaPontuacao(): void {
    this.pontuacaMinimaLc = this.formDistribuicao.get('pontuacao_minima').value;
    this.diferenca = (this.formDistribuicao.get('pontuacao_maxima').value - this.formDistribuicao.get('pontuacao_minima').value);
    this.formDistribuicao.get('diferenca').setValue(parseFloat(this.diferenca.toFixed(2)));
  }

  calcularAmplitude(opcao: boolean): void {

    const pontMaximaLc: number = this.formDistribuicao.get('pontuacao_maxima').value;
    const pontMinimaLc: number = this.formDistribuicao.get('pontuacao_minima').value;
    const diferenca: number = (pontMaximaLc - pontMinimaLc || 0);
    const qtdefaixas: number = (opcao ? parseFloat(this.distribuicao.qtde_faixas) : this.formDistribuicao.get('qtde_faixas').value);
    const Amplitude: number = (diferenca / qtdefaixas);

    this.formDistribuicao.get('amplitude_faixas').setValue(Amplitude.toFixed(2));
  }

  get form() {
    return this.formDistribuicao.controls;
  }

  addItemFaixa(faixas: Distribuicao): void {
    this.listFaixas = this.formDistribuicao.get('listFaixas') as FormArray;
    this.listFaixas.push(this.createItemFaixa(faixas));
  }

  createItemFaixa(faixas: Distribuicao): FormGroup {
    return this.fb.group({
      limite_inferior: '0.00',
      limite_superior: '0.00',
      pontuacao_referencia: '0.00',
      qtde_pessoas: 0,
      valor_rateio_pessoa: 0,
      percentual: 0,
      TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe: 1,
      TB_DISTRIBUICAO_id_distribuicao: 1
    });
  }

  calculaFaixa(): void {

    const tamanhoFaixa: number = this.formDistribuicao.get('qtde_faixas').value;
    this.faixaDist.forEach(fxs => {
      for (let i = 1; i <= tamanhoFaixa; i++) {
        this.addItemFaixa(fxs);
      }
    });

    this.pontuacaMinimaLc = this.formDistribuicao.get('pontuacao_minima').value;
    this.diferenca = (this.formDistribuicao.get('pontuacao_maxima').value -
      this.formDistribuicao.get('pontuacao_minima').value);

    this.formDistribuicao.get('diferenca').setValue(parseFloat(this.diferenca.toFixed(2)));

    let index = 0;
    const tamanho: number = this.listFaixas.controls.length;
    let limiteSuperiorAnteriorLc = 0.00;
    const pontuacaMinimaLc = this.pontuacaMinimaLc;
    const amplitudeFaixasLc = (this.diferenca / tamanhoFaixa);

    this.listFaixas.controls.forEach(data => {

      index = index + 1;
      const limiteInferiorLc = data.get('limite_inferior');
      const limiteSuperiorLc = data.get('limite_superior');
      const pontReferenciaLc = data.get('pontuacao_referencia');

      if (index === tamanho) {
        limiteInferiorLc.setValue(parseFloat(limiteSuperiorAnteriorLc.toFixed(2)));
        limiteSuperiorLc.setValue(parseFloat(((limiteInferiorLc.value + amplitudeFaixasLc) + 0.01).toFixed(2)));
        pontReferenciaLc.setValue(parseFloat(limiteInferiorLc.value.toFixed(2)));
      } else {
        if (index > 1) {
          limiteInferiorLc.setValue(parseFloat(limiteSuperiorAnteriorLc.toFixed(2)));
          limiteSuperiorLc.setValue(parseFloat((limiteInferiorLc.value + amplitudeFaixasLc).toFixed(2)));
          pontReferenciaLc.setValue(parseFloat((limiteInferiorLc.value + (amplitudeFaixasLc / 2)).toFixed(2)));
        } else {
          limiteInferiorLc.setValue(parseFloat(pontuacaMinimaLc.toFixed(2)));
          limiteSuperiorLc.setValue(parseFloat((pontuacaMinimaLc + amplitudeFaixasLc).toFixed(2)));
          pontReferenciaLc.setValue(parseFloat(limiteSuperiorLc.value.toFixed(2)));
        }
        limiteSuperiorAnteriorLc = parseFloat(limiteSuperiorLc.value.toFixed(2));
      }
    });
  }

  save() {

    const idResource = this.formDistribuicao.get('idDistribuicao').value;
    this.calculaFaixa();

    // Setando a nova data para salvar no banco
    this.formDistribuicao.get('dt_registro').setValue(null);

    // Chamanda para edicao e cadastro no banco
    let result, userValue = this.formDistribuicao.value;
    let atualizar: boolean;

    // console.log('listFaixas.controls.length  ', this.listFaixas.controls.length);

    if (idResource) {
      atualizar = true;
      result = this._distribuicaoService.updateDistribuicao(idResource, userValue);
    } else {
      atualizar = false;
      result = this._distribuicaoService.addDistribuicao(userValue);
    }
    result.subscribe(data => {
      if (atualizar) {
        // this.mensagensHandler.handleSuccess('Distribuição atualizada com sucesso!');
        this._toastrService.success('Distribuição atualizada com sucesso!', 'Sucesso!', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          timeOut: 3000
        });
      } else {
        this._toastrService.success('Distribuição salva com sucesso!!', 'Sucesso!', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          timeOut: 3000
        });
        // this.mensagensHandler.handleSuccess('Distribuição salva com sucesso!');
      }
      this.router.navigate(['/cadastro-avancado/distribuicao/list']);
    }
    );

    this._faixaService.getFaixa().subscribe(
      (value) => {
        // Verificar se existem dados na tabela de faixa
        if (value) {
          // console.log('Requisição retornou resposta');
          // Deleta todas as faixas
          this._faixaService.deleteFaixaAll().subscribe(
            data => {
              if (data) {
                // console.log('Faixas deletadas');
                for (let i = 0; i < this.listFaixas.controls.length; i++) {
                  userValue = this.listFaixas.value[i];
                  this._faixaService.addFaixa(userValue).subscribe(
                    (datas) => {
                      if (datas) {
                        // console.log('Sucesso faixa incluida');
                      }
                    });
                }
              }
            });
        }
      });
  }

  onCancel(): void {
    this._location.back();
  }

}
