import { Component, TemplateRef, OnInit } from '@angular/core';

import { Tecnologia } from '../models/tecnologia.model';
import { TecnologiaService } from '../services/tecnologia.service';
import { ToastrCenterService } from '@serpro-design/angular';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  tecnologia: Tecnologia[] = [];
  table: any;
  rows = [];
  selected = [];
  reorderable = true;
  loadingIndicator = true;


  ngOnInit(): void {
    this.getTecnologia();
  }

  constructor(
    private _tecnologiaService: TecnologiaService,
    private _toastrService: ToastrCenterService
  ) {}

  getTecnologia(): void {
    this._tecnologiaService.getTecnologia().subscribe((dados: any) => {
      this.tecnologia = dados;
      this.rows = this.tecnologia;
    });
  }

  onDeleteTecnologia(tecnologia: Tecnologia): void {
    this.tecnologia = this.tecnologia.filter(tec => tec !== tecnologia);
    this._tecnologiaService.deleteTecnologia(tecnologia.id_tecnologia).subscribe(
      sucesso => {
        this._toastrService.success('Registro deletado com sucesso', 'Atenção' );
      },
      error => {
        this._toastrService.error('Não foi possivel deletar o registro', 'Atenção');
      }
    );
  }

  onActivate() {

  }

}
