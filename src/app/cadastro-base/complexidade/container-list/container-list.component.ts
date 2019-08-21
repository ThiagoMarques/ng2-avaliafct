import { Component, OnInit } from '@angular/core';

import { Complexidade } from '../models/complexidade.model';
import { ComplexidadeService } from '../services/complexidade.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  complexidade: Complexidade[];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _toastrService: ToastrCenterService,
    private _complexidadeService: ComplexidadeService
  ) { }

  ngOnInit() {
    this.getComplexidade();
  }

  getComplexidade(): void {
    this._complexidadeService.getComplexidade().subscribe(data => {
      this.complexidade = data;
      this.rows = data;
    });
  }

  onDeleteComplexidade(complexidade: Complexidade): void {
    // console.log('Dados: ', complexidade);
    this.complexidade = this.complexidade.filter(h => h !== complexidade);
    this._complexidadeService.deleteComplexidade(complexidade.id_complexidade).subscribe(
      sucesso => {
        this._toastrService.success('Registro deletado com sucesso', 'Atenção' );
      },
      error => {
        this._toastrService.error('Não foi possivel deletar o registro', 'Atenção');
      }
    );
  }


}
