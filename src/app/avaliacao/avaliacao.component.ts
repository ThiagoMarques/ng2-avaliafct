import { Component, OnInit, TemplateRef } from '@angular/core';

import { NgOption } from '@ng-select/ng-select';

import { PapelService } from '../cadastro-base/papel/services/papel.service';
import { Papel } from '../cadastro-base/papel/models/papel.model';
import { TecnologiaService } from '../cadastro-base/tecnologia/services/tecnologia.service';
import { Tecnologia } from '../cadastro-base/tecnologia/models/tecnologia.model';
import { Divisao } from '../cadastro-base/divisao/models/divisao.model';
import { DivisaoService } from '../cadastro-base/divisao/services/divisao.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ColaboradorService } from '../cadastro-base/colaborador/services/colaborador.service';
import { Colaborador } from '../cadastro-base/colaborador/models/colaborador.model';
import { Projeto } from '../cadastro-base/projeto/models/projeto.model';
import { ProjetoService } from '../cadastro-base/projeto/services/projeto.service';
import { ReferenciaService } from '../cadastro-base/referencia/services/referencia.service';
import { PesosService } from '../cadastro-base/pesos/services/pesos.service';
import { Pesos } from '../cadastro-base/pesos/models/pesos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Avaliacao } from './models/avaliacao.model';
import { ToastrCenterService } from '@serpro-design/angular';
import { AvaliacaoService } from './services/avaliacao.service';
import { AtributoColaboradorService } from './AtributoColaborador.service';
import { AtributoColaborador } from './AtributoColaborador.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  formAvaliacao: FormGroup;
  divisao: Divisao[] = [];
  Divisao: Divisao[] = [];
  colaborador: Colaborador[] = [];
  Colaborador: Colaborador[] = [];
  papel: Papel[] = [];
  projeto: NgOption[] = [];
  arrayTempProjeto: NgOption[] = [];
  auxProj = [];
  pesos: Pesos[] = [];
  tecnologia: Tecnologia[] = [];
  vlrTotal: number;
  vlrAtributo = 0;
  vlrTecnologia = 0;
  vlrProjetos = 0;
  vlrFCTatual: 0.0;
  vlrOciosidade = 0;
  vlrAjuste = 0.0;
  qtdTecnologia = 0;
  calculoReferencia: number;
  percAjuste = 0;
  percAjuste2 = 0;
  percAjusteBarra = '';
  classeCss1 = 'badge bg-green text-white';
  statusBarra1 = 'success';
  valorFCTPontuacaoTotal: any;
  idAtributo: any;
  papelValidacao: boolean;
  PapelAtributo: any[] = [];
  isOpen_atributo = true;
  show_atributo = true;
  isOpen_projeto = true;
  show_projeto = true;
  tecnologiaValidacao: boolean;
  valuePapel: string[];
  items: FormArray;
  itemsAtributo: FormArray;
  enable_button: boolean;
  cont_projetos = 0;
  selectedProj = false;
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private _avaliacaoService: AvaliacaoService,
    private _divisaoService: DivisaoService,
    private _colaboradorService: ColaboradorService,
    private _papelService: PapelService,
    private _referenciaService: ReferenciaService,
    private _tecnologiaService: TecnologiaService,
    private _projetoService: ProjetoService,
    private _pesosService: PesosService,
    private _toastrService: ToastrCenterService,
    private _atributoColaboradorService: AtributoColaboradorService,
    private router: Router,
    private _modalService: BsModalService
  ) {
    this.formAvaliacao = this.fb.group({
      divisao: ['', Validators.required],
      colaborador: ['', Validators.required],
      papel: [null, Validators.compose([Validators.required])],
      tecnologia: [0, Validators.compose([Validators.required])],
      Projeto: [0],
      items: this.fb.array([]),
      itemsAtributo: this.fb.array([]),
      qtdProjetos: [0],
      vlrPtTotal: 0.0,
      ociosidade: [''],
      vlrFCTatual: 0.0,
      valorReferenciaFct: 0.0,
      ajuste: 0.0,
      referenciaFctAtual: '',
      FCTPontuacaoTotal: ''
    });
  }
  ngOnInit() {
    this.enable_button = false;
    this.formAvaliacao.get('vlrPtTotal').setValue('0.00');

    this.getDivisao();
    this.getProjeto();
    this.getPesos();

    this.formAvaliacao.get('divisao').valueChanges.subscribe(divisao => {
      let colabFilter: any[];
      this._colaboradorService.getColaborador().subscribe(colaborador => {
        colabFilter = colaborador.filter(function(el) {
          return el['sigla'] === divisao.sigla;
        });

        this.Colaborador = colabFilter;
        this.getPapel();
        this.enable_button = true;
        this.getTecnologia();
      });
    });

    // Valor Total
    this.formAvaliacao
      .get('vlrPtTotal')
      .valueChanges.subscribe(dataVlrTotal => {
        let valorAnterior = 0;
        let valorX = 0;
        this._referenciaService.getReferencia().subscribe(data => {
          data.forEach(dadosReferencia => {
            const valorA: number = this.formAvaliacao.get('vlrFCTatual').value;
            const valorB: number = this.formAvaliacao.get('colaborador').value
              .valorReferenciaFct;
            const valorC: number = dataVlrTotal;
            let vlrValorFct = '';

            valorX = valorB * valorC;
            valorX = valorX / valorA;

            if (
              dadosReferencia.cargo ===
              this.formAvaliacao.get('colaborador').value.cargo
            ) {
              if (valorAnterior === 0) {
                vlrValorFct =
                  dadosReferencia.num_referencia +
                  ' - ' +
                  dadosReferencia.cargo +
                  ' (R$ ' +
                  dadosReferencia.valor_referencia +
                  ')';
                this.formAvaliacao
                  .get('FCTPontuacaoTotal')
                  .setValue(vlrValorFct);

                this.valorFCTPontuacaoTotal = dadosReferencia.num_referencia;

                valorAnterior = 1;
              } else if (
                valorX > parseFloat(dadosReferencia.valor_referencia)
              ) {
                vlrValorFct =
                  dadosReferencia.num_referencia +
                  ' - ' +
                  dadosReferencia.cargo +
                  ' (R$ ' +
                  dadosReferencia.valor_referencia +
                  ')';
                this.formAvaliacao
                  .get('FCTPontuacaoTotal')
                  .setValue(vlrValorFct);
                this.valorFCTPontuacaoTotal = dadosReferencia.num_referencia;
              }
            }
          });
        });
      });
  }
  // Modal
  openModal(msg: TemplateRef<any>) {
    this.modalRef = this._modalService.show(msg, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
    // this.removeArrayProject();
  }

  getDivisao() {
    this._divisaoService.getDivisao().subscribe(divisao => {
      this.Divisao = divisao;
    });
  }
  getColaborador(): void {
    this._colaboradorService.getColaborador().subscribe((data: any) => {
      this.colaborador = data;
    });
  }
  getPapel(): void {
    this._papelService.getPapel().subscribe((data: any) => {
      this.papel = data;
    });
  }
  getPesos(): void {
    this._pesosService.getPesos().subscribe((data: any) => {
      this.pesos = data;
    });
  }

  getTecnologia(): void {
    this._tecnologiaService.getTecnologia().subscribe((data: any) => {
      this.tecnologia = data;
    });
  }

  getProjeto(): void {
    this._projetoService
      .getProjeto()
      .subscribe(
        data => {
          this.projeto = data;
          // this.arrayProjeto = this.projeto;
        },
        error => console.log('Erro encontrado: ', error)
      );
  }

  // selectArrayProject(item): void {
  //   const deleteItem = item.controls['Projetos'].value;
  //   this.projeto = this.projeto.filter(dados => {
  //     if (dados.id_projeto !== deleteItem) {
  //       return dados;
  //     }

  //     if (dados.id_projeto === deleteItem) {
  //       const indice = this.arrayTempProjeto.findIndex(val => val['id_projeto'] === deleteItem);
  //       if (indice < 0) { this.arrayTempProjeto.push(dados); }
  //     }
  //   });
  //   console.log('Dados do arrayTemporario e projetos: ', this.arrayTempProjeto);
  //   item.controls['Projetos'].disable();
  // }

  get form() {
    return this.formAvaliacao.controls;
  }

  changePapel() {
    this.idAtributo = this.formAvaliacao.get('papel').value;
    this._avaliacaoService
      .getPapelAtributo(this.idAtributo[0])
      .subscribe((data: any) => {});
    const strValida: string[] = this.idAtributo;
    if (strValida.length === 0) {
      this.papelValidacao = true;
    } else {
      this.papelValidacao = false;
    }
    this.vlrAtributo = 0;
    this.idAtributo.forEach(element => {
      this._avaliacaoService.getPapelAtributo(element).subscribe(data => {
        if (data !== []) {
          data.forEach(arrayPush => {
            const letra = arrayPush['letra'];
            const vlrRepetido = this.PapelAtributo.find(
              result => result.letra === letra
            )
              ? true
              : false;
            if (!vlrRepetido) {
              this.PapelAtributo.push(arrayPush);
              this.addItemAtributo(arrayPush);
              this.items.controls.sort(function(a, b) {
                if (a.value.letra < b.value.letra) {
                  return -1;
                } else if (a.value.letra > b.value.letra) {
                  return 1;
                } else {
                  return 0;
                }
              });
              this.somaValores('atributo');
            }
          });
        }
      });
    });
  }

  addItem(): void {
    this.items = this.formAvaliacao.get('items') as FormArray;
    this.items.push(this.createItem());
    // console.log('items:', this.formAvaliacao.value);
    this.formAvaliacao.get('qtdProjetos').setValue(this.items.length);
  }

  excluiTodosProjetos() {
    this.formAvaliacao.controls['items'] = this.fb.array([]);
    this.somaValores('projeto');
    this.habilitaBotaoProjetos();

    this.cont_projetos = 0;
    this.arrayTempProjeto = [];
    this.modalRef.hide();
    // console.log(this.arrayTempProjeto);
  }

  excluiProjeto(index: number, item: any) {

    const addItemIndex = item.controls['Projetos'].value;
    this.arrayTempProjeto.filter(dados => {
      if (dados['id_projeto'] === addItemIndex) {
        const indice = this.projeto.findIndex(val => val['id_projeto'] === addItemIndex);
        if (indice < 0) { this.projeto.push(dados); }
      }
    });

    this.removeProjeto(index);
    this.somaValores('projeto');
    this.habilitaBotaoProjetos();

    this.cont_projetos = this.cont_projetos - 1;
    this.modalRef.hide();
    // console.log('Resultado: ', this.arrayTempProjeto);
  }

  habilitaBotaoProjetos(): void {
    if (this.cont_projetos > 5) {
      this.enable_button = !this.enable_button;
    }
  }

  removeProjeto(index: number) {
    if (index > 6) {
      this.formAvaliacao.controls['items'] = this.fb.array([]);
    } else {
      this.items = this.formAvaliacao.get('items') as FormArray;
      this.items.removeAt(index);
    }
  }

  createItem(): FormGroup {
   return this.fb.group({
       Abrangencia: 1,
       Complexidade: 1,
       Impacto: 1,
       Projetos: [[]]
   });
}
  addItemAtributo(atributo): void {
    this.items = this.formAvaliacao.get('itemsAtributo') as FormArray;
    this.items.push(this.createItemAtributo(atributo));
  }

  createItemAtributo(atributo): FormGroup {
    return this.fb.group({
      Abrangencia: [1, Validators.required],
      Complexidade: [1, Validators.required],
      Impacto: [1, Validators.required],
      letra: atributo.letra,
      idAtributo: atributo.id_atributo,
      descricao: atributo.descricao,
      descricaoAbrangencia1: atributo.descricaoAbrangencia1,
      descricaoAbrangencia2: atributo.descricaoAbrangencia2,
      descricaoAbrangencia3: atributo.descricaoAbrangencia3,
      descricaoComplexidade1: atributo.descricaoComplexidade1,
      descricaoComplexidade2: atributo.descricaoComplexidade2,
      descricaoComplexidade3: atributo.descricaoComplexidade3,
      descricaoImpacto1: atributo.descricaoImpacto1,
      descricaoImpacto2: atributo.descricaoImpacto2,
      descricaoImpacto3: atributo.descricaoImpacto3
    });
  }
  getItemsAtributo(formAvaliacao) {
    return formAvaliacao.get('itemsAtributo').controls;
  }
  getResetarAtributo(valor) {
    this.PapelAtributo = [];
    this.clearArray();
    this.somaValores('atributo');
  }
  clearArray() {
    this.formAvaliacao.controls['itemsAtributo'] = this.fb.array([]);
  }
  getItems(formAvaliacao) {
    return formAvaliacao.get('items').controls;
  }
  onCancel(): void {
    this.percAjuste = 0;
    this.percAjusteBarra = '0';
    this.formAvaliacao.controls['ajuste'].setValue('0.00');
    this.formAvaliacao.controls['papel'].setValue([]);
    this.formAvaliacao.controls['divisao'].setValue([]);
    this.formAvaliacao.controls['tecnologia'].setValue([]);
    this.formAvaliacao.controls['colaborador'].setValue([]);
    this.formAvaliacao.controls['itemsAtributo'] = this.fb.array([]);
    this.formAvaliacao.controls['items'] = this.fb.array([]);
    this.formAvaliacao.controls['vlrFCTatual'].setValue('0.00');
    this.formAvaliacao.controls['vlrPtTotal'].setValue('0.00');
    this.formAvaliacao.controls['referenciaFctAtual'].setValue('');
    this.formAvaliacao.controls['FCTPontuacaoTotal'].setValue('');
  }

  hide_atributo(): boolean {
    this.isOpen_atributo = !this.isOpen_atributo;
    return (this.show_atributo = !this.show_atributo);
  }
  hide_projeto(): boolean {
    this.isOpen_projeto = !this.isOpen_projeto;
    return (this.show_projeto = !this.show_projeto);
  }
  somaValores(tipo: string) {
    this.vlrTotal = parseFloat(this.formAvaliacao.get('vlrPtTotal').value);
    switch (tipo) {
      case 'atributo': {
        let QtdPapeis = 0;
        this.valuePapel = this.formAvaliacao.get('papel').value;
        QtdPapeis = this.valuePapel.length;
        this.somaAtributos();
        this.pesos.forEach(pesos => {
          if (
            pesos.tipo === 'Papel' &&
            parseInt(pesos.quantidade, 0) === QtdPapeis
          ) {
            this.vlrAtributo = this.vlrAtributo * pesos.valor;
          }
        });
        break;
      }
      case 'tecnologia': {
        this.vlrTecnologia = this.qtdTecnologia;
        this.pesos.forEach(pesos => {
          if (
            pesos.tipo === 'Tecnologia' &&
            parseInt(pesos.quantidade, 0) === this.qtdTecnologia
          ) {
            this.vlrTecnologia = this.qtdTecnologia * pesos.valor;
          }
        });
        break;
      }
      case 'projeto': {
        let QtdProjetos = 0;
        QtdProjetos = this.formAvaliacao.get('qtdProjetos').value;
        this.somaProjetos();
        this.pesos.forEach(pesos => {
          if (
            pesos.tipo === 'Projeto' &&
            parseInt(pesos.quantidade, 0) === QtdProjetos
          ) {
            this.vlrProjetos = this.vlrProjetos * pesos.valor;
          }
        });
        break;
      }
      case 'ociosidade': {
        const frmOciosidade = this.formAvaliacao.get('ociosidade').value || 0.0;
        this.vlrOciosidade = frmOciosidade / 100;
        break;
      }
      case 'fctatual': {
        // Pontuação FCT Atual
        const pontuacao1 = (
          this.formAvaliacao.get('colaborador').value.pontuacao_inicial || 1
        ).toFixed(2);
        const valor1 = (
          this.formAvaliacao.get('colaborador').value.valorFctInicial || 1
        ).toFixed(2);
        const valor2 = (
          this.formAvaliacao.get('colaborador').value.valorReferenciaFct || 1
        ).toFixed(2);

        // Cálculo Pontuação de Referência
        const calculoReferencia = ((pontuacao1 * valor2) / valor1).toFixed(2);
        this.formAvaliacao.get('vlrFCTatual').setValue(calculoReferencia);

        // Referencia FCT Atual | %
        const {
          valorReferenciaFct,
          ref_fct_atual,
          cargo
        } = this.formAvaliacao.get('colaborador').value; // desestruturação de objeto
        const referenciaFctAtual =
          ref_fct_atual + ' - ' + cargo + ' (R$ ' + valorReferenciaFct + ')';
        this.formAvaliacao
          .get('referenciaFctAtual')
          .setValue(referenciaFctAtual);

        break;
      }
    }
    this.vlrTotal = this.vlrAtributo + this.vlrTecnologia + this.vlrProjetos;
    this.vlrTotal = this.vlrTotal - this.vlrTotal * this.vlrOciosidade;
    this.formAvaliacao.get('vlrPtTotal').setValue(this.vlrTotal.toFixed(2));

    this.vlrAjuste =
      this.calculoReferencia - this.formAvaliacao.get('vlrPtTotal').value;
    this.formAvaliacao.get('ajuste').setValue(this.vlrAjuste.toFixed(2));

    this.vlrTotal = this.vlrAtributo + this.vlrTecnologia + this.vlrProjetos;
    this.vlrTotal = this.vlrTotal - this.vlrTotal * this.vlrOciosidade;
    this.formAvaliacao.get('vlrPtTotal').setValue(this.vlrTotal.toFixed(2));

    // Ajuste
    this.vlrAjuste =
      this.formAvaliacao.get('vlrFCTatual').value -
      this.formAvaliacao.get('vlrPtTotal').value;
    this.formAvaliacao.get('ajuste').setValue(this.vlrAjuste.toFixed(2));

    this.percAjuste =
      (this.formAvaliacao.get('vlrFCTatual').value /
        this.formAvaliacao.get('vlrPtTotal').value) *
      100;
    this.percAjuste = this.percAjuste - 100;
    // Percentual Ajuste
    if (this.vlrAjuste < 0) {
      this.classeCss1 = 'badge bg-red text-white';
      this.statusBarra1 = 'danger';
      this.percAjuste2 = this.percAjuste * -1;
      this.percAjusteBarra = this.percAjuste2.toFixed(2) + '%';
    } else {
      this.classeCss1 = 'badge bg-green text-white';
      this.statusBarra1 = 'success';
      if (this.percAjuste > 100) {
        this.percAjuste = 100;
      } else if (isNaN(this.percAjuste)) {
        this.percAjuste = 0;
      }

      this.percAjusteBarra = this.percAjuste.toFixed(2);
    }
  }
  associarColaboradorAtributo(formAvaliacao: any, maxId: any): any {
    let AssociaAtributo: AtributoColaborador;
    formAvaliacao.itemsAtributo.forEach(element => {
      this._avaliacaoService
        .getBuscaAtributo(
          element.Abrangencia,
          element.Complexidade,
          element.Impacto,
          element.letra
        )
        .subscribe(dataAtributo => {
          if (dataAtributo) {
            console.log(
              '************ RESULTADO: ******************: ',
              dataAtributo
            );
            AssociaAtributo = {
              TB_COLABORADOR_id_colaborador:
                formAvaliacao.colaborador.idColaborador,
              TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
                formAvaliacao.colaborador.id_referencia_fct_gfe,
              TB_COLABORADOR_TB_DIVISAO_id_divisao:
                formAvaliacao.divisao.id_divisao,
              TB_ATRIBUTO_id_atributo: dataAtributo['id_atributo'],
              TB_ATRIBUTO_TB_ABRANGENCIA_id_abrangencia:
                dataAtributo['id_abrangencia'],
              TB_ATRIBUTO_TB_COMPLEXIDADE_id_complexidade:
                dataAtributo['id_complexidade'],
              TB_ATRIBUTO_TB_IMPACTO_id_impacto: dataAtributo['id_impacto'],
              TB_RESULTADO_id_resultado: maxId // [Buscar o último ID da tabela TB_RESULTADO +1]
            };
            this._atributoColaboradorService
              .addAssociacaoAtributoColaborador(AssociaAtributo)
              .subscribe(data => {});
          }
        });
    });
  }
  associarColaboradorTecnologia(formAvaliacao: any, maxId: any): any {
    let associacaoColaboradorTecnologia: any;
    formAvaliacao.tecnologia.forEach(Idtecnologia => {
      associacaoColaboradorTecnologia = {
        TB_TECNOLOGIA_id_tecnologia: Idtecnologia,
        TB_COLABORADOR_id_colaborador: formAvaliacao.colaborador.idColaborador,
        TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
          formAvaliacao.colaborador.id_referencia_fct_gfe,
        TB_COLABORADOR_TB_DIVISAO_id_divisao: formAvaliacao.divisao.id_divisao,
        TB_RESULTADO_id_resultado: maxId
      };
      this._avaliacaoService
        .addAssociacaoColaboradorTecnologia(associacaoColaboradorTecnologia)
        .subscribe(data => {
          // console.log('OK - Associações incluidas com sucesso', data);
        });
    });
  }
  associarColaboradorPapel(formAvaliacao: any, maxId: any): any {
    let associacaoColaboradorPapel: any;
    formAvaliacao.papel.forEach(Idpapel => {
      associacaoColaboradorPapel = {
        TB_PAPEL_id_papel: Idpapel,
        TB_COLABORADOR_id_colaborador: formAvaliacao.colaborador.idColaborador,
        TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
          formAvaliacao.colaborador.id_referencia_fct_gfe,
        TB_COLABORADOR_TB_DIVISAO_id_divisao: formAvaliacao.divisao.id_divisao,
        TB_RESULTADO_id_resultado: maxId
      };
      this._avaliacaoService
        .addAssociacaoColaboradorPapel(associacaoColaboradorPapel)
        .subscribe(data => {
          // console.log(' **** --- Associações Papel Colaborador', data);
        });
    });
  }
  associarColaboradorProjeto(formAvaliacao: any, maxId: any): any {
    let associacaoColaboradorProjeto: any;
    formAvaliacao.items.forEach(idProjeto => {
      associacaoColaboradorProjeto = {
        TB_PROJETO_id_projeto: idProjeto.Projetos,
        TB_COLABORADOR_id_colaborador: formAvaliacao.colaborador.idColaborador,
        TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
          formAvaliacao.colaborador.id_referencia_fct_gfe,
        TB_COLABORADOR_TB_DIVISAO_id_divisao: formAvaliacao.divisao.id_divisao,
        TB_RESULTADO_id_resultado: maxId
      };
      this._avaliacaoService
        .addAssociacaoColaboradorProjeto(associacaoColaboradorProjeto)
        .subscribe(data => {
          // console.log(' **** --- Associações Projeto Colaborador', data);
        });
    });
  }
  associarAtributoProjeto(formAvaliacao: any, maxId: any): any {
    let associacaoAtributoProjeto: any;
    let AssociaAtributo: any;

    formAvaliacao.items.forEach(projetos => {
      this._avaliacaoService
        .getBuscaAtributo(
          projetos.Abrangencia,
          projetos.Complexidade,
          projetos.Impacto,
          'p'
        )
        .subscribe(dataAtributo => {
          if (dataAtributo) {
            associacaoAtributoProjeto = {
              TB_ATRIBUTO_id_atributo: dataAtributo['id_atributo'],
              TB_PROJETO_id_projeto: projetos.Projetos,
              TB_RESULTADO_id_resultado: maxId
            };
            this._avaliacaoService
              .addAssociacaoAtributoProjeto(associacaoAtributoProjeto)
              .subscribe(data => {
                // console.log(' **** --- Associações Atributo com Projeto', data);
              });
            AssociaAtributo = {
              TB_COLABORADOR_id_colaborador:
                formAvaliacao.colaborador.idColaborador,
              TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
                formAvaliacao.colaborador.id_referencia_fct_gfe,
              TB_COLABORADOR_TB_DIVISAO_id_divisao:
                formAvaliacao.divisao.id_divisao,
              TB_ATRIBUTO_id_atributo: dataAtributo['id_atributo'],
              TB_ATRIBUTO_TB_ABRANGENCIA_id_abrangencia:
                dataAtributo['id_abrangencia'],
              TB_ATRIBUTO_TB_COMPLEXIDADE_id_complexidade:
                dataAtributo['id_complexidade'],
              TB_ATRIBUTO_TB_IMPACTO_id_impacto: dataAtributo['id_impacto'],
              TB_RESULTADO_id_resultado: maxId // [Buscar o último ID da tabela TB_RESULTADO +1]
            };
            this._atributoColaboradorService
              .addAssociacaoAtributoColaborador(AssociaAtributo)
              .subscribe(data => {});
          }
        });
    });
  }
  registrarAvaliacao() {
    const avaliacaoForm = this.formAvaliacao.value;
    this.somaValores('tudo');
    this._avaliacaoService
      .addAvaliacao({
        pontuacao: avaliacaoForm.vlrPtTotal || 39.0,
        ajuste: avaliacaoForm.ajuste || 0.0,
        ociosidade: avaliacaoForm.ociosidade || 0.0,
        referencia_fct_gfe_pontuacao: this.valorFCTPontuacaoTotal || 0,
        TB_COLABORADOR_id_colaborador: avaliacaoForm.colaborador.idColaborador,
        TB_COLABORADOR_TB_DIVISAO_id_divisao: avaliacaoForm.divisao.id_divisao,
        TB_COLABORADOR_TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe:
          avaliacaoForm.colaborador.id_referencia_fct_gfe,
        papel: avaliacaoForm.papel,
        projetos: avaliacaoForm.items,
        tecnologia: avaliacaoForm.tecnologia,
        atributos: avaliacaoForm.itemsAtributo
      })
      .subscribe(data => {
        if (data) {
          this.associarColaboradorPapel(avaliacaoForm, data);
          this.associarColaboradorProjeto(avaliacaoForm, data);
          this.associarColaboradorTecnologia(avaliacaoForm, data);
          this.associarColaboradorAtributo(avaliacaoForm, data);
          this.associarAtributoProjeto(avaliacaoForm, data);
          this.router.navigate(['consultas']);
          this._toastrService.success(
            'Avaliação registrada com sucesso!',
            'Sucesso',
            {
              progressBar: true,
              progressAnimation: 'increasing',
              closeButton: true,
              timeOut: 3000
            }
          );
        }
      });
  }
  addProjeto() {
    this.addItem();
    this.somaValores('projeto');
    this.cont_projetos = this.cont_projetos + 1;
    this.habilitaBotaoProjetos();
  }

  somaProjetos() {
    this.vlrProjetos = 0;
    let vlrAbrangencia, vlrComplexidade, vlrImpacto: number;
    const projetos = this.formAvaliacao.get('items').value;

    projetos.forEach(element => {
      vlrAbrangencia = parseInt(element.Abrangencia, 10);
      vlrComplexidade = parseInt(element.Complexidade, 10);
      vlrImpacto = parseInt(element.Impacto, 10);
      this.vlrProjetos =
        this.vlrProjetos + (vlrAbrangencia + vlrComplexidade + vlrImpacto);
    });
  }
  somaAtributos() {
    let qtdAtributos = 0;
    let ajusteAtributos = 0.0;
    let vlrAbrangencia, vlrComplexidade, vlrImpacto: number;
    // tslint:disable-next-line:prefer-const
    let atributos = this.formAvaliacao.get('itemsAtributo').value;
    this.vlrAtributo = 0;
    atributos.forEach(element => {
      vlrAbrangencia = parseInt(element.Abrangencia, 10);
      vlrComplexidade = parseInt(element.Complexidade, 10);
      vlrImpacto = parseInt(element.Impacto, 10);
      this.vlrAtributo =
        this.vlrAtributo + (vlrAbrangencia + vlrComplexidade + vlrImpacto);
      qtdAtributos = qtdAtributos + 1;
      ajusteAtributos = ajusteAtributos + 3;
    });
    if (ajusteAtributos > 0) {
      ajusteAtributos = 13 / (ajusteAtributos / 3);
      this.vlrAtributo = this.vlrAtributo * ajusteAtributos;
    } else {
      this.vlrAtributo = 0.0;
    }
  }
  getSomarTecnologia(valor) {
    if (this.formAvaliacao.get('tecnologia').value.length) {
      this.tecnologiaValidacao = false;
    }
    this.qtdTecnologia = this.qtdTecnologia + 1;
    this.somaValores('tecnologia');
  }
  restoreColaborador(): void {
    this.formAvaliacao.controls['colaborador'].setValue('');
    this.formAvaliacao.controls['vlrFCTatual'].setValue('0.00');
    this.formAvaliacao.controls['ajuste'].setValue('0.00');
    this.classeCss1 = 'badge bg-green text-white';
    this.statusBarra1 = 'success';
    this.percAjuste = 0;
    this.percAjusteBarra = '0';
  }
}
