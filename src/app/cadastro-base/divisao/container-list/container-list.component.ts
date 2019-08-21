import { Component, OnInit } from '@angular/core';
import { Divisao } from '../models/divisao.model';
import { DivisaoService } from '../services/divisao.service';
import { ToastrCenterService } from '@serpro-design/angular';



@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  divisao: Divisao[];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _toastrService: ToastrCenterService,
    private _divisaoService: DivisaoService
  ) { }

  ngOnInit() {
    this.getComplexidade();
  }

  getComplexidade(): void {
    this._divisaoService.getDivisao().subscribe(data => {
      this.divisao = data;
      this.rows = data;
    });
  }

  onDeleteDivisao(divisao: Divisao): void {
    // console.log('Dados: ', complexidade);
    this.divisao = this.divisao.filter(h => h !== divisao);
    this._divisaoService.deleteDivisao(divisao.id_divisao).subscribe(
      sucesso => {
        this._toastrService.success('Registro deletado com sucesso', 'Atenção' );
      },
      error => {
        this._toastrService.error('Não foi possivel deletar o registro', 'Atenção');
      }
    );
  }




}
