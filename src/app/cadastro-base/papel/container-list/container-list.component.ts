import { Component, OnInit } from '@angular/core';

import { Papel } from '../models/papel.model';
import { PapelService } from '../services/papel.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  papel: Papel[];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _toastrService: ToastrCenterService,
    private _papelService: PapelService
  ) { }

  ngOnInit() {
    this.getPapel();
  }

  getPapel(): void {
    this._papelService.getPapel().subscribe(data => {
      this.papel = data;
      this.rows = data;
     });
  }

  onDeletePapel(papel: Papel): void {
    // console.log('Dados: ', complexidade);
    this.papel = this.papel.filter(pap => pap !== papel);
    this._papelService.deletePapel(papel.id_papel).subscribe(
      sucesso => {
        this._toastrService.success('Registro deletado com sucesso', 'Sucesso' );
      },
      error => {
        this._toastrService.error('Não foi possivel deletar o registro', 'Atenção');
      }
    );
  }


}
