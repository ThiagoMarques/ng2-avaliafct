import { Component, TemplateRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Distribuicao } from '../models/distribuicao.model';
import { DistribuicaoService } from '../services/distribuicao.service';
import { ToastrCenterService, LoadingCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  distribuicao: Distribuicao[] = [];
  rows = [];
  temp = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;
  submitted = false;

  constructor(
    private _distribuicaoService: DistribuicaoService,
    private _toastrService: ToastrCenterService,
    private _loadingService: LoadingCenterService
  ) {}

  ngOnInit() {
    this.getDistribuicao();
  }
  getDistribuicao(): void {
    this._distribuicaoService.getDistribuicao().subscribe(
      (dados: any) => {
        this.distribuicao = dados;
        this.rows = dados;
      },
      error =>
        this._toastrService.error(
          'Não foi possivel carregar os dados',
          'Erro ao carregar os dados'
        )
    );
  }




}
