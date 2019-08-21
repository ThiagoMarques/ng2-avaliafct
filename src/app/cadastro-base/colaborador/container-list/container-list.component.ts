import { Component, TemplateRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Colaborador } from '../models/colaborador.model';
import { ColaboradorService } from '../services/colaborador.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  colaborador: Colaborador[] = [];
  message: string;
  modalRef: BsModalRef;
  idColaborador: number;
  public onClose: Subject<boolean>;
  table: any;
  rows = [];
  selected = [];
  filteredData = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  cols = [
    { prop: 'matricula', name: 'Matrícula'},
    { prop: 'nome', name: 'Nome'},
    { prop: 'telefone', name: 'Telefone'},
    { prop: 'especialidade', name: 'Especialidade'},
    { prop: 'salario', name: 'Salário'},
    { prop: 'percentual_salario', name: '8,5% do Salário'},
    { prop: 'referenciaFct', name: 'Referência FCT'},
    { prop: 'sigla', name: 'Divisão'}
  ];

  constructor(
    private _colaboradorService: ColaboradorService,
    private modalService: BsModalService,
    private _toastrService: ToastrCenterService,

  ) {}

  ngOnInit() {
    this.getlistColaborador();
    this.onClose = new Subject();
  }

  getlistColaborador(): void {
    this._colaboradorService.getColaborador().subscribe(dados => {
      this.colaborador = dados;
      this.rows = dados;
      this.filteredData = dados;
    });
  }

  onDeleteColaborador(colaborador: Colaborador) {
    this._colaboradorService
      .deleteColaborador(colaborador.idColaborador)
      .subscribe(data => {
        if (!data['code']) {
          this.colaborador = this.colaborador.filter(abr => abr !== colaborador);
          this._toastrService.success('Registro removido com sucesso!', 'SUCESSO!');
        } else {
          this._toastrService.error(
            'Não é possivel deletar o registro selecionado.',
            'ERROR!'
          );
        }
      });
  }

  // filters results
filterDatatable(event) {
  // get the value of the key pressed and make it lowercase
  const val = event.target.value.toLowerCase();
  // get the amount of columns in the table
  const colsAmt = this.cols.length;
  // get the key names of each column in the dataset
  const keys = Object.keys(this.rows[0]);
  // assign filtered matches to the active datatable
  this.rows = this.filteredData.filter(function(item) {
    // iterate through each row's column data
    for (let i = 0; i < colsAmt; i++) {
      // check for a match
      if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
        // found match, return true to add to result set
        return true;
      }
    }
  });
  // whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  confirm(id: number): void {
    this.modalRef.hide();
    this.onClose.next(true);
  }

  decline(): void {
    this.modalRef.hide();
    this.onClose.next(true);
  }

}
