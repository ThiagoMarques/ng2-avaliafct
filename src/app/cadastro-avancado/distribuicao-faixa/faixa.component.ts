import { Component, TemplateRef, OnInit } from '@angular/core';
import { Distribuicao } from '../distribuicao-valor/models/distribuicao.model';
import { DistribuicaoService } from '../distribuicao-valor/services/distribuicao.service';
import { ToastrCenterService, LoadingCenterService } from '@serpro-design/angular';
import { Faixa } from './models/faixa.model';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Referencia } from 'src/app/cadastro-base/referencia/models/referencia.model';
import { ReferenciaService } from 'src/app/cadastro-base/referencia/services/referencia.service';
import { Router } from '@angular/router';
import { FaixaService } from './services/faixa.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-faixa',
  templateUrl: './faixa.component.html',
  styleUrls: ['./faixa.component.scss']
})
export class FaixaComponent implements OnInit {
  formFaixa: FormGroup;
    title: string;
    faixa: Faixa;
    faixaList: Faixa[] = [];
    idResource: string;
    distribuicao: Distribuicao[] = [];
    referencia: Referencia[] = [];
    qtdePessoas = 0;
    listFaixas: FormArray;
    mostraMensagem: boolean;

  constructor(
    private _distribuicaoService: DistribuicaoService,
    private _referenciaService: ReferenciaService,
    private _toastrService: ToastrCenterService,
    private _loadingService: LoadingCenterService,
    private _faixaService: FaixaService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.mostraMensagem = false;

    this.formFaixa = this.fb.group({
        referencia_fct: [],
        percentual_fixo: [],
        valorDistribuicao: '',
        percentualFixo: [],
        vlrReferencia: null,
        assumirPercCalculado: false,
        listFaixas: this.fb.array([])
    });

    this.getPessoasFaixaTotal();
    this.getDistribuicao();

    this._faixaService.getFaixa().subscribe(
        faixas => {
            this.faixaList = faixas;
            faixas.forEach(fxs => {
                this.addItemFaixa(fxs);
            });

        },
        response => {
            if (response.status === 404) {
                this.router.navigate(['faixa']);
            }
        },
        () => {

            let vrRateioSomadoFaixa = 0;
            let qtdPessoasCalculado = (this.qtdePessoas || 0);
            if (this.listFaixas) {
                this.listFaixas.controls.forEach(function (data) {

                    const vlrPercentCalculadoLc = data.get('percentualCalculado');
                    const vlrQtdePessoasFaixaLc = data.get('qtdePessoasFaixa');
                    const vlrQtdePessoasTotalLc = data.get('qtdePessoasTotal');
                    const vlrTotalCalculadoLc = data.get('valorTotalCalculado');
                    const vlrDistribuicaoLc = data.get('valorDistribuicao');
                    const vlrRateioPessoaCalculadoLc = data.get('valorRateioPessoaCalculado');
                    const vlrRateioSomadoFaixaLc = data.get('valorRateioSomadoFaixa');

                    vlrPercentCalculadoLc.setValue(parseFloat(((vlrQtdePessoasFaixaLc.value /
                        vlrQtdePessoasTotalLc.value) * 100).toFixed(2)));
                    vlrTotalCalculadoLc.setValue(parseFloat(((vlrDistribuicaoLc.value) *
                        (vlrPercentCalculadoLc.value / 100)).toFixed(2)) || 0);
                    vlrRateioPessoaCalculadoLc.setValue(parseFloat((vlrTotalCalculadoLc.value / qtdPessoasCalculado).toFixed(2)) || 0);
                    vrRateioSomadoFaixa = ((vrRateioSomadoFaixa + parseFloat(vlrRateioPessoaCalculadoLc.value)) || 0);
                    vlrRateioSomadoFaixaLc.setValue((vrRateioSomadoFaixa).toFixed(2));
                    qtdPessoasCalculado = (qtdPessoasCalculado - parseFloat(vlrQtdePessoasFaixaLc.value));
                });
            }
        }
    );

    // carga dos Dados complementares
    this.getReferencia();

    this.formFaixa.get('listFaixas').valueChanges.pipe(
      debounceTime(400)
    )
    .subscribe(value => { this.calculaValores(); });
}

getPessoasFaixaTotal(): void {

    this._faixaService.getFaixa().subscribe(
        faixas => {
            faixas.forEach(fxs => {
                this.qtdePessoas = (this.qtdePessoas + parseFloat(fxs.qtde_pessoas));
            });
        }
    );
}

getListaFaixas(formFaixas): FormControl {
    return formFaixas.get('listFaixas').controls;
}

addItemFaixa(faixas: Faixa): void {
    this.listFaixas = this.formFaixa.get('listFaixas') as FormArray;
    this.listFaixas.push(this.createItemFaixa(faixas));
    this.listFaixas.disable();
}

createItemFaixa(faixas: Faixa): FormGroup {
    return this.fb.group({
        id_faixa: faixas.id_faixa,
        limite_inferior: faixas.limite_inferior,
        limite_superior: faixas.limite_superior,
        pontuacao_referencia: faixas.pontuacao_referencia,
        percentualFixo: '00',
        valorTotalFixo: '0.00',
        valorRateioPessoa: '0.00',
        valorRateioSomado: '0.00',
        percentualCalculado: '00',
        valorTotalCalculado: '0.00',
        valorRateioPessoaCalculado: '0.00',
        valorRateioSomadoFaixa: '0.00',
        qtdePessoasTotal: this.qtdePessoas,
        qtdePessoasFaixa: faixas.qtde_pessoas,
        valorDistribuicao: this.formFaixa.get('valorDistribuicao').value
    });
}

adicionarFaixa() {

    // tslint:disable-next-line:prefer-const
    let result, faixaValue = this.formFaixa.value;
    const arrayFaixa: any[] = this.formFaixa.get('listFaixas').value;
    const refFctPontuaMinima = this.formFaixa.get('vlrReferencia').value;
    let quantidadeDePessoas, valorRateioPessoa, percentual: string;
    let objFaixa: Faixa;

    // Percorrendo as faixas
    arrayFaixa.forEach(fxs => {

        if (faixaValue.assumirPercCalculado) {
            quantidadeDePessoas = fxs.qtdePessoasFaixa;
            valorRateioPessoa = fxs.valorRateioSomado;
            percentual = fxs.percentualFixo;
        } else {
            quantidadeDePessoas = fxs.qtdePessoasFaixa;
            valorRateioPessoa = fxs.valorRateioSomadoFaixa;
            percentual = fxs.percentualCalculado;
        }

        objFaixa = new Faixa(
            fxs.limite_inferior,
            fxs.limite_superior,
            fxs.pontuacao_referencia,
            quantidadeDePessoas,
            valorRateioPessoa,
            percentual,
            refFctPontuaMinima,
            this.distribuicao[0].id_distribuicao
        );

        result = this._faixaService.updateFaixa(fxs.id_faixa, objFaixa);
        result.subscribe(data => {
            this._toastrService.success('Faixa atualizada com sucesso!', 'Sucesso!', {
                progressBar: true,
                progressAnimation: 'increasing',
                closeButton: true,
                timeOut: 3000
            });
        });
    });
}

getDistribuicao() {

    this._distribuicaoService.getDistribuicao().subscribe(
        distribuicao => {
            distribuicao.forEach(distVlr => {
                this.formFaixa.get('valorDistribuicao').setValue(distVlr.valor);
                this.formFaixa.get('vlrReferencia').setValue(distVlr.referencia_fct);
            });
            this.distribuicao = distribuicao;
        },
        error => {
            console.log(error);
            this.mostraMensagem = true;
        });
}

getReferencia() {
    this._referenciaService.getReferencia().subscribe(referencia => this.referencia = referencia);

}

calculaValores(): void {
    let vrRateioFixoFaixa = 0;
    let totalPercFixo = 0;
    let qtdPessoasFixo = this.qtdePessoas;
    const tamanho = this.listFaixas.length;
    let index = 0;

    this.listFaixas.controls.forEach(function (data) {

        const vlrTotalFixoLc = data.get('valorTotalFixo');
        const vlrDistribuicaoLc = data.get('valorDistribuicao').value;
        const vlrPercentFixoLc = data.get('percentualFixo');
        const vlrRateioPessoa = data.get('valorRateioPessoa');
        const vlrRateioSomado = data.get('valorRateioSomado');
        const qtdePessoasFaixa = data.get('qtdePessoasFaixa');

        index = index + 1;
        totalPercFixo = (totalPercFixo + parseFloat(vlrPercentFixoLc.value));

        if (totalPercFixo > 100) {
            if (index === tamanho) {
                totalPercFixo = (totalPercFixo - vlrPercentFixoLc.value);
                totalPercFixo = (100 - totalPercFixo);
                if (totalPercFixo < 10) {
                    vlrPercentFixoLc.setValue('0' + totalPercFixo);
                } else {
                    vlrPercentFixoLc.setValue(totalPercFixo);
                }
            } else {
                totalPercFixo = 100 - (totalPercFixo - vlrPercentFixoLc.value);
                if (totalPercFixo < 10) {
                    vlrPercentFixoLc.setValue('0' + totalPercFixo);
                } else {
                    vlrPercentFixoLc.setValue(totalPercFixo);
                }
                totalPercFixo = 100;
            }
        }

        vlrTotalFixoLc.setValue(((parseFloat((vlrDistribuicaoLc) || 0) * (vlrPercentFixoLc.value / 100)).toFixed(2)) || 0);
        vlrRateioPessoa.setValue(parseFloat((vlrTotalFixoLc.value / qtdPessoasFixo).toFixed(2)) || 0);
        vrRateioFixoFaixa = (parseFloat(vrRateioFixoFaixa + vlrRateioPessoa.value) || 0);
        vlrRateioSomado.setValue((vrRateioFixoFaixa).toFixed(2));
        qtdPessoasFixo = (qtdPessoasFixo - parseFloat(qtdePessoasFaixa.value));
    });
}

habDesCamposPercent(): void {
    this.listFaixas.enabled ? this.listFaixas.disable() : this.listFaixas.enable();
}

onCancel() {
    this.navigateBack();
}

private navigateBack() {
    this.router.navigate(['/']);
}
}
