import { Component, TemplateRef, OnInit } from '@angular/core';

import { Pesos } from '../models/pesos.model';
import { PesosService } from '../services/pesos.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  pesos: Pesos[] = [];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _pesosService: PesosService,
    private _toastrService: ToastrCenterService
  ) { }

  ngOnInit() {
    this.getListPesos();
  }

  getListPesos() {
    this._pesosService.getPesos().subscribe(dados => {
      this.pesos = dados;
      this.rows = dados;
    });
  }

  onDeletePesos(pesos: Pesos, template: TemplateRef<any>) {
    this._pesosService.deletePesos(pesos.id_pesos).subscribe(data => {
        if (!data['code']) {
          this.pesos = this.pesos.filter(pes => pes !== pesos);
          this._toastrService.success('Registro removido com sucesso!', 'SUCESSO!');
        } else {
          this._toastrService.error(
            'Não é possivel deletar o registro selecionado.',
            'ERROR!'
          );
        }
      });
  }



}
