import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Impacto } from '../models/impacto.model';
import { ImpactoService } from '../services/impacto.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  impacto: Impacto[] = [];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;


  constructor(
    private _impactoService: ImpactoService,
    private _toastrService: ToastrCenterService
  ) { }

  ngOnInit() {
    this.getListImpacto();
  }

  getListImpacto() {
    this._impactoService.getImpacto().subscribe(dados => {
      this.impacto = dados;
      this.rows = dados;
    });
  }

  onDeleteImpacto(impacto: Impacto, template: TemplateRef<any>) {
    this._impactoService
      .deleteImpacto(impacto.id_impacto)
      .subscribe(data => {
        if (!data['code']) {
          this.impacto = this.impacto.filter(imp => imp !== impacto);
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
