import { Component, TemplateRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Referencia } from '../models/referencia.model';
import { ReferenciaService } from '../services/referencia.service';
import { ToastrCenterService } from '@serpro-design/angular';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  referencia: Referencia[] = [];
  formReferencia: FormGroup;
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _referenciaService: ReferenciaService,
    private _toastrService: ToastrCenterService
  ) { }

  ngOnInit() {
    this.getReferencia();
  }

  getReferencia(): void {
    this._referenciaService.getReferencia().subscribe((dados: any) => {
      this.referencia = dados;
      this.rows = dados;
    });
  }

  onDeleteReferencia(referencia: Referencia): void {
    this.referencia = this.referencia.filter(h => h !== referencia);
    this._referenciaService.deleteReferencia(referencia.id_referencia_fct_gfe).subscribe(
      sucesso => {
        this._toastrService.success('Registro deletado com sucesso', 'Atenção' );
      },
      error => {
        this._toastrService.error('Não foi possivel deletar o registro', 'Atenção');
      }
    );
  }


}
